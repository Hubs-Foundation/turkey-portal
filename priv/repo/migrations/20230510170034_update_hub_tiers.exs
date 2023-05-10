defmodule Dash.Repo.Migrations.UpdateHubTiers do
  use Ecto.Migration

  def change do
    execute """
            UPDATE hubs
            SET tier = 'p0'
            WHERE tier = 'free'
            """,
            """
            UPDATE hubs
            SET tier = 'free'
            WHERE tier = 'p0'
            """

    execute """
            UPDATE hubs
            SET tier = 'p1'
            WHERE tier = 'early_access'
            """,
            """
            UPDATE hubs
            SET tier = 'early_access'
            WHERE tier = 'p1'
            """
  end
end
