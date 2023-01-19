defmodule Dash.HubStatTest do
  use Dash.DataCase
  import Ecto.Query
  import DashWeb.TestHelpers
  import Mox
  require Logger
  alias Dash.{Repo, HubStat}

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  describe "Metrics Hub Stat" do
    setup :verify_on_exit!

    test "Happy path: gets ready hubs storage stats into table" do
      stub_hub_stats()

      # Set ready hubs in table
      %{hub: hub1} = create_test_account_and_hub()
      %{hub: hub2} = create_test_account_and_hub()

      HubStat.job_record_hub_stats()

      # Has each hub storage stats in table
      assert Repo.exists?(
               from hs in HubStat,
                 where: hs.hub_id == ^hub1.hub_id,
                 where: hs.storage_mb > 0,
                 where: hs.max_ccu > 0
             )

      assert Repo.exists?(
               from hs in HubStat,
                 where: hs.hub_id == ^hub2.hub_id,
                 where: hs.storage_mb > 0,
                 where: hs.max_ccu > 0
             )
    end

    test "If /storage stat fails, the max_ccu stat is still inserted into the table" do
      stub_hub_stats(storage: false, max_ccu: true)

      # Set ready hubs in table
      %{hub: hub1} = create_test_account_and_hub()

      HubStat.job_record_hub_stats()

      assert Repo.exists?(
               from hs in HubStat,
                 where: hs.hub_id == ^hub1.hub_id,
                 where: hs.storage_mb > 0,
                 where: hs.max_ccu > 0
             )
    end

    test "If /max_ccu stat fails, the storage stat is still inserted into the table" do
      stub_hub_stats(storage: true, max_ccu: false)

      # Set ready hubs in table
      %{hub: hub1} = create_test_account_and_hub()

      HubStat.job_record_hub_stats()

      assert Repo.exists?(
               from(hs in HubStat,
                 where: hs.hub_id == ^hub1.hub_id and hs.storage_mb > 0 and is_nil(hs.max_ccu)
               )
             )
    end

    test "If both stats fail, do not insert into the table" do
      stub_hub_stats(storage: false, max_ccu: false)

      # Set ready hubs in table
      %{hub: hub1} = create_test_account_and_hub()

      HubStat.job_record_hub_stats()

      refute Repo.exists?(from(hs in HubStat, where: hs.hub_id == ^hub1.hub_id))
    end

    test "Times out work for both requests" do
      # Do not stub for RetClient /max_ccu or /storage
      now = NaiveDateTime.utc_now()
      HubStat.job_record_hub_stats()

      assert NaiveDateTime.diff(NaiveDateTime.utc_now(), now, :millisecond) < 4000
    end

    test "Ensure yesterday_start_end_times_string_and_date() returns the correct times" do
      # Cron job runs every midnight so use today_midnight as the argument

      today_date = NaiveDateTime.utc_now() |> NaiveDateTime.to_date()
      yesterday_date = today_date |> Date.add(-1)
      {:ok, time} = Time.new(0, 0, 0, 0)
      {:ok, today_midnight} = today_date |> NaiveDateTime.new(time)
      {:ok, yesterday_midnight} = yesterday_date |> NaiveDateTime.new(time)

      {start_time, end_time, date} =
        HubStat.yesterday_start_end_times_string_and_date(today_midnight)

      assert is_binary(start_time) and is_binary(end_time)
      refute is_binary(date)

      assert NaiveDateTime.to_string(yesterday_midnight) == start_time
      assert NaiveDateTime.to_string(today_midnight) == end_time
      assert Date.compare(yesterday_date, date) == :eq
    end
  end

  defp stub_hub_stats(opts \\ [storage: true, max_ccu: true]) do
    Dash.HttpMock
    |> Mox.stub(:get, fn url, _headers, _options ->
      cond do
        # Success
        opts[:max_ccu] and url =~ ~r/range_max$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{max_ccu: 10})}}

        opts[:storage] and url =~ ~r/storage$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{storage_mb: 10})}}

        # Failure options
        !opts[:max_ccu] and url =~ ~r/range_max$/ ->
          {:ok, %HTTPoison.Response{status_code: 500}}

        !opts[:storage] and url =~ ~r/storage$/ ->
          {:ok, %HTTPoison.Response{status_code: 500}}

        true ->
          Logger.error(
            "Inside test, hit set up in stub_hub_stats/0, but GET request URL #{url} did not match either condition, did you mean to do that?"
          )
      end
    end)
  end
end
