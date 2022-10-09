defmodule Dash.Repo.Migrations.CreateSubscriptions do
  use Ecto.Migration

  def change do
    create table(:subscriptions) do
      add :capability, :string
      add :is_active, :boolean, default: false, null: false
      add :change_time, :utc_datetime
      add :account_id, references(:accounts, column: :account_id, on_delete: :nothing)

      timestamps()
    end
  end
end
