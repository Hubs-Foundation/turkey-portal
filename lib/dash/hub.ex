defmodule Dash.Hub do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset
  alias Dash.Repo

  @ret_access_key Application.get_env(:dash, Dash.Hub)[:dashboard_ret_access_key]
  @primary_key {:hub_id, :id, autogenerate: true}

  schema "hubs" do
    field :ccu_limit, :integer
    field :instance_uuid, Ecto.UUID
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
    |> cast(attrs, [:name])
    |> validate_length(:name, min: 1, max: 24)
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
    tier: :mvp,
    ccu_limit: 25,
    storage_limit_mb: 2000
  }

  def create_default_hub(%Dash.Account{} = account, fxa_email) do
    # TODO replace with request to orchestrator with email for a round trip to get this information.
    subdomain_and_name = rand_string(10)

    new_hub_params =
      %{
        instance_uuid: fake_uuid(),
        name: subdomain_and_name,
        subdomain: subdomain_and_name,
        status: :creating
      }
      |> Map.merge(@hub_defaults)

    new_hub =
      %Dash.Hub{}
      |> Dash.Hub.changeset(new_hub_params)
      |> Ecto.Changeset.put_assoc(:account, account)
      |> Dash.Repo.insert!()

    with {:ok, _} <- Dash.OrchClient.create_hub(fxa_email, new_hub) do
      new_hub = new_hub |> change(status: :ready) |> Dash.Repo.update!()
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
    with %Dash.Hub{} = hub <- get_hub(hub_id, account) do
      form_changeset(hub, attrs) |> Dash.Repo.update()
    else
      {:error, err} -> {:error, err}
      err -> err
    end
  end

  # Returns current CCU and Storage
  defp get_hub_usage_stats(%Dash.Hub{} = hub) do
    current_ccu =
      case get_current_ccu(hub) do
        {:ok, ccu} ->
          ccu

        {:error, error} ->
          IO.inspect(["Error getting ccu", error])
          nil
      end

    current_storage_mb =
      case get_current_storage_usage_mb(hub) do
        {:ok, storage_mb} -> storage_mb
        {:error, _} -> nil
      end

    %{current_ccu: current_ccu, current_storage_mb: current_storage_mb}
  end

  @ret_host_prefix "hc-"
  @ret_internal_port "4000"
  defp get_hub_internal_host_url(%Dash.Hub{} = hub) do
    # TODO when we fix the hub_uid bug with orchestrator update hub.subdomain to the fix
    "https://#{@ret_host_prefix}#{hub.subdomain}:#{@ret_internal_port}"
  end

  @ret_internal_scope "/api-internal/v1/"
  defp fetch_hub_internal_endpoint(%Dash.Hub{} = hub, endpoint) do
    # Make the http client module configurable so that we can mock it out in tests.
    http_client = Application.get_env(:dash, Dash.Hub)[:http_client] || HTTPoison

    http_client.get(
      get_hub_internal_host_url(hub) <> @ret_internal_scope <> endpoint,
      %{"x-ret-dashboard-access-key" => @ret_access_key},
      hackney: [:insecure]
    )
  end

  @ccu_endpoint "presence"
  defp get_current_ccu(%Dash.Hub{} = hub) do
    case fetch_hub_internal_endpoint(hub, @ccu_endpoint) do
      # Reticulum returned the ccu correctly
      {:ok, %{status_code: 200, body: body}} ->
        %{"count" => count} = Poison.Parser.parse!(body)
        {:ok, count}

      # Reticulum completed the request but did not return the ccu
      {:ok, %{status_code: _} = response} ->
        IO.inspect(response)
        {:error, :no_ccu_returned}

      # An error occurred
      {:error, reason} ->
        IO.inspect(reason)
        {:error, reason}
    end
  end

  @storage_endpoint "storage"
  defp get_current_storage_usage_mb(%Dash.Hub{} = hub) do
    case fetch_hub_internal_endpoint(hub, @storage_endpoint) do
      {:ok, %{status_code: 200, body: body}} ->
        %{"storage_mb" => storage_mb} = Poison.Parser.parse!(body)
        {:ok, storage_mb}

      {:ok, _} ->
        # TODO Log and error here when we introduce Logger
        {:error, :no_storage_returned}

      {:error, reason} ->
        # TODO Log and error here when we introduce Logger
        {:error, reason}
    end
  end
end
