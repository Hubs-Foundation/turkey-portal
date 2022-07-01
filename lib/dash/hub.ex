defmodule Dash.Hub do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset
  require Logger
  alias Dash.{Repo, RetClient}

  @whole_reserved_subdomains ["dashboard", "dash", "admin", "hubs", "email", "mail", "auth", "dev", "api"]
  @partial_reserved_subdomains ["mozilla"]
  @denied_subdomains_pattern (@partial_reserved_subdomains ++
                                Dash.SubdomainDenyList.naughty_words())
                             |> Enum.map(&Regex.escape/1)
                             |> Enum.join("|")
  @denied_subdomains_regex Regex.compile!(
                             "(?:#{@denied_subdomains_pattern})",
                             "iu"
                           )

  @primary_key {:hub_id, :id, autogenerate: true}

  schema "hubs" do
    field :ccu_limit, :integer
    field :name, :string
    field :status, Ecto.Enum, values: [:creating, :updating, :ready, :subdomain_error]
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
    if is_denied_subdomain(subdomain) do
      [subdomain: "denied"]
    else
      []
    end
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

  # TODO EA remove
  def has_creating_hubs(%Dash.Account{} = account) do
    has_hubs(account) &&
      Repo.exists?(
        from(h in Dash.Hub, where: h.account_id == ^account.account_id and h.status == :creating)
      )
  end

  # Checks if account has at least one hub, if not, creates hub
  # Will wait for hub to be ready before
  def ensure_default_hub_is_ready(%Dash.Account{} = account, email) do
    if !has_hubs(account), do: create_default_hub(account, email)

    # TODO EA make own hub controller endpoint for waiting_until_ready_state
    if has_creating_hubs(account) do
      hubs = hubs_for_account(account)

      # TODO EA For MVP2 we expect 1 hub
      hub = Enum.at(hubs, 0)

      case Dash.RetClient.wait_until_healthy(hub) do
        {:ok} ->
          set_hub_to_ready(hub)
          {:ok}

        {:error, err} ->
          {:error, err}
      end
    else
      {:ok}
    end
  end

  @hub_defaults %{
    name: "Untitled Hub",
    tier: :mvp,
    ccu_limit: 25,
    storage_limit_mb: 2000
  }

  def create_default_hub(%Dash.Account{} = account, fxa_email) do
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

    case Dash.OrchClient.create_hub(fxa_email, new_hub) do
      {:ok, %{status_code: 200}} ->
        {:ok, new_hub}

      {:ok, %{status_code: status_code} = resp} ->
        Logger.warn(
          "Creating default hub Orch request returned status code #{status_code} and response #{inspect(resp)}"
        )

        {:ok, new_hub}

      {:error, err} ->
        Logger.error("Failed to create default hub #{inspect(err)}")
        new_hub |> change(status: :error) |> Dash.Repo.update!()
        {:error, err}
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
         {:ok, updated_hub} <- form_changeset(hub, attrs) |> Dash.Repo.update() do
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
      is_denied_subdomain(downcased_subdomain) ->
        {:error, :subdomain_denied}

      subdomain_exists(excluded_hub_id, downcased_subdomain) ->
        {:error, :subdomain_taken}

      true ->
        {:ok}
    end
  end

  defp is_denied_subdomain(subdomain) do
    Enum.member?(@whole_reserved_subdomains, subdomain) or
      Regex.match?(@denied_subdomains_regex, subdomain)
  end

  defp subdomain_exists(excluded_hub_id, subdomain) do
    Repo.exists?(
      from(h in Dash.Hub,
        where: h.hub_id != ^excluded_hub_id and h.subdomain == ^subdomain
      )
    )
  end

  defp start_subdomain_update(%Dash.Hub{} = previous_hub, %Dash.Hub{} = updated_hub) do
    # This async task runs in the background, asynchronously, under the TaskSupervisor.
    # It needs to be able to handle success and failure scenarios in a self-contained manner.
    Task.Supervisor.async(Dash.TaskSupervisor, fn ->
      with {:ok, %{status_code: status_code}} when status_code < 400 <-
             Dash.OrchClient.update_subdomain(updated_hub),
           {:ok} <- Dash.RetClient.wait_until_healthy(updated_hub) do
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
