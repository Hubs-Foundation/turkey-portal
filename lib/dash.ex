defmodule Dash do
  @moduledoc """
  Boundary of Dash context
  """
  import Ecto.Query
  require Logger
  alias Dash.{Account, Capability, Repo}

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
    Repo.exists?(
      from(c in Capability,
        where: c.account_id == ^account.account_id
      )
    )
  end

  @spec get_one_capability(%Account{}, capability: String.t()) ::
          %Capability{} | nil
  def get_one_capability(%Account{} = account, capability: capability) do
    Repo.get_by(Capability, capability: capability, account_id: account.account_id)
  end

  @spec get_all_capabilities_for_account(%Account{}) ::
          [%Capability{}] | []
  def get_all_capabilities_for_account(%Account{} = account) do
    Repo.all(
      from(c in Capability,
        where: c.account_id == ^account.account_id
      )
    )
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
    Repo.delete_all(
      from(c in Capability,
        where: c.account_id == ^account.account_id
      )
    )
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
    [] = Dash.Hub.hubs_for_account(account)
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

  @spec fxa_uid_to_deleted_list!(String.t()) :: :ok
  def fxa_uid_to_deleted_list!(fxa_uid) when is_binary(fxa_uid) do
    Dash.Repo.insert!(%Dash.DeletedFxaAccount{fxa_uid: fxa_uid})
    :ok
  end

  def was_deleted?(fxa_uid) when is_binary(fxa_uid) do
    Repo.exists?(
      from(d in Dash.DeletedFxaAccount,
        where: d.fxa_uid == ^fxa_uid
      )
    )
  end

  def handle_first_sign_in_initialize_subscriptions(%Account{} = account, fxa_subscriptions, dt) do
    capability_string = DashWeb.Plugs.Auth.capability_string()

    if capability_string in fxa_subscriptions and not Dash.has_capability?(account) do
      # Handle special case where FxA does not send a subscription changed fxa event
      # if a user signs up for an FxA account on the same page of signing up for the subscription
      # we need to create a record of that capability in our database
      Dash.create_capability!(account, %{
        capability: capability_string,
        change_time: dt,
        is_active: true
      })
    end
  end

  def has_account_for_fxa_uid?(fxa_uid) when is_binary(fxa_uid) do
    Repo.exists?(
      from(a in Account,
        where: a.fxa_uid == ^fxa_uid
      )
    )
  end
end
