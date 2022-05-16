defmodule DashWeb.Api.V1.HubControllerTest do
  use DashWeb.ConnCase
  import DashWeb.TestHelpers

  setup_all do
    Mox.defmock(Dash.HttpMock, for: HTTPoison.Base)
    merge_module_config(:dash, Dash.Hub, %{:http_client => Dash.HttpMock})

    on_exit(fn ->
      merge_module_config(:dash, Dash.Hub, %{:http_client => nil})
    end)
  end

  describe "Hub API" do
    test "should fetch and return usage stats for hubs", %{conn: conn} do
      Dash.HttpMock
      |> Mox.expect(:get, 2, fn url, _headers, _options ->
        cond do
          url =~ ~r/presence$/ ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{count: 3})}}

          url =~ ~r/storage$/ ->
            {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{storage_mb: 10})}}
        end
      end)

      create_test_account_and_hub()

      [%{} = hub] =
        conn
        |> put_test_token()
        |> get("/api/v1/hubs")
        |> json_response(200)

      %{"currentCcu" => 3, "currentStorageMb" => 10} = hub
    end
  end
end
