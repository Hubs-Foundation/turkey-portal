defmodule Dash.Repo.Migrations.AddDomainRegionColumnsToHubs do
  use Ecto.Migration

  def change do
    alter table(:hubs) do
      add :domain :string
      add :region :string
    end
  end
end
