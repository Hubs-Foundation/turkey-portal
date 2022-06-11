defmodule Dash.RetClientTest do
  use Dash.DataCase
  alias Dash.{Repo}
  import Ecto.Query
  import Mox
  import DashWeb.TestHelpers

  setup_all context do
    setup_mocks_for_hubs()

    on_exit(fn ->
      exit_mocks_for_hubs()
    end)

    verify_on_exit!(context)
  end

  describe "Ret Client" do


    # Happy path
    # Calls to server
    # Waits for 
    test ""

    # Refresh page test


    # Timeout page test


    # Server throws errors on every fetch
    
  end

  def mock_ret_client_health(ms_until_200) do
    now = Time.utc_now()
    until_200 = Time.add(now, ms_until_200, :millisecond)

    Dash.HttpMock
    |> Mox.expect(:get, 2, fn url, _headers, _options ->
      cond do
        url =~ ~r/health$/ ->
          if Time.diff(now, until_200) >= 0 do
            {:ok, %HTTPoison.Response{status_code: 200}}
          else
            {:ok, %HTTPoison.Response{status_code: 500}}
          end
        url =~ ~r/presence$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{count: 3})}}

        url =~ ~r/storage$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{storage_mb: 10})}}
      end
    end)
  end
end
