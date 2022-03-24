defmodule Prtl.Hub do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:hub_id, :id, autogenerate: true}

  schema "hubs" do
    field :ccu_limit, :integer
    field :hub_instance_uuid, Ecto.UUID
    field :hub_name, :string
    field :status, Ecto.Enum, values: [:creating, :updating, :ready]
    field :storage_limit_mb, :integer
    field :subdomain, :string
    field :tier, Ecto.Enum, values: [:free, :premium]
    belongs_to :account, Prtl.Account

    timestamps()
  end

  @doc false
  def changeset(hub, attrs) do
    hub
    |> cast(attrs, [:hub_instance_uuid, :hub_name, :ccu_limit, :storage_limit_mb, :tier, :subdomain, :status])
    |> validate_required([:hub_instance_uuid, :hub_name, :ccu_limit, :storage_limit_mb, :tier, :subdomain, :status])
    |> unique_constraint(:subdomain)
    |> unique_constraint(:hub_instance_uuid)
  end
end
