defmodule Dash.Repo.Migrations.MakeIndexOnHubsAccountIdUnique do
  use Ecto.Migration

  def change do
    drop index(:hubs, [:account_id])
    create unique_index(:hubs, [:account_id])
  end
end
