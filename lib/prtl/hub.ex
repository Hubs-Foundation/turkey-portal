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

  # def has_hubs(%Prtl.Account{} = account) do
  #   Repo.exists?(from(h in Prtl.Hub, where: h.account_id == ^account.account_id))
  # end

  @free_hub_defaults %{
    tier: :free,
    ccu_limit: 5,
    storage_limit_mb: 100
  }

  def create_default_free_hub(%Prtl.Account{} = account, fxa_email, cookie) do
    # TODO replace with request to orchestrator with email for a round trip to get this information.
    free_subdomain_and_name = rand_string(10)

    new_hub_params =
      %{
        instance_uuid: fake_uuid(),
        name: free_subdomain_and_name,
        subdomain: free_subdomain_and_name,
        status: :creating
      }
      |> Map.merge(@free_hub_defaults)

    new_hub =
      %Prtl.Hub{}
      |> Prtl.Hub.changeset(new_hub_params)
      |> Ecto.Changeset.put_assoc(:account, account)
      |> Prtl.Repo.insert!()

    with {:ok, _} <- Prtl.OrchClient.create_hub(fxa_email, new_hub, cookie) do
      {:ok, new_hub}
    else
      # TODO Should we delete the hub from the db or set status = :error enum?
      {:error, err} -> {:error, err}
    end
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

  def get_hub(hub_id, %Prtl.Account{} = account) do
    Prtl.Hub |> Prtl.Repo.get_by(hub_id: hub_id, account_id: account.account_id)
  end

  def delete_hub(hub_id, %Prtl.Account{} = account) do
    hub_to_delete = get_hub(hub_id, account)

    case hub_to_delete do
      %Prtl.Hub{} ->
        Prtl.Repo.delete!(hub_to_delete)

      nil ->
        nil
    end
  end
end
