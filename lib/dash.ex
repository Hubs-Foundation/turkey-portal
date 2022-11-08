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

  def change_email(%Dash.Account{email: old_email} = account, email) do
    change_email(account, old_email, email)
  end

  defp change_email(%Dash.Account{} = account, nil, email)
       when is_binary(email) do
    Dash.Account.add_email_to_account(account, email)

    case Dash.Hub.hubs_for_account(account) do
      [_ | _] ->
        Logger.error(
          "Can't update hubs admin email for account with fxa_uid #{account.fxa_uid} because old email did not exist."
        )

        :error

      [] ->
        :ok
    end
  end

  defp change_email(%Dash.Account{} = account, old_email, email)
       when is_binary(old_email) and is_binary(email) do
    case Dash.Account.update_email(account, email) do
      :ok ->
        update_hubs_admin_emails(account, old_email, email)
        :ok

      :error ->
        :error
    end
  end

  defp update_hubs_admin_emails(%Dash.Account{} = account, old_email, email) do
    hubs = Dash.Hub.hubs_for_account(account)

    for hub <- hubs do
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
end
