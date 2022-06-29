defmodule Dash.StorageStat do
  use Ecto.Schema
  import Ecto.Changeset
  alias Dash.{StorageStat, Repo, Hub, RetClient}

  schema "storage_stats" do
    field :measured_at, :utc_datetime
    field :storage_mb, :integer
    belongs_to :hub, Dash.Hub, references: :hub_id

    timestamps()
  end

  @doc false
  def changeset(storage_stat, attrs) do
    storage_stat
    |> cast(attrs, [:measured_at, :storage_mb])
    |> validate_required([:measured_at, :storage_mb])
  end

  def save_storage_stat(%Dash.Hub{} = hub, storage_mb, measured_at) do
    %StorageStat{}
    |> changeset(%{
      measured_at: measured_at,
      storage_mb: storage_mb
    })
    |> put_assoc(:hub, hub)
    |> Repo.insert()
  end

  def job_record_hubs_daily_storage_stats() do
    if Application.get_env(:dash, Dash.StorageStats)[:enable_storage_stats] do
      hubs = Hub.get_all_hubs()
      measured_at = NaiveDateTime.utc_now()

      Enum.map(hubs, fn hub ->
        case RetClient.get_current_storage_usage_mb(hub) do
          nil ->
            # Could be a hub that doesnt exist anymore or the server is unavailable
            nil

          storage_mb ->
            save_storage_stat(hub, storage_mb, measured_at)
        end
      end)
    end
  end
end
