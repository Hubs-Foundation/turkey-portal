defmodule Dash.Hub do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset
  alias Dash.{Repo, RetClient}

  @primary_key {:hub_id, :id, autogenerate: true}

  schema "hubs" do
    field :ccu_limit, :integer
    field :name, :string
    field :status, Ecto.Enum, values: [:creating, :updating, :ready]
    field :storage_limit_mb, :integer
    field :subdomain, :string
    field :tier, Ecto.Enum, values: [:free, :mvp]
    belongs_to :account, Dash.Account, references: :account_id

    timestamps()
  end

  def changeset(hub, attrs) do
    hub
    |> cast(attrs, [
      :name,
      :ccu_limit,
      :storage_limit_mb,
      :tier,
      :subdomain,
      :status
    ])
    |> validate_required([
      :name,
      :ccu_limit,
      :storage_limit_mb,
      :tier,
      :subdomain,
      :status
    ])
    |> unique_constraint(:subdomain)
  end

  def form_changeset(hub, attrs) do
    hub
    |> cast(attrs, [:name, :subdomain])
    |> validate_length(:name, min: 1, max: 24)
    |> validate_length(:subdomain, min: 1, max: 63)
    |> validate_format(:subdomain, ~r/^[a-z0-9]/i)
    |> validate_format(:subdomain, ~r/^[a-z0-9-]+$/i)
    |> validate_format(:subdomain, ~r/[a-z0-9]$/i)
    |> unique_constraint(:subdomain)
  end

  defp hubs_for_account(%Dash.Account{} = account) do
    from(h in Dash.Hub, where: h.account_id == ^account.account_id)
    |> Repo.all()
  end

  def hubs_with_usage_stats_for_account(%Dash.Account{} = account) do
    hubs = hubs_for_account(account)
    Enum.map(hubs, fn h -> Map.merge(h, get_hub_usage_stats(h)) end)
  end

  # Returns a boolean of whether the account has a hub
  def has_hubs(%Dash.Account{} = account) do
    Repo.exists?(from(h in Dash.Hub, where: h.account_id == ^account.account_id))
  end

  # Checks if account has at least one hub, if not, creates hub
  def ensure_default_hub(%Dash.Account{} = account, email) do
    if !has_hubs(account), do: create_default_hub(account, email)
  end

  @hub_defaults %{
    name: "Untitled Hub",
    tier: :mvp,
    ccu_limit: 25,
    storage_limit_mb: 2000
  }

  def create_default_hub(%Dash.Account{} = account, fxa_email) do
    # TODO These random strings are not very pleasant.
    # Maybe use a friendlier name generator instead?
    subdomain = Dash.Utils.rand_string(10)

    new_hub_params =
      %{
        subdomain: subdomain,
        status: :creating
      }
      |> Map.merge(@hub_defaults)

    new_hub =
      %Dash.Hub{}
      |> Dash.Hub.changeset(new_hub_params)
      |> Ecto.Changeset.put_assoc(:account, account)
      |> Repo.insert!()

    with {:ok, _} <- Dash.OrchClient.create_hub(fxa_email, new_hub) do
      # TODO Wait for hub to be fully available, before setting status to :ready
      new_hub = new_hub |> change(status: :ready) |> Dash.Repo.update!()
      {:ok, new_hub}
    else
      # TODO Should we delete the hub from the db or set status = :error enum?
      {:error, err} -> {:error, err}
    end
  end

  def get_hub(hub_id, %Dash.Account{} = account) do
    Dash.Hub |> Repo.get_by(hub_id: hub_id, account_id: account.account_id)
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
         {:ok, updated_hub} <- form_changeset(hub, attrs) |> Dash.Repo.update() do
      if hub.subdomain != updated_hub.subdomain do
        update_subdomain(hub, updated_hub)
      else
        {:ok, updated_hub}
      end
    else
      _err ->
        # TODO Add logging here
        {:error, :update_hub_failed}
    end
  end

  defp update_subdomain(%Dash.Hub{} = previous_hub, %Dash.Hub{} = updated_hub) do
    case Dash.OrchClient.update_subdomain(updated_hub) do
      {:ok, _} ->
        {:ok, updated_hub}

      {:error, _} ->
        # TODO Add logging here
        # Revert the subdomain back to the previous one, since the orchestrator request failed.
        updated_hub |> form_changeset(%{subdomain: previous_hub.subdomain}) |> Dash.Repo.update()
        {:error, :subdomain_update_failed}
    end
  end

  @dev_ccu Application.get_env(:dash, Dash.RetClient)[:ccu]
  @dev_storage_mb Application.get_env(:dash, Dash.RetClient)[:storage_mb]

  defp get_hub_usage_stats(%Dash.Hub{} = _hub)
       when is_integer(@dev_ccu) and is_integer(@dev_storage_mb),
       do: %{current_ccu: @dev_ccu, current_storage_mb: @dev_storage_mb}

  # Returns current CCU and Storage
  defp get_hub_usage_stats(%Dash.Hub{} = hub) do
    current_ccu =
      case RetClient.get_current_ccu(hub) do
        {:ok, ccu} ->
          ccu

        {:error, error} ->
          IO.inspect(["Error getting ccu", error])
          nil
      end

    current_storage_mb =
      case RetClient.get_current_storage_usage_mb(hub) do
        {:ok, storage_mb} -> storage_mb
        {:error, _} -> nil
      end

    %{current_ccu: current_ccu, current_storage_mb: current_storage_mb}
  end
end
