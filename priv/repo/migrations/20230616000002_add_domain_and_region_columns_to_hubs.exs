defmodule Dash.Repo.Migrations.AddDomainAndRegionColumnsToHubs do
  use Ecto.Migration

  def change do
    alter table(:hubs) do
      add :domain, :string, unless_exists: true
      add :region, :string, unless_exists: true
    end
  end
end
