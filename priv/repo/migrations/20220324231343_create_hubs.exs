defmodule Prtl.Repo.Migrations.CreateHubs do
  use Ecto.Migration

  def change do
    create table(:hubs, primary_key: false) do
      add :hub_id, :bigint, default: fragment("next_id()"), primary_key: true
      add :hub_instance_uuid, :uuid
      add :hub_name, :string
      add :ccu_limit, :integer
      add :storage_limit_mb, :integer
      add :tier, :string
      add :subdomain, :string
      add :status, :string
      add :account_id, references(:accounts, column: :account_id, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:hubs, [:subdomain])
    create unique_index(:hubs, [:hub_instance_uuid])
    create index(:hubs, [:account_id])
  end
end
