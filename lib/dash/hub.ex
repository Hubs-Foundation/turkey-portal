defmodule Dash.Hub do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset
  alias Dash.Repo

  @primary_key {:hub_id, :id, autogenerate: true}

  schema "hubs" do
    field :ccu_limit, :integer
    field :instance_uuid, Ecto.UUID
    field :name, :string
    field :status, Ecto.Enum, values: [:creating, :updating, :ready]
    field :storage_limit_mb, :integer
    field :subdomain, :string
    field :tier, Ecto.Enum, values: [:free, :premium]
    belongs_to :account, Dash.Account, references: :account_id

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

  def hubs_for_account(%Dash.Account{} = account) do
    from(h in Dash.Hub, where: h.account_id == ^account.account_id)
    |> Repo.all()
  end

  @free_hub_defaults %{
    tier: :free,
    ccu_limit: 5,
    storage_limit_mb: 100
  }

  def create_default_free_hub(%Dash.Account{} = account, fxa_email) do
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
      %Dash.Hub{}
      |> Dash.Hub.changeset(new_hub_params)
      |> Ecto.Changeset.put_assoc(:account, account)
      |> Dash.Repo.insert!()

    with {:ok, _} <- Dash.OrchClient.create_hub(fxa_email, new_hub) do
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

  def get_hub(hub_id, %Dash.Account{} = account) do
    Dash.Hub |> Dash.Repo.get_by(hub_id: hub_id, account_id: account.account_id)
  end

  def delete_hub(hub_id, %Dash.Account{} = account) do
    hub_to_delete = get_hub(hub_id, account)

    case hub_to_delete do
      %Dash.Hub{} ->
        Dash.Repo.delete!(hub_to_delete)

      nil ->
        nil
    end
  end

  def update_hub(hub_id, attrs, %Dash.Account{} = account) do
    with %Dash.Hub{} = hub <- get_hub(hub_id, account),
         {:ok} <- validate_storage(hub, attrs) do
      form_changeset(hub, attrs) |> Dash.Repo.update()
    else
      {:error, err} -> {:error, err}
      err -> err
    end
  end

  # If updating storage
  defp validate_storage(
         %Dash.Hub{} = hub_to_update,
         %{"storage_limit_mb" => new_storage_limit_mb}
       ) do
    cur_storage = get_current_storage_usage_mb(hub_to_update.instance_uuid)

    if cur_storage < String.to_integer(new_storage_limit_mb) do
      {:ok}
    else
      {:error, :usage_over_limit}
    end
  end

  # If not updating storage
  defp validate_storage(%Dash.Hub{} = _hub_to_update, _), do: {:ok}

  defp get_current_storage_usage_mb(_instance_uid) do
    # TODO ask orchestrator for current storage useage
    50
  end
end
