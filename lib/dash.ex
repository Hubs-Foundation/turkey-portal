defmodule Dash do
  @moduledoc """
  Boundary of Dash context
  """
  alias Dash.{Account, Capability, Hub, Plan, PlanStateMachine, Repo}
  import Ecto.Query
  require Logger

  @doc """
  Expires the plan subscription of the given `account`.

  This converts an existing plan to a starter plan.

  Returns `:ok` if successful.  Otherwise, `{:error, reason}` is returned.
  """
  @spec expire_plan_subscription(Account.t(), DateTime.t()) ::
          :ok | {:error, :account_not_found | :no_subscription | :superseded}
  def expire_plan_subscription(%Account{} = account, %DateTime{} = expired_at),
    do: PlanStateMachine.handle_event({:expire_subscription, expired_at}, account)

  @doc """
  Finds the active plan for the given `account`.

  Returns `{:ok, plan}` if found.  Otherwise, `{:error, reason}` is returned.
  """
  @spec fetch_active_plan(Account.t()) ::
          {:ok, Plan.t()} | {:error, :account_not_found | :no_active_plan}
  def fetch_active_plan(%Account{} = account),
    do: PlanStateMachine.handle_event(:fetch_active_plan, account)

  @doc """
  Gets the hub for the given `account`.

  Returns `nil` if the hub does not exist.
  """
  @spec get_hub(Hub.id(), Account.t()) :: Hub.t() | nil
  def get_hub(hub_id, %Account{account_id: account_id}) when is_integer(hub_id) and hub_id > 0,
    do:
      Hub
      |> Repo.get_by(hub_id: hub_id, account_id: account_id)
      |> Repo.preload(:deployment)

  @doc """
  Creates a starter plan for the given `account`.

  Returns `:ok` if successful.  Otherwise, `{:error, reason}` is returned.
  """
  @spec start_plan(Account.t()) :: :ok | {:error, :account_not_found | :already_started}
  def start_plan(%Account{} = account),
    do: PlanStateMachine.handle_event(:start, account)

  @doc """
  Subscribes the given `account` to a personal plan.

  This converts an existing plan to a personal plan or creates one if none
  exists.

  Returns `:ok` if successful.  Otherwise, `{:error, reason}` is returned.
  """
  @spec subscribe_to_personal_plan(Account.t(), DateTime.t()) ::
          :ok | {:error, :account_not_found | :already_started | :superseded}
  def subscribe_to_personal_plan(%Account{} = account, %DateTime{} = subscribed_at),
    do: PlanStateMachine.handle_event({:subscribe_personal, subscribed_at}, account)

  @doc """
  Subscribes the given `account` to a professional plan.

  This converts an existing plan to a professional plan or creates one if none
  exists.

  Returns `:ok` if successful.  Otherwise, `{:error, reason}` is returned.
  """
  @spec subscribe_to_professional_plan(Account.t(), DateTime.t()) ::
          :ok | {:error, :account_not_found | :already_started | :superseded}
  def subscribe_to_professional_plan(%Account{} = account, %DateTime{} = subscribed_at),
    do: PlanStateMachine.handle_event({:subscribe_professional, subscribed_at}, account)

  def update_or_create_capability_for_changeset(
        %{
          fxa_uid: fxa_uid,
          capability: capability,
          is_active: is_active,
          change_time: change_time
        } = new_capability_info
      ) do
    account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

    case get_one_capability(account, capability: capability) do
      nil ->
        create_capability!(account, Map.delete(new_capability_info, :fxa_uid))

      capability ->
        if outdated?(capability, change_time),
          do: update_capability!(capability, %{is_active: is_active, change_time: change_time})
    end
  end

  @spec outdated?(Capability.t(), DateTime.t()) :: boolean
  defp outdated?(%Capability{change_time: old_time}, change_time),
    do: DateTime.compare(old_time, change_time) != :gt

  @spec update_capability!(
          %Capability{},
          %{change_time: any, is_active: any}
        ) :: %Capability{}
  defp update_capability!(%Capability{} = capability, %{
         is_active: is_active,
         change_time: change_time
       }) do
    capability
    |> Ecto.Changeset.change(
      is_active: is_active,
      change_time: change_time
    )
    |> Dash.Repo.update!()
  end

  @spec has_capability?(%Dash.Account{}) :: boolean
  def has_capability?(%Account{} = account) do
    Repo.exists?(from c in Capability, where: c.account_id == ^account.account_id)
  end

  @spec get_one_capability(%Account{}, capability: String.t()) ::
          %Capability{} | nil
  def get_one_capability(%Account{} = account, capability: capability) do
    Repo.get_by(Capability, capability: capability, account_id: account.account_id)
  end

  @spec get_all_capabilities_for_account(%Account{}) ::
          [%Capability{}] | []
  def get_all_capabilities_for_account(%Account{} = account) do
    Repo.all(from c in Capability, where: c.account_id == ^account.account_id)
  end

  @spec get_all_active_capabilities_for_account(%Account{}) :: [String.t()]
  def get_all_active_capabilities_for_account(%Account{} = account) do
    Repo.all(
      from c in Capability,
        where: c.is_active,
        where: c.account_id == ^account.account_id,
        select: c.capability
    )
  end

  @spec create_capability!(%Account{}, %{
          :capability => String.t(),
          :change_time => %DateTime{},
          :is_active => boolean()
        }) :: %Capability{}
  def create_capability!(%Account{account_id: account_id}, %{
        capability: capability,
        change_time: %DateTime{} = change_time,
        is_active: is_active
      })
      when is_binary(capability) and is_boolean(is_active),
      do:
        Repo.insert!(%Capability{
          account_id: account_id,
          capability: capability,
          change_time: DateTime.truncate(change_time, :second),
          is_active: is_active
        })

  @spec delete_all_capabilities_for_account(%Account{}) :: {integer, nil}
  def delete_all_capabilities_for_account(%Account{} = account) do
    Repo.delete_all(from c in Capability, where: c.account_id == ^account.account_id)
  end

  def currency_and_amount_for_plan(""), do: {nil, nil}

  def currency_and_amount_for_plan(plan_id) when is_binary(plan_id) do
    plans_array = String.split(plan_currency_amount(), ";", trim: true)

    case Enum.find(plans_array, fn plan_info -> String.starts_with?(plan_info, plan_id) end) do
      nil ->
        {nil, nil}

      plan_info ->
        [_plan_id, currency, amount] = String.split(plan_info, ",", trim: true)

        {currency, amount}
    end
  end

  @doc """
  String that follows this format "plan_id_123,USD,20;plan_id_234,EUR,20;plan_id_345,RMB,20"
  """
  def plan_currency_amount(),
    do:
      :dash
      |> Application.fetch_env!(__MODULE__)
      |> Keyword.fetch!(:plans)

  @spec change_email(
          nil
          | %Dash.Account{
              __meta__: any,
              account_id: any,
              auth_updated_at: any,
              email: any,
              fxa_uid: any,
              inserted_at: any,
              updated_at: any
            },
          binary
        ) :: :ok | :error
  def change_email(nil, _email), do: :ok

  def change_email(%Dash.Account{email: nil} = account, email) when is_binary(email) do
    update_email(account, email)
  end

  def change_email(%Dash.Account{email: old_email} = account, email) when is_binary(email) do
    case update_email(account, email) do
      :ok ->
        update_hubs_admin_emails(account, old_email, email)
        :ok

      :error ->
        :error
    end
  end

  defp update_hubs_admin_emails(%Dash.Account{} = account, old_email, email) do
    for hub <- Dash.Hub.hubs_for_account(account) do
      case Dash.RetClient.update_hub_admin_email(hub, old_email, email) do
        :ok ->
          :ok

        :error ->
          Logger.error("Could not update hub's admin email, fxa_uid is #{account.fxa_uid}")
          :error

        {:error, err} ->
          Logger.error(
            "Could not update hub's admin email, fxa_uid is #{account.fxa_uid}, error is: #{inspect(err)}"
          )

          :error
      end
    end
  end

  @spec add_email_to_account(%Account{}, binary) :: %Account{}
  def add_email_to_account(%Account{} = account, email) when is_binary(email) do
    account
    |> Ecto.Changeset.change(email: email)
    |> Repo.update!()
  end

  @spec update_email(%Account{}, binary) :: :ok | :error
  def update_email(%Account{} = account, email) when is_binary(email) do
    case account
         |> Ecto.Changeset.change(email: email)
         |> Repo.update() do
      {:ok, _struct} ->
        :ok

      {:error, _changeset} ->
        Logger.error("Issue updating account with email")
        :error
    end
  end

  def delete_all_hubs_for_account(%Account{} = account) do
    hubs = Dash.Hub.hubs_for_account(account)

    for hub <- hubs do
      Dash.Hub.delete_hub(hub)
    end

    :ok
  end

  @spec fxa_uid_to_deleted_list(String.t()) :: :ok
  def fxa_uid_to_deleted_list(fxa_uid) when is_binary(fxa_uid) do
    Dash.Repo.insert!(%Dash.DeletedFxaAccount{fxa_uid: fxa_uid}, on_conflict: :nothing)
    :ok
  end

  def was_deleted?(fxa_uid) when is_binary(fxa_uid) do
    Repo.exists?(from d in Dash.DeletedFxaAccount, where: d.fxa_uid == ^fxa_uid)
  end

  def handle_first_sign_in_initialize_subscriptions(%Account{} = account, fxa_subscriptions, dt) do
    # TODO: test this
    # Handle special case where FxA does not send a subscription changed fxa event
    # if a user signs up for an FxA account on the same page of signing up for the subscription
    # we need to create a record of that capability in our database
    cond do
      "managed-hubs" in fxa_subscriptions ->
        with {:error, reason} <- subscribe_to_personal_plan(account, upscale_to_microseconds(dt)) do
          Logger.warning("could not subscribe to personal plan for reason: #{reason}")
        end

      "hubs-professional" in fxa_subscriptions ->
        with {:error, reason} <-
               subscribe_to_professional_plan(account, upscale_to_microseconds(dt)) do
          Logger.warning("could not subscribe to personal plan for reason: #{reason}")
        end

      true ->
        :ok
    end
  end

  @spec upscale_to_microseconds(DateTime.t()) :: DateTime.t()
  defp upscale_to_microseconds(%DateTime{} = datetime),
    do: Map.update!(datetime, :microsecond, fn {value, _precision} -> {value, 6} end)

  def has_account_for_fxa_uid?(fxa_uid) when is_binary(fxa_uid) do
    Repo.exists?(from a in Account, where: a.fxa_uid == ^fxa_uid)
  end

  def subdomain_wait(),
    do: Application.get_env(:dash, __MODULE__)[:subdomain_wait_time]

  defp clean_date_string(date) do
    date
    |> String.trim_leading("~U[")
    |> String.trim_trailing("]")
  end

  def get_hubs_by_date(start_date, end_date) do
    clean_start_date =
      start_date
      |> clean_date_string()

    clean_end_date =
      end_date
      |> clean_date_string()

    query =
      from(hub in Hub,
        join: stat in assoc(hub, :hub_stats),
        where: stat.measured_at >= ^clean_start_date and stat.measured_at <= ^clean_end_date,
        select: hub
      )

    Repo.all(query)
  end
end