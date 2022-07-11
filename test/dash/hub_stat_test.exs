defmodule Dash.HubStatTest do
  use Dash.DataCase
  import Ecto.Query
  import DashWeb.TestHelpers
  import Mox
  require Logger
  alias Dash.{Repo, HubStat}

  setup_all context do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
    verify_on_exit!(context)
  end

  describe "Metrics Hub Stat" do
    test "Happy path: gets ready hubs storage stats into table" do
      # Set RetClient stub for /storage endpoint
      stub_ret_get()

      # Set ready hubs in table
      %{hub: hub1} = create_test_account_and_hub()
      %{hub: hub2} = create_test_account_and_hub()

      HubStat.job_record_hub_stats()

      # Has each hub storage stats in table
      assert Repo.exists?(
               from(hs in HubStat, where: hs.hub_id == ^hub1.hub_id and hs.storage_mb > 0)
             )

      assert Repo.exists?(
               from(hs in HubStat, where: hs.hub_id == ^hub2.hub_id and hs.storage_mb > 0)
             )
    end

    test "Hub is ready but the stat request fails" do
      # Do NOT stub for /storage
      stub_failed_storage_ret_get()

      # Set ready hubs in table
      %{hub: hub1} = create_test_account_and_hub()

      HubStat.job_record_hub_stats()

      assert !Repo.exists?(
               from(hs in HubStat, where: hs.hub_id == ^hub1.hub_id and hs.storage_mb > 0)
             )
    end
  end

  defp stub_failed_storage_ret_get() do
    Dash.HttpMock
    |> Mox.stub(:get, fn url, _headers, _options ->
      cond do
        url =~ ~r/storage$/ ->
          {:ok, %HTTPoison.Response{status_code: 500}}

        true ->
          Logger.error(
            "Inside test, hit set up in stub_failed_storage_ret_get/0, but GET request URL did not match either condition, did you mean to do that?"
          )
      end
    end)
  end
end
