defmodule Dash.HubStat do
  use Ecto.Schema
  alias Dash.{HubStat, Repo, Hub, RetClient}
  require Logger

  @primary_key false
  schema "hub_stats" do
    field :measured_at, :utc_datetime
    field :storage_mb, :integer
    field :hub_id, :integer
    field :max_ccu, :integer
    field :max_ccu_utc_date, :date
  end

  defp hub_stat_for_hub_id(hub_id, measured_at) do
    with storage_mb <- RetClient.get_current_storage_usage_mb(hub_id, timeout: 1500),
         {start_time, end_time, date} <- yesterday_start_end_times_string_and_date(measured_at),
         max_ccu <- RetClient.get_max_ccu_for_range(hub_id, start_time, end_time, timeout: 1500) do
      case {storage_mb, max_ccu} do
        {nil, nil} ->
          # The server could be unavailable
          nil

        {storage_mb, max_ccu} ->
          %{
            hub_id: hub_id,
            measured_at: measured_at,
            storage_mb: storage_mb,
            max_ccu: max_ccu,
            max_ccu_utc_date: date
          }
      end
    else
      error ->
        Logger.error("Error getting hub_stat_for_hub_id: #{inspect(error)}")
        nil
    end
  end

  # now_utc_time expects NaiveDateTime
  # Example return: {"2022-07-14 00:00:00.000000", "2022-07-15 00:00:00.000000", ~D[2022-07-14]}
  def yesterday_start_end_times_string_and_date(now_utc_time) do
    # Convert to dates
    today_date = now_utc_time |> NaiveDateTime.to_date()
    yesterday_date = today_date |> Date.add(-1)

    # Convert to dates with times
    {:ok, time} = Time.new(0, 0, 0, 0)
    {:ok, start_time} = yesterday_date |> NaiveDateTime.new(time)
    {:ok, end_time} = today_date |> NaiveDateTime.new(time)

    {start_time |> NaiveDateTime.to_string(), end_time |> NaiveDateTime.to_string(),
     yesterday_date}
  end

  def job_record_hub_stats() do
    if Application.get_env(:dash, __MODULE__)[:enable_hub_stats] do
      {:ok, measured_at} = Ecto.Type.cast(:utc_datetime, NaiveDateTime.utc_now())

      list_new_stats_not_nil =
        Hub.get_all_ready_hub_ids()
        |> Enum.map(fn hub_id -> hub_stat_for_hub_id(hub_id, measured_at) end)
        # Removes all nil values in the list
        |> Enum.reject(&is_nil/1)

      Repo.insert_all(HubStat, list_new_stats_not_nil)
    end
  end
end
