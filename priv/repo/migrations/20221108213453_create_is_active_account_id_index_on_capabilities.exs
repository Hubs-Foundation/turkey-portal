defmodule Dash.Repo.Migrations.CreateIsActiveAccountIdIndexOnCapabilities do
  use Ecto.Migration

  def change do
    create index(:capabilities, [:is_active, :account_id])
  end
end
