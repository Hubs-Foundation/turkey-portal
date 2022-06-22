defmodule DashWeb.Api.V1.HubControllerTest do
  use DashWeb.ConnCase
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
      mock_hubs_get()

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

    test "should submit subdomain change to orchestrator", %{conn: conn} do
      mock_orch_patch()

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :ok)
      %{"subdomain" => "new-subdomain"} = get_hub(conn, hub)
    end

    test "should error on duplicate subdomains", %{conn: conn} do
      mock_orch_patch()

      %{hub: hub_one} = create_test_account_and_hub()
      %{hub: hub_two} = create_test_account_and_hub()

      conn |> patch_subdomain(hub_one, "new-subdomain", expected_status: :ok)

      conn |> patch_subdomain(hub_two, "new-subdomain", expected_status: :bad_request)
    end

    test "should error on invalid subdomains", %{conn: conn} do
      mock_orch_patch()

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

    test "should error if orch request fails", %{conn: conn} do
      mock_orch_patch(response: :error, status_code: :internal_server_error)

      %{hub: hub} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      conn |> patch_subdomain(hub, "new-subdomain", expected_status: :internal_server_error)

      %{"subdomain" => final_subdomain} = get_hub(conn, hub)
      assert final_subdomain =~ "test-subdomain"
    end
  end

  describe "Hub Ready state tests" do
    test "should call ret /health endpoint at least 1 time", %{conn: conn} do
      # TODO To refine test make this test call /health endpoint 3 times
      mock_hubs_get()
      mock_orch_post()

      max_expected_calls = 3
      time_until_ready_ms = max_expected_calls * Dash.RetClient.get_wait_ms()

      # expected_calls+1 to factor in first check
      mock_hubs_wait_on_health(
        time_until_healthy_ms: time_until_ready_ms,
        max_expected_calls: max_expected_calls + 1
      )

      [%{"status" => status} = _hub] = get_hubs(conn)

      assert status =~ "ready"
    end

    test "should return error if /health timeout is reached", %{conn: conn} do
      mock_hubs_get()
      mock_orch_post()
      stub_hubs_fail_health_check()

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
      mock_hubs_get()
      mock_orch_post()

      mock_hubs_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)

      [%{"status" => status} = _hub] = get_hubs(conn)
      assert status =~ "ready"
    end

    test "should NOT call ret /health endpoint, if hubs for account is ready", %{conn: conn} do
      mock_hubs_get()
      mock_hubs_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 0)

      %{hub: hub} = create_test_account_and_hub()
      assert hub.status == :ready

      [%{"status" => status} = _hub] = get_hubs(conn)
      assert status =~ "ready"
    end
  end

  # Mocks and Setup Helpers

  defp mock_orch_patch(opts \\ [response: :ok, status_code: :ok]) do
    Mox.expect(Dash.HttpMock, :patch, 1, fn url, _body, _opts ->
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
  defp mock_hubs_wait_on_health(
         time_until_healthy_ms: time_until_healthy_ms,
         max_expected_calls: max_expected_calls
       ) do
    until_healthy = Time.add(Time.utc_now(), time_until_healthy_ms, :millisecond)

    Dash.HttpMock
    |> Mox.expect(:get, max_expected_calls, fn url, _headers ->
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

  defp stub_hubs_fail_health_check() do
    Dash.HttpMock
    |> Mox.stub(:get, fn url, _headers ->
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
