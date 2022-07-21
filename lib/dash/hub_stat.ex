defmodule Dash.HubStat do
  use Ecto.Schema
  alias Dash.{HubStat, Repo, Hub, RetClient}

  @primary_key false
  schema "hub_stats" do
    field :measured_at, :utc_datetime
    field :storage_mb, :integer
    field :hub_id, :integer
  end

  defp hub_stat_for_hub_id(hub_id, measured_at) do
    case RetClient.get_current_storage_usage_mb(hub_id, timeout: 2000) do
      nil ->
        # The server could be unavailable
        nil

      storage_mb ->
        %{
          hub_id: hub_id,
          measured_at: measured_at,
          storage_mb: floor(storage_mb)
        }
    end
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
