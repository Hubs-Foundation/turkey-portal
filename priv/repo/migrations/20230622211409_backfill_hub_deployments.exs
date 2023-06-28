defmodule Dash.Repo.Migrations.BackfillHubDeployments do
  use Ecto.Migration

  def change do
    execute """
            INSERT INTO hub_deployments (domain, hub_id, "local?", inserted_at, updated_at)
              SELECT 'myhubs.net', hub_id, true, NOW(), NOW()
              FROM hubs
            """,
            """
            DELETE FROM hub_deployments
            """
  end
end
