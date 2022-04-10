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
    |> cast(attrs, [
      :instance_uuid,
      :name,
      :ccu_limit,
      :storage_limit_mb,
      :tier,
      :subdomain,
      :status
    ])
    |> validate_required([
      :instance_uuid,
      :name,
      :ccu_limit,
      :storage_limit_mb,
      :tier,
      :subdomain,
      :status
    ])
    |> unique_constraint(:subdomain)
    |> unique_constraint(:instance_uuid)
  end

  def hubs_for_account(%Prtl.Account{} = account) do
    from(h in Prtl.Hub, where: h.account_id == ^account.account_id)
    |> Repo.all()
  end

  def create_default_free_hub(account = %Prtl.Account{}, _fxa_email) do
    # TODO replace with request to orchestrator with email for a round trip to get this information.

    free_subdomain_and_name = rand_string(10)

    %Prtl.Hub{}
    |> Prtl.Hub.changeset(%{
      instance_uuid: fake_uuid(),
      name: free_subdomain_and_name,
      subdomain: free_subdomain_and_name,
      tier: :free,
      ccu_limit: 5,
      storage_limit_mb: 100,
      status: :creating
    })
    |> Ecto.Changeset.put_assoc(:account, account)
    |> Prtl.Repo.insert!()
  end

  defp rand_string(len) do
    chars = "0123456789abcdef" |> String.graphemes()

    1..len
    |> Enum.map(fn _ -> chars |> Enum.take_random(1) end)
    |> Enum.join("")
  end

  defp fake_uuid() do
    [
      rand_string(8),
      rand_string(4),
      rand_string(4),
      rand_string(4),
      rand_string(12)
    ]
    |> Enum.join("-")
  end
end
