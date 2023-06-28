defmodule Dash.HubDeployment do
  use Ecto.Schema

  @primary_key {:deployment_id, :id, autogenerate: true}
  schema "hub_deployments" do
    field :domain, :string
    field :hub_id, :id
    field :local?, :boolean

    timestamps()
  end
end
