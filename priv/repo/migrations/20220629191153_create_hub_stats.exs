defmodule Dash.Repo.Migrations.CreateHubStats do
  use Ecto.Migration

  def change do
    create table(:hub_stats, primary_key: false) do
      add :measured_at, :utc_datetime
      add :storage_mb, :integer
      add :hub_id, :bigint
    end

    create index(:hub_stats, [:hub_id])
  end
end
