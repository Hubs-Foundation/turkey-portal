defmodule Dash.Repo.Migrations.CreateCapabilities do
  use Ecto.Migration

  def change do
    create table(:capabilities) do
      add :capability, :string, null: false
      add :is_active, :boolean, default: false, null: false
      add :change_time, :utc_datetime, null: false

      add :account_id, references(:accounts, column: :account_id, on_delete: :nothing),
        null: false

      timestamps()
    end

    create unique_index(:capabilities, [:capability, :account_id])
  end
end
