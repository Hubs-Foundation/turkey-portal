defmodule Dash.Repo.Migrations.CreateSubscriptions do
  use Ecto.Migration

  def change do
    create table(:subscriptions) do
      add :capability, :string, null: false
      add :is_active, :boolean, default: false, null: false
      add :change_time, :utc_datetime, null: false

      add :account_id, references(:accounts, column: :account_id, on_delete: :nothing),
        null: false

      create unique_index(:subscriptions, [:capability, :account_id])

      timestamps()
    end
  end
end
