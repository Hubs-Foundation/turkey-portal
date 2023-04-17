defmodule Dash.PlanStateMachine do
  @moduledoc """
  This is a finite-state machine representing a Hubs plan.

  Though the ID for this machine is the account, it is plan-centric and not
  account-centric.
  """
  @behaviour Mimzy

  alias Dash.{Account, Capability, Hub, Plan, Repo}
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
      transitioned_at: DateTime.utc_now(),
      plan_id: plan_id
    })

    hub =
      Repo.insert!(%Hub{
        account_id: account.account_id,
        ccu_limit: 10,
        name: "Untitled Hub",
        status: :creating,
        storage_limit_mb: 500,
        subdomain: rand_string(10),
        tier: :free
      })

    {:ok, %{status_code: 200}} = Dash.OrchClient.create_hub(account.email, hub)
    :ok
  end

  def handle_event(
        nil,
        {:subscribe_standard, %DateTime{} = subscribed_at},
        %Account{} = account,
        _data
      ) do
    %{plan_id: plan_id} = Repo.insert!(%Plan{account_id: account.account_id})

    Repo.insert!(%__MODULE__.PlanTransition{
      event: "subscribe_standard",
      new_state: :standard,
      transitioned_at: subscribed_at,
      plan_id: plan_id
    })

    hub =
      Repo.insert!(%Hub{
        account_id: account.account_id,
        ccu_limit: 25,
        name: "Untitled Hub",
        status: :creating,
        storage_limit_mb: 2000,
        subdomain: rand_string(10),
        tier: :early_access
      })

    {:ok, %{status_code: 200}} = Dash.OrchClient.create_hub(account.email, hub)
    :ok
  end

  def handle_event(:starter, :fetch_active_plan, %Account{account_id: account_id}, _data),
    do: {:ok, %{Repo.get_by(Plan, account_id: account_id) | subscription?: false}}

  def handle_event(:starter, :start, %Account{}, _data),
    do: {:error, :already_started}

  # TODO: Implement upgrade
  def handle_event(:starter, {:subscribe_standard, _subscribed_at}, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(:standard, :fetch_active_plan, %Account{account_id: account_id}, _data) do
    active_plan =
      case Repo.get_by(Plan, account_id: account_id) do
        nil ->
          Repo.get_by!(Capability, account_id: account_id)

        plan ->
          %{plan | subscription?: true}
      end

    {:ok, active_plan}
  end

  def handle_event(:standard, :start, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(:standard, {:subscribe_standard, _subscribed_at}, %Account{}, _data),
    do: {:error, :already_started}
end
