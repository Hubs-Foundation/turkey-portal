defmodule DashWeb.Api.V1.HubControllerTest do
  use DashWeb.ConnCase
  import DashWeb.TestHelpers
  import Mox
  import Plug.Conn.Status, only: [code: 1]

  setup_all context do
    Mox.defmock(Dash.HttpMock, for: HTTPoison.Base)
    merge_module_config(:dash, Dash.Hub, http_client: Dash.HttpMock)
    merge_module_config(:dash, Dash.OrchClient, http_client: Dash.HttpMock)
    Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: false)

    on_exit(fn ->
      merge_module_config(:dash, Dash.Hub, http_client: nil)
      merge_module_config(:dash, Dash.OrchClient, http_client: nil)
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

  defp mock_orch_patch(opts \\ [response: :ok, status_code: :ok]) do
    Mox.expect(Dash.HttpMock, :patch, 1, fn url, _body ->
      cond do
        url =~ ~r/\/hc_instance\// ->
          {opts[:response], %HTTPoison.Response{status_code: code(opts[:status_code])}}
      end
    end)
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

  def mock_hubs_get() do
    Dash.HttpMock
    |> Mox.expect(:get, 2, fn url, _headers, _options ->
      cond do
        url =~ ~r/presence$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{count: 3})}}

        url =~ ~r/storage$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{storage_mb: 10})}}
      end
    end)
  end

  def mock_orch_post() do
    Dash.HttpMock
    |> Mox.expect(:post, fn _url, _body ->
      {:ok, %HTTPoison.Response{status_code: 200}}
    end)
  end
end
