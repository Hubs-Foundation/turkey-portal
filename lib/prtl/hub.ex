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

  def form_changeset(hub, attrs) do
    hub
    |> cast(attrs, [
      :name,
      :ccu_limit,
      :storage_limit_mb,
      :tier
    ])
    |> validate_required([
      :name,
      :ccu_limit,
      :storage_limit_mb,
      :tier
    ])
  end

  def hubs_for_account(%Prtl.Account{} = account) do
    from(h in Prtl.Hub, where: h.account_id == ^account.account_id)
    |> Repo.all()
  end

  def create_default_free_hub(%Prtl.Account{} = account, _fxa_email) do
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

  def update_hub(hub_id, attrs, %Prtl.Account{} = account) do
    with %Prtl.Hub{} = hub <- get_hub(hub_id, account),
         old_updated_at = hub.updated_at

    {:ok} <-
      validate_storage(hub, attrs) do
        form_changeset(hub, attrs) |> Prtl.Repo.update()
      else
        {:error, err} -> {:error, err}
        err -> err
      end
  end

  # If updating storage
  defp validate_storage(
         %Prtl.Hub{} = hub_to_update,
         %{"storage_limit_mb" => new_storage_limit_mb} = _
       ) do
    cur_storage = get_current_storage_usage_mb(hub_to_update.instance_uuid)

    if cur_storage < String.to_integer(new_storage_limit_mb) do
      {:ok}
    else
      {:error, :usage_over_limit}
    end
  end

  # If not updating storage
  defp validate_storage(%Prtl.Hub{} = hub_to_update, _), do: {:ok}

  defp get_current_storage_usage_mb(_instance_uid) do
    # TODO ask orchestrator for current storage useage
    50
  end
end
