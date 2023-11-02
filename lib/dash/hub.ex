defmodule Dash.Hub do
  use Ecto.Schema

  alias Dash.{HubDeployment, Repo, RetClient, SubdomainDenial, TaskSupervisor, HubStat}
  import Dash.Utils, only: [rand_string: 1]
  import Ecto.Changeset
  import Ecto.Query
  require Logger

  @type id :: pos_integer
  @type t :: %__MODULE__{account_id: id}
  @derive {Jason.Encoder, only: [:tier,:hub_id]}
  

  @personal_ccu_limit 20
  @personal_storage_limit_mb 2_000

  @primary_key {:hub_id, :id, autogenerate: true}
  schema "hubs" do
    field :ccu_limit, :integer
    field :status, Ecto.Enum, values: [:creating, :updating, :ready, :subdomain_error, :error]
    field :storage_limit_mb, :integer
    field :subdomain, :string
    field :tier, Ecto.Enum, values: [:mvp, :p0, :p1, :b0]

    belongs_to :account, Dash.Account, references: :account_id

    has_one :deployment, HubDeployment, foreign_key: :hub_id
    has_many :hub_stats, HubStat, foreign_key: :hub_id
    timestamps()
  end

  def changeset(hub, attrs) do
    hub
    |> cast(attrs, [
      :ccu_limit,
      :storage_limit_mb,
      :tier,
      :subdomain,
      :status
    ])
    |> validate_required([
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
    |> cast(attrs, [:subdomain])
    |> validate_required(:subdomain)
    |> validate_length(:subdomain, min: 3, max: 63)
    |> validate_format(:subdomain, ~r/^[a-z0-9]/)
    |> validate_format(:subdomain, ~r/^[a-z0-9-]+$/)
    |> validate_format(:subdomain, ~r/[a-z0-9]$/)
    |> validate_change(
      :subdomain,
      &deny_reserved_and_naughty_subdomain/2
    )
    |> unique_constraint(:subdomain)
  end

  defp deny_reserved_and_naughty_subdomain(:subdomain, subdomain) do
    if SubdomainDenial.is_denied_subdomain(subdomain) do
      [subdomain: "denied"]
    else
      []
    end
  end

  @spec hubs_for_account(%Dash.Account{}) :: [%Dash.Hub{}]
  def hubs_for_account(%Dash.Account{} = account) do
    Repo.all(from h in Dash.Hub, where: h.account_id == ^account.account_id, preload: :deployment)
  end

  def hubs_with_usage_stats_for_account(%Dash.Account{} = account) do
    hubs = hubs_for_account(account)
    Enum.map(hubs, fn h -> Map.merge(h, get_hub_usage_stats(h)) end)
  end

  # Returns a boolean of whether the account has a hub
  def has_hubs(%Dash.Account{} = account) do
    Repo.exists?(from h in Dash.Hub, where: h.account_id == ^account.account_id)
  end

  # TODO EA remove
  def has_creating_hubs(%Dash.Account{} = account) do
    Repo.exists?(
      from h in Dash.Hub,
        where: h.account_id == ^account.account_id,
        where: h.status == :creating
    )
  end

  # Checks if account has at least one hub, if not, creates hub
  # Will wait for hub to be ready before
  def ensure_default_hub_is_ready(%Dash.Account{} = account, email, has_subscription?) do
    # TODO: test this behavior somewhere
    if has_subscription? and not has_hubs(account) do
      Repo.transaction(fn -> create_default_hub(account, email) end)
    end

    hub =
      Repo.one(
        from h in Dash.Hub,
          where: h.account_id == ^account.account_id,
          preload: :deployment
      )

    case hub && hub.status do
      # TODO EA make own hub controller endpoint for waiting_until_ready_state
      :creating ->
        update_hub_status(hub)

      :updating ->
        Task.Supervisor.start_child(TaskSupervisor, fn -> update_hub_status(hub) end)
        :ok

      _ ->
        :ok
    end
  end

  @spec update_hub_status(Hub.t()) :: :ok | {:error, String.t()}
  defp update_hub_status(hub) do
    case RetClient.wait_until_healthy(hub) do
      {:ok} ->
        set_hub_to_ready(hub)
        :ok

      {:error, error} ->
        Logger.error("Failed to update hub. Hub ID: #{hub.hub_id}. Error: #{inspect(error)}")
        {:error, error}
    end
  end

  def create_default_hub(%Dash.Account{} = account, fxa_email) do
    hub =
      Repo.insert!(%__MODULE__{
        account_id: account.account_id,
        ccu_limit: @personal_ccu_limit,
        status: :creating,
        storage_limit_mb: @personal_storage_limit_mb,
        subdomain: rand_string(10),
        tier: :p1
      })

    {:ok, %{body: json, status_code: 200}} = Dash.OrchClient.create_hub(fxa_email, hub)

    domain =
      json
      |> Jason.decode!()
      |> Map.fetch!("domain")

    Dash.Repo.insert!(%Dash.HubDeployment{
      domain: domain,
      hub_id: hub.hub_id
    })

    {:ok, hub}
  end

  defp get_hub(hub_id, %Dash.Account{} = account) do
    Dash.Hub |> Repo.get_by(hub_id: hub_id, account_id: account.account_id)
  end

  defp get_hub(_hub_id, nil) do
    Logger.error("Can't get_hub() account is nil")
    nil
  end

  def get_all_ready_hub_ids() do
    Repo.all(
      from h in Dash.Hub,
        where: h.status == :ready,
        select: h.hub_id
    )
  end

  @spec delete_hub(String.t(), String.t()) :: %Dash.Hub{} | :error
  def delete_hub(hub_id, fxa_uid) when is_binary(fxa_uid) do
    account = Dash.Account.account_for_fxa_uid(fxa_uid)

    case get_hub(hub_id, account) do
      %Dash.Hub{} = hub_to_delete ->
        delete_hub(hub_to_delete)

      nil ->
        Logger.error("delete_hub/2 error: No account for fxa_uid OR no hub for hub_id")
        :error
    end
  end

  def delete_hub(%Dash.Hub{} = hub) do
    with :ok <- delete_hub_instance(hub) do
      delete_hub_record(hub)
    else
      _ ->
        Logger.error("Issue deleting hub")
        :error
    end
  end

  @spec delete_hub_instance(%Dash.Hub{}) :: :ok | :error
  defp delete_hub_instance(%Dash.Hub{} = hub) do
    case Dash.OrchClient.delete_hub(hub) do
      {:ok, %{status_code: 200}} ->
        :ok

      {:ok, %{status_code: status_code} = resp} ->
        Logger.warning(
          "Deleting hub Orch request returned status code #{status_code} and response #{inspect(resp)}"
        )

        :error

      {:error, %HTTPoison.Error{} = httpoison_error} ->
        Logger.error("Failed to delete hub #{inspect(httpoison_error)}")
        :error

      {:ok, _} ->
        Logger.error("Failed to delete Hub, unknown error occurred")
        :error
    end
  end

  @spec delete_hub_record(%Dash.Hub{}) :: :ok | :error
  defp delete_hub_record(%Dash.Hub{} = hub) do
    case Repo.delete(hub) do
      {:ok, _} ->
        :ok

      {:error, changeset} ->
        Logger.error("Failed to delete hub #{inspect(changeset)}")
        :error
    end
  end

  def set_hub_to_ready(%Dash.Hub{} = hub) do
    hub |> change(status: :ready) |> Dash.Repo.update!()
  end

  def update_hub(hub_id, attrs, %Dash.Account{} = account) do
    attrs =
      if attrs["subdomain"] do
        Map.put(attrs, "subdomain", attrs["subdomain"] |> String.downcase())
      else
        attrs
      end

    with %Dash.Hub{status: :ready} = hub <- get_hub(hub_id, account),
         {:ok, updated_hub} <-
           hub
           |> Repo.preload(:deployment)
           |> form_changeset(attrs)
           |> Dash.Repo.update() do
      if hub.subdomain != updated_hub.subdomain do
        updated_hub =
          updated_hub |> Ecto.Changeset.change(status: :updating) |> Dash.Repo.update!()

        start_subdomain_update(hub, updated_hub)

        {:ok, updated_hub}
      else
        {:ok, updated_hub}
      end
    else
      err ->
        Logger.error("Failed to update hub. #{inspect(err)}")
        {:error, :update_hub_failed}
    end
  end

  def validate_subdomain(excluded_hub_id, subdomain) do
    downcased_subdomain = subdomain |> String.downcase()

    cond do
      SubdomainDenial.is_denied_subdomain(downcased_subdomain) ->
        {:error, :subdomain_denied}

      subdomain_exists(excluded_hub_id, downcased_subdomain) ->
        {:error, :subdomain_taken}

      true ->
        {:ok}
    end
  end

  defp subdomain_exists(excluded_hub_id, subdomain) do
    Repo.exists?(
      from h in Dash.Hub,
        where: h.hub_id != ^excluded_hub_id,
        where: h.subdomain == ^subdomain
    )
  end

  defp start_subdomain_update(%Dash.Hub{} = previous_hub, %Dash.Hub{} = updated_hub) do
    # This async task runs in the background, asynchronously, under the TaskSupervisor.
    # It needs to be able to handle success and failure scenarios in a self-contained manner.
    Task.Supervisor.start_child(TaskSupervisor, fn ->
      with {:ok, %{status_code: status_code}} when status_code < 400 <-
             Dash.OrchClient.update_subdomain(updated_hub),
           :ok <- Process.sleep(Dash.subdomain_wait()),
           {:ok} <-
             RetClient.wait_until_healthy(updated_hub) do
        set_hub_to_ready(updated_hub)
      else
        err ->
          Logger.error(
            "Failed to update subdomain. Reverting subdomain. Hub ID: #{updated_hub.hub_id}. Error: #{inspect(err)}"
          )

          try_revert_subdomain(previous_hub, updated_hub)
      end
    end)
  end

  defp try_revert_subdomain(%Dash.Hub{} = previous_hub, %Dash.Hub{} = updated_hub) do
    try do
      # If the subdomain update failed, we assume that the hub instance will still be available
      # at the previous subdomain, so we revert it and set it to ready.
      updated_hub
      |> form_changeset(%{subdomain: previous_hub.subdomain})
      |> change(status: :ready)
      |> Dash.Repo.update!()
    rescue
      err ->
        Logger.error(
          "Subdomain could not be reverted. Hub ID: #{updated_hub.hub_id} Error: #{inspect(err)}"
        )

        # Even the revert failed, possibly because the previous subdomain has now been taken by another user.
        # TODO EA We should handle this better in the future by reserving the previous subdomain,
        # while updating to a new subdomain, so that it cannot be taken during an update.
        updated_hub |> change(status: :subdomain_error) |> Dash.Repo.update!()
    end
  end

  # Returns current CCU and Storage
  defp get_hub_usage_stats(%Dash.Hub{} = hub) do
    if Application.get_env(:dash, Dash.Hub)[:use_fake_hub_stats] === true do
      %{current_ccu: 10, current_storage_mb: 20}
    else
      current_ccu = RetClient.get_current_ccu(hub)
      current_storage_mb = RetClient.get_current_storage_usage_mb(hub)
      %{current_ccu: current_ccu, current_storage_mb: current_storage_mb}
    end
  end
end
