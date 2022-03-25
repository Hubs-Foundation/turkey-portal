defmodule Prtl.Hub do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset
  alias Prtl.Repo

  @primary_key {:hub_id, :id, autogenerate: true}

  schema "hubs" do
    field :ccu_limit, :integer
    field :instance_uuid, Ecto.UUID
    field :name, :string
    field :status, Ecto.Enum, values: [:creating, :updating, :ready]
    field :storage_limit_mb, :integer
    field :subdomain, :string
    field :tier, Ecto.Enum, values: [:free, :premium]
    belongs_to :account, Prtl.Account, references: :account_id

    timestamps()
  end

  @doc false
  def changeset(hub, attrs) do
    hub
    |> cast(attrs, [:instance_uuid, :name, :ccu_limit, :storage_limit_mb, :tier, :subdomain, :status])
    |> validate_required([:instance_uuid, :name, :ccu_limit, :storage_limit_mb, :tier, :subdomain, :status])
    |> unique_constraint(:subdomain)
    |> unique_constraint(:instance_uuid)
  end

  def hubs_for_account(%Prtl.Account{} = account) do
      from(h in Prtl.Hub, where: h.account_id == ^account.account_id)
      |> Repo.all()
  end
end
