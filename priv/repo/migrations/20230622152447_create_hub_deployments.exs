defmodule Dash.Repo.Migrations.CreateHubDeployments do
  use Ecto.Migration

  def change do
    create table("hub_deployments", primary_key: false) do
      add :deployment_id, :bigint, default: fragment("next_id()"), primary_key: true
      add :domain, :string, null: false
      add :hub_id, references("hubs", column: :hub_id, on_delete: :delete_all), null: false
      add :local?, :boolean, null: false, default: false

      timestamps()
    end

    create unique_index("hub_deployments", [:hub_id])
  end
end
