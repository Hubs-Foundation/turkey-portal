defmodule Dash.Repo.Migrations.CreateStorageStats do
  use Ecto.Migration

  def change do
    create table(:storage_stats) do
      add :measured_at, :utc_datetime
      add :storage_mb, :integer
      add :hub_id, references(:hubs, column: :hub_id, on_delete: :nothing)

      timestamps()
    end

    create index(:storage_stats, [:hub_id])
  end
end
