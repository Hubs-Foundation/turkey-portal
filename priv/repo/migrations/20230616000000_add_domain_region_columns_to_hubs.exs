defmodule Dash.Repo.Migrations.AddDomainRegionColumnsToHubs do
  use Ecto.Migration

  def change do
    alter table(:hubs) do
      add :domain
      add :region      
    end
  end
end
