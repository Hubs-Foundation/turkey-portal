defmodule DashWeb.Api.V1.HubControllerTest do
  use DashWeb.ConnCase
  use Retry

  import Dash.TestHelpers
  import Mox
  import Plug.Conn.Status, only: [code: 1]
  require Logger
  alias Dash.Hub

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  setup [:verify_on_exit!]

  describe "Hub API" do
    test "should fetch and return usage stats for hubs", %{conn: conn} do
      stub_ret_get()

      create_test_account_and_hub()

      [%{} = hub] =
        conn
        |> put_test_token()
        |> get("/api/v1/hubs")
        |> json_response(:ok)

      %{"currentCcu" => 3, "currentStorageMb" => 10.5} = hub
    end

    test "should allow access to a user's hub", %{conn: conn} do
      %{hub: hub} = create_test_account_and_hub(subdomain: "my-hub")
      %{"subdomain" => "my-hub"} = get_hub(conn, hub)
    end

    test "should not return other user's hub", %{conn: conn} do
      user_one = "test-user-one"
      user_two = "test-user-two"
      hub_one_subdomain = "hub-one"
      hub_two_subdomain = "hub-two"

      %{hub: hub_one} =
        create_test_account_and_hub(fxa_uid: user_one, subdomain: hub_one_subdomain)

      %{hub: _hub_two} =
        create_test_account_and_hub(fxa_uid: user_two, subdomain: hub_two_subdomain)

      nil = get_hub(conn, hub_one, token_opts: [claims: %{"sub" => user_two}])

      %{"subdomain" => ^hub_one_subdomain} =
        get_hub(conn, hub_one, token_opts: [claims: %{"sub" => user_one}])
    end

    test "should allow changing the name of a hub", %{conn: conn} do
      %{hub: hub} = create_test_account_and_hub()
      assert hub.name === "test hub"

      conn |> patch_hub(hub, %{name: "new name"}, expected_status: :ok)
      %{"name" => "new name"} = get_hub(conn, hub)
    end

    test "should not allow changing other user's hub", %{conn: conn} do
      user_one = "test-user-one"
      user_two = "test-user-two"

      %{hub: hub_one} = create_test_account_and_hub(fxa_uid: user_one)
      assert hub_one.name === "test hub"

      %{hub: _hub_two} = create_test_account_and_hub(fxa_uid: user_two)

      %{"error" => "update_hub_failed"} =
        conn
        |> patch_hub(hub_one, %{name: "new name"},
          token_opts: [claims: %{"sub" => user_two}],
          expected_status: :bad_request
        )

      %{"name" => "test hub"} = get_hub(conn, hub_one, token_opts: [claims: %{"sub" => user_one}])
    end

    test "should ignore changes to the storage limit", %{conn: conn} do
      %{hub: hub} = create_test_account_and_hub()
      assert hub.storage_limit_mb === 100

      conn |> patch_hub(hub, %{storageLimitMb: 10000}, expected_status: :ok)
      %{"storageLimitMb" => 100} = get_hub(conn, hub)
    end

    test "should error if name contains too many characters", %{conn: conn} do
      %{hub: hub} = create_test_account_and_hub()

      long_name = String.duplicate("a", 25)
      conn |> patch_hub(hub, %{name: long_name}, expected_status: :bad_request)
    end
  end

  describe "Subdomain updates" do
    test "subdomain should always be lower case", %{conn: conn} do
      stub_ret_rewrite_assets()
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      expect_orch_patch()

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn |> patch_subdomain(hub, "NEW-subdomain", expected_status: :ok)
      %{"subdomain" => "new-subdomain"} = get_hub(conn, hub)
    end

    test "should submit subdomain change to orchestrator", %{conn: conn} do
      stub_ret_rewrite_assets()
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      expect_orch_patch()

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)
      %{"subdomain" => "new-subdomain"} = get_hub(conn, hub)
    end

    test "should not submit subdomain orchestrator if subdomain hasn't changed", %{conn: conn} do
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 0)
      expect_orch_patch(expected_calls: 0)

      %{hub: hub} = create_test_account_and_hub(subdomain: "test-subdomain")

      conn |> patch_subdomain(hub, "test-subdomain", expected_status: :ok)
      %{"subdomain" => "test-subdomain"} = get_hub(conn, hub)
    end

    test "should error on duplicate subdomains", %{conn: conn} do
      stub_ret_rewrite_assets()
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      expect_orch_patch()

      %{hub: hub_one} = create_test_account_and_hub()
      %{hub: hub_two} = create_test_account_and_hub()

      conn |> patch_subdomain(hub_one, "new-subdomain", expected_status: :ok)

      conn |> patch_subdomain(hub_two, "new-subdomain", expected_status: :bad_request)
    end

    test "should allow valid subdomains", %{conn: conn} do
      stub_ret_rewrite_assets()
      stub_ret_health_check()
      stub_orch_patch()

      %{hub: hub} = create_test_account_and_hub()

      # These should not be caught by our deny list
      valid_subdomains = [
        "devoid",
        "authors",
        "chainmail"
      ]

      for valid_subdomain <- valid_subdomains do
        conn |> patch_subdomain(hub, valid_subdomain, expected_status: :ok)
        %{"subdomain" => patched_subdomain} = get_hub(conn, hub)
        assert patched_subdomain == valid_subdomain
      end
    end

    test "should error on invalid subdomains", %{conn: conn} do
      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      invalid_subdomains = %{
        nil_subdomain: nil,
        whitespace_subdomain: " ",
        empty_subdomain: "",
        short_subdomain: "aa",
        long_subdomain: String.duplicate("a", 64),
        subdomain_with_starting_hyphen: "-test-subdomain",
        subdomain_with_ending_hyphen: "test-subdomain-",
        subdomain_with_underscore: "test_subdomain",
        subdomain_with_spaces: "test subdomain",
        subdomain_with_invalid_chars: "`~!@#$%^&*()+=;:'\"\\|[{]},<.>/?",
        subdomain_with_unicode: "◝(ᵔᵕᵔ)◜",
        reserved_subdomain: "admin",
        naughty_subdomain: "poop",
        naughtier_subdomain: "poopface"
      }

      for {_key, invalid_subdomain} <- invalid_subdomains do
        conn |> patch_subdomain(hub, invalid_subdomain, expected_status: :bad_request)
      end

      %{"subdomain" => final_subdomain} = get_hub(conn, hub)
      assert final_subdomain =~ "test-subdomain"
    end

    test "should revert subdomain if orch subdomain update request fails", %{conn: conn} do
      expect_orch_patch(response: :error, status_code: :service_unavailable)

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)

      %{"subdomain" => final_subdomain} = get_hub(conn, hub)
      assert final_subdomain =~ "test-subdomain"
    end

    test "should revert subdomain if orch returns an error", %{conn: conn} do
      expect_orch_patch(response: :ok, status_code: :internal_server_error)

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)

      %{"subdomain" => final_subdomain} = get_hub(conn, hub)
      assert final_subdomain =~ "test-subdomain"
    end

    test "should set status to updating while waiting for subdomain change", %{conn: conn} do
      stub_ret_rewrite_assets()
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      stub_orch_patch_with_pausing(self())

      %{hub: hub} = create_test_account_and_hub()

      %{"status" => "updating"} =
        conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)

      stub_pid = wait_for_orch_patch()

      assert %{"status" => "updating"} = get_hub(conn, hub)

      send(stub_pid, {:continue})
      assert %{"status" => "ready"} = get_hub(conn, hub)
    end

    test "should set error status if previous subdomain is taken after subdomain update fails", %{
      conn: conn
    } do
      stub_orch_patch_with_pausing(self(), response: :error, status_code: :service_unavailable)

      %{hub: hub} = create_test_account_and_hub(subdomain: "test-subdomain")

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)
      stub_pid = wait_for_orch_patch()

      create_test_account_and_hub(subdomain: "test-subdomain")

      send(stub_pid, {:continue})
      retry_and_assert_hub_status(conn, hub, "subdomain_error")
    end

    test "should not allow updates while hub is already updating", %{conn: conn} do
      stub_ret_rewrite_assets()
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      stub_orch_patch_with_pausing(self())

      %{hub: hub} = create_test_account_and_hub(subdomain: "test-subdomain")

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)
      stub_pid = wait_for_orch_patch()

      assert %{"status" => "updating"} = get_hub(conn, hub)

      %{"error" => "update_hub_failed"} =
        conn |> patch_subdomain(hub, "another-subdomain", expected_status: :bad_request)

      send(stub_pid, {:continue})
      assert %{"subdomain" => "new-subdomain"} = get_hub(conn, hub)
    end
  end

  describe "Subdomain validation" do
    test "returns an error for duplicate subdomains", %{conn: conn} do
      stub_ret_rewrite_assets()
      create_test_account_and_hub(subdomain: "test-subdomain-one")
      %{hub: current_hub} = create_test_account_and_hub(subdomain: "test-subdomain-two")

      %{"success" => false, "error" => "subdomain_taken"} =
        conn |> post_validate_subdomain(current_hub.hub_id, "test-subdomain-one")
    end

    test "returns success for new subdomains", %{conn: conn} do
      %{hub: current_hub} = create_test_account_and_hub(subdomain: "test-subdomain-one")

      %{"success" => true} =
        conn |> post_validate_subdomain(current_hub.hub_id, "test-subdomain-two")
    end

    test "returns success when validating own subdomain", %{conn: conn} do
      %{hub: current_hub} = create_test_account_and_hub(subdomain: "test-subdomain-one")

      %{"success" => true} =
        conn |> post_validate_subdomain(current_hub.hub_id, "test-subdomain-one")
    end

    test "returns an error for reserved and naughty subdomains", %{conn: conn} do
      %{hub: current_hub} = create_test_account_and_hub()

      %{"error" => "subdomain_denied"} =
        conn |> post_validate_subdomain(current_hub.hub_id, "admin")

      %{"error" => "subdomain_denied"} =
        conn |> post_validate_subdomain(current_hub.hub_id, "poop")
    end
  end

  describe "Hub Ready state tests" do
    test "should call ret /health endpoint at least 1 time", %{conn: conn} do
      # TODO To refine test make this test call /health endpoint 3 times
      max_expected_calls = 3
      time_until_healthy_ms = max_expected_calls * Dash.RetClient.get_wait_ms()

      # expected_calls+1 to factor in first check
      expect_ret_wait_on_health(
        time_until_healthy_ms: time_until_healthy_ms,
        max_expected_calls: max_expected_calls + 1
      )

      subscribe_test_account(nil)

      stub_ret_get()
      expect_orch_post()

      [%{"status" => status} = _hub] = get_hubs(conn)

      assert status =~ "ready"
    end

    test "should return error if /health timeout is reached", %{conn: conn} do
      stub_ret_get()
      expect_orch_post()
      stub_ret_health_check(status_code: :service_unavailable)
      subscribe_test_account(nil)

      body =
        conn
        |> put_test_token()
        |> get("/api/v1/hubs")
        |> response(500)

      assert body =~ "wait_for_ready_state_timed_out"
    end
  end

  describe "Hub ready state tests with exact calls" do
    test "should call /health endpoint ONLY once, if hubs is already ready", %{conn: conn} do
      # TODO To refine tests move these tests to own module that has setup :verify_on_exit!
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      subscribe_test_account(nil)

      stub_ret_get()
      expect_orch_post()

      [%{"status" => status} = _hub] = get_hubs(conn)
      assert status =~ "ready"
    end

    test "should NOT call ret /health endpoint, if hubs for account is ready", %{conn: conn} do
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 0)
      stub_ret_get()

      %{hub: hub} = create_test_account_and_hub()
      assert hub.status == :ready

      [%{"status" => status} = _hub] = get_hubs(conn)
      assert status =~ "ready"
    end
  end

  @without_subscription_claims claims: %{fxa_subscriptions: []}
  describe "Subscription tests" do
    test "NOT subscribed, do NOT make default hub and return 200 with empty array", %{conn: conn} do
      conn =
        conn
        |> put_test_token(@without_subscription_claims)
        |> get("/api/v1/hubs")

      assert response(conn, 200) ==
               Jason.encode!([])

      account = get_test_account()

      assert !Hub.has_hubs(account)
    end

    test "capability is_active=false, do NOT make default hub and return 200 with empty array", %{
      conn: conn
    } do
      fxa_uid = "not-have-active-subscription"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)

      Dash.create_capability!(account, %{
        capability: DashWeb.Plugs.Auth.capability_string(),
        is_active: false,
        change_time: DateTime.utc_now()
      })

      conn =
        conn
        |> put_test_token(claims: %{fxa_subscriptions: []}, sub: fxa_uid)
        |> get("/api/v1/hubs")

      assert Jason.encode!([]) == response(conn, 200)

      assert not Hub.has_hubs(account)
    end

    # TODO for some reason the FeatureFlags are not allowing for POST request to be enabled inside setup or test block
    # Ignore test for now, since POST isn't enabled for dev or production
    # This test is working when POST is enabled
    # test "NOT subscribed, do NOT make a new Hub for POST", %{conn: conn} do
    #   Application.put_env(:dash, Dash.FeatureFlags, create_hubs: true)
    #   # Enable POST request on environment
    #   # POST create request
    #   # Returns 403 forbidden
    #   conn =
    #     conn
    #     |> put_test_token(@without_subscription_claims)
    #     |> post("/api/v1/hubs")

    #   account = get_test_account()

    #   assert response(conn, 403) && !Hub.has_hubs(account)
    # end

    test "IS subscribed, can get default Hub", %{conn: conn} do
      stub_ret_get()
      expect_orch_post()
      subscribe_test_account(nil)

      # Account with subscription, use index request and has_hubs
      conn =
        conn
        |> put_test_token()
        |> get("/api/v1/hubs")

      assert response(conn, 200)

      account = get_test_account()

      assert Hub.has_hubs(account)
    end

    test "NOT subscribed, if account ALREADY has hubs, can still get hubs and hub info", %{
      conn: conn
    } do
      stub_ret_get()
      create_test_account_and_hub()

      conn =
        conn
        |> put_test_token(@without_subscription_claims)
        |> get("/api/v1/hubs")

      assert response(conn, 200)
    end

    test "If account is NOT subscribed, can still update subdomain if has_hubs", %{conn: conn} do
      # TODO EA Ensure before end subscription date!!
      stub_ret_rewrite_assets()
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      expect_orch_patch()

      create_test_account_and_hub()

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn
      |> put_test_token(@without_subscription_claims)
      |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)

      %{"subdomain" => "new-subdomain"} = get_hub(conn, hub)
    end
  end

  # Mocks and Setup Helpers

  defp retry_and_assert_hub_status(conn, hub, expected_status) do
    retry with: constant_backoff(10) |> expiry(2000) do
      %{"status" => status} = get_hub(conn, hub)

      case status do
        ^expected_status -> {:ok, status}
        _ -> :error
      end
    after
      {:ok, status} ->
        assert status == expected_status
    else
      _ -> flunk("hub status was not changed to #{expected_status}")
    end
  end

  defp stub_orch_patch_with_pausing(parent, opts \\ [response: :ok, status_code: :ok]) do
    Mox.stub(Dash.HttpMock, :patch, fn url, _body, _headers, _opts ->
      cond do
        url =~ ~r/\/hc_instance$/ ->
          send(parent, {:patch_received, self()})
          receive do: ({:continue} -> nil)
          {opts[:response], %HTTPoison.Response{status_code: code(opts[:status_code])}}
      end
    end)
  end

  defp wait_for_orch_patch() do
    receive do: ({:patch_received, stub_pid} -> stub_pid),
            after: (1000 -> flunk("orch patch not received"))
  end

  defp expect_orch_patch(opts \\ [expected_calls: 1, response: :ok, status_code: :ok]) do
    expected_calls = Keyword.get(opts, :expected_calls, 1)

    Mox.expect(Dash.HttpMock, :patch, expected_calls, fn url, _body, _headers, _opts ->
      cond do
        url =~ ~r/\/hc_instance$/ ->
          {opts[:response], %HTTPoison.Response{status_code: code(opts[:status_code])}}
      end
    end)
  end

  defp stub_orch_patch(opts \\ [response: :ok, status_code: :ok]) do
    Mox.stub(Dash.HttpMock, :patch, fn url, _body, _headers, _opts ->
      cond do
        url =~ ~r/\/hc_instance$/ ->
          {opts[:response], %HTTPoison.Response{status_code: code(opts[:status_code])}}
      end
    end)
  end

  defp get_hubs(conn) do
    conn
    |> put_test_token()
    |> get("/api/v1/hubs")
    |> json_response(:ok)
  end

  defp get_hub(conn, hub, opts \\ []) do
    conn
    |> put_test_token(opts[:token_opts] || [])
    |> get("/api/v1/hubs/#{hub.hub_id}")
    |> json_response(:ok)
  end

  defp patch_hub(conn, %Dash.Hub{} = hub, %{} = body, opts) do
    conn
    |> put_test_token(opts[:token_opts] || [])
    |> put_req_header("content-type", "application/json")
    |> patch("/api/v1/hubs/#{hub.hub_id}", Jason.encode!(body))
    |> json_response(opts[:expected_status])
  end

  defp patch_subdomain(conn, hub, subdomain, expected_status: expected_status) do
    conn |> patch_hub(hub, %{subdomain: subdomain}, expected_status: expected_status)
  end

  defp post_validate_subdomain(conn, excluded_hub_id, subdomain) do
    conn
    |> put_test_token()
    |> put_req_header("content-type", "application/json")
    |> post(
      "/api/v1/hubs/validate_subdomain",
      Jason.encode!(%{excludedHubId: excluded_hub_id, subdomain: subdomain})
    )
    |> response(:ok)
    |> Jason.decode!()
  end

  defp stub_ret_rewrite_assets() do
    Dash.HttpMock
    |> Mox.stub(:post, fn url, _body, _headers, _opts ->
      cond do
        url =~ ~r/rewrite_assets$/ ->
          {:ok, %HTTPoison.Response{status_code: 200}}
      end
    end)
  end

  # Used only in /health tests
  defp expect_ret_wait_on_health(
         time_until_healthy_ms: time_until_healthy_ms,
         max_expected_calls: max_expected_calls
       ) do
    until_healthy = Time.add(Time.utc_now(), time_until_healthy_ms, :millisecond)

    Dash.HttpMock
    |> Mox.expect(:get, max_expected_calls, fn url, _headers, _opts ->
      now = Time.utc_now()

      cond do
        url =~ ~r/health$/ ->
          if Time.diff(now, until_healthy, :millisecond) >= 0 do
            {:ok, %HTTPoison.Response{status_code: 200}}
          else
            {:ok, %HTTPoison.Response{status_code: 500}}
          end
      end
    end)
  end

  defp stub_ret_health_check(opts \\ [status_code: :ok]) do
    Dash.HttpMock
    |> Mox.stub(:get, fn url, _headers, _opts ->
      cond do
        url =~ ~r/health$/ ->
          {:ok, %HTTPoison.Response{status_code: code(opts[:status_code])}}

        true ->
          Logger.warn(
            "Inside test, hit stub set up in stub_hub_health_check/1, but GET request URL did not match /health, did you mean to do that?"
          )
      end
    end)
  end
end
