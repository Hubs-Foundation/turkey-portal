defmodule Dash do
  @moduledoc """
  Boundary of Dash context
  """
  import Ecto.Query
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

  @spec get_all_active_capabilities_for_account(%Dash.Account{}) :: [String.t()] | []
  def get_all_active_capabilities_for_account(%Account{} = account) do
    from(c in Capability,
      where: c.account_id == ^account.account_id and c.is_active == ^true
    )
    |> Repo.all()
    |> Enum.map(fn capability -> capability.capability end)
  end

  @spec create_capability!(%Account{}, %{
          :capability => String.t(),
          :change_time => %DateTime{},
          :is_active => boolean()
        }) :: %Capability{}
  def create_capability!(
        %Account{} = account,
        %{
          capability: _capability,
          is_active: _is_active,
          change_time: _change_time
        } = params
      ) do
    new_capability = Map.put(params, :account_id, account.account_id)

    %Capability{}
    |> Capability.changeset(new_capability)
    |> Ecto.Changeset.put_assoc(:account, account)
    |> Repo.insert!()
  end

  @spec delete_all_capabilities_for_account(%Dash.Account{}) :: {integer, nil}
  def delete_all_capabilities_for_account(%Account{} = account) do
    Repo.delete_all(
      from(c in Capability,
        where: c.account_id == ^account.account_id
      )
    )
  end

  def delete_all_hubs_for_account(%Dash.Account{} = account) do
    hubs = Dash.Hub.hubs_for_account(account)

    # TODO DELETE
    [%Dash.Hub{}] = hubs

    for hub <- hubs do
      Dash.Hub.delete_hub(hub)
    end
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
end
