defmodule Dash.Repo.Migrations.RemoveHubsDomainAndRegion do
  use Ecto.Migration

  def up do
    alter table("hubs") do
      remove_if_exists(:domain, :string)
      remove_if_exists(:region, :string)
    end
  end

  def down do
  end
end
