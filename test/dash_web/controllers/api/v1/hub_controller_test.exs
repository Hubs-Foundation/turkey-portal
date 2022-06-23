defmodule DashWeb.Api.V1.HubControllerTest do
  use DashWeb.ConnCase
  use Retry
  import DashWeb.TestHelpers
  import Mox
  import Plug.Conn.Status, only: [code: 1]
  require Logger

  setup_all context do
    setup_mocks_for_hubs()

    on_exit(fn ->
      exit_mocks_for_hubs()
    end)

    verify_on_exit!(context)
  end

  describe "Hub API" do
    test "should fetch and return usage stats for hubs", %{conn: conn} do
      stub_ret_get()

      create_test_account_and_hub()

      [%{} = hub] =
        conn
        |> put_test_token()
        |> get("/api/v1/hubs")
        |> json_response(:ok)

      %{"currentCcu" => 3, "currentStorageMb" => 10} = hub
    end

    test "should allow changing the name of a hub", %{conn: conn} do
      %{hub: hub} = create_test_account_and_hub()
      assert hub.name === "test hub"

      conn |> patch_hub(hub, %{name: "new name"}, expected_status: :ok)
      %{"name" => "new name"} = get_hub(conn, hub)
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
    test "should submit subdomain change to orchestrator", %{conn: conn} do
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      expect_orch_patch()

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)
      %{"subdomain" => "new-subdomain"} = get_hub(conn, hub)
    end

    test "should error on duplicate subdomains", %{conn: conn} do
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      expect_orch_patch()

      %{hub: hub_one} = create_test_account_and_hub()
      %{hub: hub_two} = create_test_account_and_hub()

      conn |> patch_subdomain(hub_one, "new-subdomain", expected_status: :ok)

      conn |> patch_subdomain(hub_two, "new-subdomain", expected_status: :bad_request)
    end

    test "should error on invalid subdomains", %{conn: conn} do
      expect_orch_patch()

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      long_subdomain = String.duplicate("a", 64)
      conn |> patch_subdomain(hub, long_subdomain, expected_status: :bad_request)

      subdomain_with_starting_hyphen = "-test-subdomain"
      conn |> patch_subdomain(hub, subdomain_with_starting_hyphen, expected_status: :bad_request)

      subdomain_with_ending_hyphen = "test-subdomain-"
      conn |> patch_subdomain(hub, subdomain_with_ending_hyphen, expected_status: :bad_request)

      subdomain_with_underscore = "test_subdomain"
      conn |> patch_subdomain(hub, subdomain_with_underscore, expected_status: :bad_request)

      subdomain_with_invalid_chars = "`~!@#$%^&*()+=;:'\"\\|[{]},<.>/?"
      conn |> patch_subdomain(hub, subdomain_with_invalid_chars, expected_status: :bad_request)

      subdomain_with_unicode = "◝(ᵔᵕᵔ)◜"
      conn |> patch_subdomain(hub, subdomain_with_unicode, expected_status: :bad_request)

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
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      stub_orch_patch_with_pausing(self())

      %{hub: hub} = create_test_account_and_hub()

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
      assert_hub_status(conn, hub, "subdomain_error")
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

      stub_ret_get()
      expect_orch_post()

      [%{"status" => status} = _hub] = get_hubs(conn)

      assert status =~ "ready"
    end

    test "should return error if /health timeout is reached", %{conn: conn} do
      stub_ret_get()
      expect_orch_post()
      stub_ret_fail_health_check()

      body =
        conn
        |> put_test_token()
        |> get("/api/v1/hubs")
        |> response(500)

      assert body =~ "wait_for_ready_state_timed_out"
    end
  end

  describe "Hub ready state tests with exact calls" do
    setup :verify_on_exit!

    test "should call /health endpoint ONLY once, if hubs is already ready", %{conn: conn} do
      # TODO To refine tests move these tests to own module that has setup :verify_on_exit!
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)

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

  # Mocks and Setup Helpers

  defp assert_hub_status(conn, hub, expected_status) do
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

  defp expect_orch_patch(opts \\ [response: :ok, status_code: :ok]) do
    Mox.expect(Dash.HttpMock, :patch, 1, fn url, _body, _headers, _opts ->
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

  defp get_hub(conn, hub) do
    conn
    |> put_test_token()
    |> get("/api/v1/hubs/#{hub.hub_id}")
    |> json_response(:ok)
  end

  defp patch_hub(conn, %Dash.Hub{} = hub, %{} = body, expected_status: expected_status) do
    conn
    |> put_test_token()
    |> put_req_header("content-type", "application/json")
    |> patch("/api/v1/hubs/#{hub.hub_id}", Jason.encode!(body))
    |> response(expected_status)
  end

  defp patch_subdomain(conn, hub, subdomain, expected_status: expected_status) do
    conn |> patch_hub(hub, %{subdomain: subdomain}, expected_status: expected_status)
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

  defp stub_ret_fail_health_check() do
    Dash.HttpMock
    |> Mox.stub(:get, fn url, _headers, _opts ->
      cond do
        url =~ ~r/health$/ ->
          {:ok, %HTTPoison.Response{status_code: 500}}

        true ->
          Logger.warn(
            "Inside test, hit stub set up in stub_hub_fail_health_check/0, but GET request URL did not match /health, did you mean to do that?"
          )
      end
    end)
  end
end
