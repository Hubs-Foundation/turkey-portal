defmodule Dash.PlanStateMachine do
  @moduledoc """
  This is a finite-state machine representing a Hubs plan.

  Though the ID for this machine is the account, it is plan-centric and not
  account-centric.
  """
  @behaviour Mimzy

  @starter_ccu_limit 10
  @starter_storage_limit_mb 500
  @standard_ccu_limit 25
  @standard_storage_limit_mb 2_000

  alias Dash.{Account, Capability, Hub, Plan, OrchClient, Repo}
  import Dash.Utils, only: [capability_string: 0, rand_string: 1]
  import Ecto.Query, only: [from: 2]

  @doc """
  Handles a state machine event.

  Returns `{:error, :account_not_found}` if the account cannot be located.
  """
  @spec handle_event(:active?, Account.t()) :: {:ok, boolean} | {:error, :account_not_found}
  @spec handle_event(:start, Account.t()) :: :ok | {:error, :account_not_found | :already_started}
  def handle_event(event, %Account{} = account) do
    {:ok, result} = Repo.transaction(fn -> Mimzy.handle_event(account, event, __MODULE__) end)
    result
  end

  @impl Mimzy
  def init(%Account{account_id: account_id}) when is_integer(account_id) do
    if Repo.exists?(from a in Account, where: a.account_id == ^account_id) do
      :ok = lock_plan_transitions(account_id)
      {:cont, plan_state(account_id), nil}
    else
      {:halt, {:error, :account_not_found}}
    end
  end

  @spec lock_plan_transitions(Account.id()) :: :ok
  defp lock_plan_transitions(account_id) when is_integer(account_id),
    do:
      Repo.one!(
        from l in "plan_transition_locks",
          select: true,
          where: l.account_id == ^account_id,
          lock: "FOR UPDATE"
      ) && :ok

  @spec plan_state(Account.id()) :: String.t() | nil
  defp plan_state(account_id) when is_integer(account_id) do
    with nil <-
           Repo.one(
             from t in __MODULE__.PlanTransition,
               join: p in assoc(t, :plan),
               select: t.new_state,
               where: p.account_id == ^account_id,
               order_by: [desc: t.transitioned_at],
               limit: 1
           ) do
      if Repo.exists?(
           from c in Capability,
             where: c.account_id == ^account_id,
             where: c.capability == ^capability_string(),
             where: c.is_active
         ),
         do: :standard
    end
  end

  @impl Mimzy
  def handle_event(nil, :fetch_active_plan, %Account{}, _data),
    do: {:error, :no_active_plan}

  def handle_event(nil, :start, %Account{} = account, _data) do
    %{plan_id: plan_id} = Repo.insert!(%Plan{account_id: account.account_id})

    Repo.insert!(%__MODULE__.PlanTransition{
      event: "start",
      new_state: :starter,
      plan_id: plan_id,
      transitioned_at: DateTime.utc_now()
    })

    hub =
      Repo.insert!(%Hub{
        account_id: account.account_id,
        ccu_limit: @starter_ccu_limit,
        name: "Untitled Hub",
        status: :creating,
        storage_limit_mb: @starter_storage_limit_mb,
        subdomain: rand_string(10),
        tier: :p0
      })

    {:ok, %{status_code: 200}} =
      OrchClient.create_hub(account.email, hub, disable_branding?: true)

    :ok
  end

  def handle_event(
        nil,
        {:subscribe_standard, %DateTime{} = subscribed_at},
        %Account{} = account,
        _data
      ) do
    %{plan_id: plan_id} = Repo.insert!(%Plan{account_id: account.account_id})
    :ok = subscribe_standard(plan_id, subscribed_at)

    hub =
      Repo.insert!(%Hub{
        account_id: account.account_id,
        ccu_limit: @standard_ccu_limit,
        name: "Untitled Hub",
        status: :creating,
        storage_limit_mb: @standard_storage_limit_mb,
        subdomain: rand_string(10),
        tier: :p1
      })

    {:ok, %{status_code: 200}} = OrchClient.create_hub(account.email, hub)
    :ok
  end

  def handle_event(nil, {:expire_subscription, %DateTime{}}, %Account{}, _data),
    do: {:error, :no_subscription}

  def handle_event(:starter, :fetch_active_plan, %Account{account_id: account_id}, _data),
    do: {:ok, %{get_plan(account_id) | name: "starter", subscription?: false}}

  def handle_event(:starter, :start, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(
        :starter,
        {:subscribe_standard, subscribed_at},
        %Account{account_id: account_id},
        _data
      ) do
    %{plan_id: plan_id} = get_plan(account_id)
    :ok = subscribe_standard(plan_id, subscribed_at)

    {:ok, %{status_code: 200}} =
      Hub
      |> Repo.get_by!(account_id: account_id)
      |> Ecto.Changeset.change(
        ccu_limit: @standard_ccu_limit,
        storage_limit_mb: @standard_storage_limit_mb,
        tier: :p1
      )
      |> Repo.update!()
      |> OrchClient.update_hub()

    :ok
  end

  def handle_event(:starter, {:expire_subscription, %DateTime{}}, %Account{}, _data),
    do: {:error, :no_subscription}

  def handle_event(:standard, :fetch_active_plan, %Account{account_id: account_id}, _data) do
    active_plan =
      case get_plan(account_id) do
        nil ->
          Repo.get_by!(Capability, account_id: account_id)

        plan ->
          %{plan | name: "standard", subscription?: true}
      end

    {:ok, active_plan}
  end

  def handle_event(:standard, :start, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(:standard, {:subscribe_standard, _subscribed_at}, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(
        :standard,
        {:expire_subscription, %DateTime{} = expired_at},
        %Account{account_id: account_id},
        _data
      ) do
    if DateTime.compare(expired_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      %{plan_id: plan_id} =
        with nil <- get_plan(account_id),
             do: Repo.insert!(%Plan{account_id: account_id})

      Repo.insert!(%__MODULE__.PlanTransition{
        event: "expire_subscription",
        new_state: :starter,
        plan_id: plan_id,
        transitioned_at: expired_at
      })

      hub =
        Hub
        |> Repo.get_by!(account_id: account_id)
        |> Ecto.Changeset.change(
          ccu_limit: @starter_ccu_limit,
          storage_limit_mb: @starter_storage_limit_mb,
          subdomain: rand_string(10),
          tier: :p0
        )
        |> Repo.update!()

      {:ok, %{status_code: 200}} =
        OrchClient.update_hub(hub, disable_branding?: true, reset_branding?: true)

      :ok
    end
  end

  @spec get_plan(Account.id()) :: Plan.t() | nil
  defp get_plan(account_id),
    do: Repo.get_by(Plan, account_id: account_id)

  @spec subscribe_standard(Plan.id(), DateTime.t()) :: :ok
  defp subscribe_standard(plan_id, %DateTime{} = subscribed_at) when is_integer(plan_id) do
    Repo.insert!(%__MODULE__.PlanTransition{
      event: "subscribe_standard",
      new_state: :standard,
      plan_id: plan_id,
      transitioned_at: subscribed_at
    })

    :ok
  end

  @spec transitioned_at(Account.id()) :: DateTime.t()
  defp transitioned_at(account_id) when is_integer(account_id) do
    with nil <-
           Repo.one(
             from t in __MODULE__.PlanTransition,
               join: p in assoc(t, :plan),
               select: t.transitioned_at,
               where: p.account_id == ^account_id,
               order_by: [desc: t.transitioned_at],
               limit: 1
           ) do
      Repo.one!(
        from c in Capability,
          select: c.change_time,
          where: c.account_id == ^account_id,
          where: c.capability == ^capability_string(),
          where: c.is_active
      )
    end
  end
end
