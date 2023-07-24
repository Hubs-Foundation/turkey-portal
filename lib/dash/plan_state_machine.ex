defmodule Dash.PlanStateMachine do
  @moduledoc """
  This is a finite-state machine representing a Hubs plan.

  Though the ID for this machine is the account, it is plan-centric and not
  account-centric.
  """
  @behaviour Mimzy

  @starter_ccu_limit 10
  @starter_storage_limit_mb 500
  @personal_ccu_limit 20
  @personal_storage_limit_mb 2_000
  @professional_ccu_limit 50
  @professional_storage_limit_mb 25_000

  alias Dash.{Account, Hub, Plan, OrchClient, Repo}
  import Dash.Utils, only: [rand_string: 1]
  import Ecto.Query, only: [from: 2]

  @doc """
  Handles a state machine event.

  Returns `{:error, :account_not_found}` if the account cannot be located.
  """
  @spec handle_event(:active?, Account.t()) :: {:ok, boolean} | {:error, :account_not_found}
  @spec handle_event(:start, Account.t()) :: :ok | {:error, :account_not_found | :already_started}
  def handle_event(event, %Account{} = account) do
    {:ok, result} =
      Repo.transaction(
        fn -> Mimzy.handle_event(account, event, __MODULE__) end,
        timeout: 30_000
      )

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

  @spec plan_state(Account.id()) :: atom | nil
  defp plan_state(account_id) when is_integer(account_id),
    do:
      Repo.one(
        from t in __MODULE__.PlanTransition,
          join: p in assoc(t, :plan),
          select: t.new_state,
          where: p.account_id == ^account_id,
          order_by: [desc: t.transitioned_at],
          limit: 1
      )

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
        status: :creating,
        storage_limit_mb: @starter_storage_limit_mb,
        subdomain: rand_string(10),
        tier: :p0
      })

    {:ok, %{body: json, status_code: 200}} =
      OrchClient.create_hub(account.email, hub, disable_branding?: true)

    :ok = put_domain(hub.hub_id, json)
  end

  def handle_event(
        nil,
        {:subscribe_personal, %DateTime{} = subscribed_at},
        %Account{} = account,
        _data
      ) do
    %{plan_id: plan_id} = Repo.insert!(%Plan{account_id: account.account_id})
    :ok = subscribe_personal(plan_id, subscribed_at)

    hub =
      Repo.insert!(%Hub{
        account_id: account.account_id,
        ccu_limit: @personal_ccu_limit,
        status: :creating,
        storage_limit_mb: @personal_storage_limit_mb,
        subdomain: rand_string(10),
        tier: :p1
      })

    {:ok, %{body: json, status_code: 200}} = OrchClient.create_hub(account.email, hub)
    :ok = put_domain(hub.hub_id, json)
  end

  def handle_event(
        nil,
        {:subscribe_professional, %DateTime{} = subscribed_at},
        %Account{} = account,
        _data
      ) do
    %{plan_id: plan_id} = Repo.insert!(%Plan{account_id: account.account_id})
    :ok = subscribe_professional(plan_id, subscribed_at)

    hub =
      Repo.insert!(%Hub{
        account_id: account.account_id,
        ccu_limit: @professional_ccu_limit,
        status: :creating,
        storage_limit_mb: @professional_storage_limit_mb,
        subdomain: rand_string(10),
        tier: :b0
      })

    {:ok, %{body: json, status_code: 200}} = OrchClient.create_hub(account.email, hub)
    :ok = put_domain(hub.hub_id, json)
  end

  def handle_event(nil, {:expire_subscription, %DateTime{}}, %Account{}, _data),
    do: {:error, :no_subscription}

  def handle_event(:starter, :fetch_active_plan, %Account{account_id: account_id}, _data),
    do: {:ok, %{fetch_plan!(account_id) | name: "starter", subscription?: false}}

  def handle_event(:starter, :start, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(
        :starter,
        {:subscribe_personal, subscribed_at},
        %Account{account_id: account_id, email: email},
        _data
      ) do
    if DateTime.compare(subscribed_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      %{plan_id: plan_id} = fetch_plan!(account_id)
      :ok = subscribe_personal(plan_id, subscribed_at)

      hub =
        Hub
        |> Repo.get_by!(account_id: account_id)
        |> Repo.preload(:deployment)
        |> Ecto.Changeset.change(
          ccu_limit: @personal_ccu_limit,
          storage_limit_mb: @personal_storage_limit_mb,
          status: :updating,
          tier: :p1
        )
        |> Repo.update!()

      {:ok, %{status_code: 200}} = OrchClient.update_hub(email, hub)
      :ok
    end
  end

  def handle_event(
        :starter,
        {:subscribe_professional, subscribed_at},
        %Account{account_id: account_id, email: email},
        _data
      ) do
    if DateTime.compare(subscribed_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      %{plan_id: plan_id} = fetch_plan!(account_id)
      :ok = subscribe_professional(plan_id, subscribed_at)

      hub =
        Hub
        |> Repo.get_by!(account_id: account_id)
        |> Repo.preload(:deployment)
        |> Ecto.Changeset.change(
          ccu_limit: @professional_ccu_limit,
          storage_limit_mb: @professional_storage_limit_mb,
          status: :updating,
          tier: :b0
        )
        |> Repo.update!()

      {:ok, %{status_code: 200}} = OrchClient.update_hub(email, hub)
      :ok
    end
  end

  def handle_event(
        :starter,
        {:expire_subscription, expired_at = %DateTime{}},
        %Account{account_id: account_id},
        _data
      ) do
    if DateTime.compare(expired_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      {:error, :no_subscription}
    end
  end

  def handle_event(:personal, :fetch_active_plan, %Account{account_id: account_id}, _data),
    do: {:ok, %{fetch_plan!(account_id) | name: "personal", subscription?: true}}

  def handle_event(:personal, :start, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(
        :personal,
        {:subscribe_personal, %DateTime{} = subscribed_at},
        %Account{account_id: account_id},
        _data
      ) do
    if DateTime.compare(subscribed_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      {:error, :already_started}
    end
  end

  def handle_event(
        :personal,
        {:subscribe_professional, subscribed_at},
        %Account{account_id: account_id, email: email},
        _data
      ) do
    if DateTime.compare(subscribed_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      %{plan_id: plan_id} = fetch_plan!(account_id)
      :ok = subscribe_professional(plan_id, subscribed_at)

      hub =
        Hub
        |> Repo.get_by!(account_id: account_id)
        |> Repo.preload(:deployment)
        |> Ecto.Changeset.change(
          ccu_limit: @professional_ccu_limit,
          storage_limit_mb: @professional_storage_limit_mb,
          status: :updating,
          tier: :b0
        )
        |> Repo.update!()

      {:ok, %{status_code: 200}} = OrchClient.update_hub(email, hub)
      :ok
    end
  end

  def handle_event(
        :personal,
        {:expire_subscription, %DateTime{} = expired_at},
        %Account{account_id: account_id, email: email},
        _data
      ) do
    if DateTime.compare(expired_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      %{plan_id: plan_id} = fetch_plan!(account_id)

      Repo.insert!(%__MODULE__.PlanTransition{
        event: "expire_subscription",
        new_state: :starter,
        plan_id: plan_id,
        transitioned_at: expired_at
      })

      hub =
        Hub
        |> Repo.get_by!(account_id: account_id)
        |> Repo.preload(:deployment)
        |> Ecto.Changeset.change(
          ccu_limit: @starter_ccu_limit,
          status: :updating,
          storage_limit_mb: @starter_storage_limit_mb,
          subdomain: rand_string(10),
          tier: :p0
        )
        |> Repo.update!()

      {:ok, %{status_code: 200}} =
        OrchClient.update_hub(email, hub, disable_branding?: true, reset_branding?: true)

      :ok
    end
  end

  def handle_event(:professional, :fetch_active_plan, %Account{account_id: account_id}, _data),
    do: {:ok, %{fetch_plan!(account_id) | name: "professional", subscription?: true}}

  def handle_event(:professional, :start, %Account{}, _data),
    do: {:error, :already_started}

  def handle_event(
        :professional,
        {:subscribe_personal, subscribed_at},
        %Account{account_id: account_id, email: email},
        _data
      ) do
    if DateTime.compare(subscribed_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      %{plan_id: plan_id} = fetch_plan!(account_id)
      :ok = subscribe_personal(plan_id, subscribed_at)

      hub =
        Hub
        |> Repo.get_by!(account_id: account_id)
        |> Repo.preload(:deployment)
        |> Ecto.Changeset.change(
          ccu_limit: @personal_ccu_limit,
          storage_limit_mb: @personal_storage_limit_mb,
          status: :updating,
          tier: :p1
        )
        |> Repo.update!()

      {:ok, %{status_code: 200}} =
        OrchClient.update_hub(email, hub, reset_client?: true, reset_domain?: true)

      :ok
    end
  end

  def handle_event(
        :professional,
        {:subscribe_professional, %DateTime{} = subscribed_at},
        %Account{account_id: account_id},
        _data
      ) do
    if DateTime.compare(subscribed_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      {:error, :already_started}
    end
  end

  def handle_event(
        :professional,
        {:expire_subscription, %DateTime{} = expired_at},
        %Account{account_id: account_id, email: email},
        _data
      ) do
    if DateTime.compare(expired_at, transitioned_at(account_id)) !== :gt do
      {:error, :superseded}
    else
      %{plan_id: plan_id} = fetch_plan!(account_id)

      Repo.insert!(%__MODULE__.PlanTransition{
        event: "expire_subscription",
        new_state: :starter,
        plan_id: plan_id,
        transitioned_at: expired_at
      })

      hub =
        Hub
        |> Repo.get_by!(account_id: account_id)
        |> Repo.preload(:deployment)
        |> Ecto.Changeset.change(
          ccu_limit: @starter_ccu_limit,
          status: :updating,
          storage_limit_mb: @starter_storage_limit_mb,
          subdomain: rand_string(10),
          tier: :p0
        )
        |> Repo.update!()

      {:ok, %{status_code: 200}} =
        OrchClient.update_hub(email, hub,
          disable_branding?: true,
          reset_branding?: true,
          reset_client?: true,
          reset_domain?: true
        )

      :ok
    end
  end

  @spec fetch_plan!(Account.id()) :: Plan.t()
  defp fetch_plan!(account_id),
    do: Repo.get_by!(Plan, account_id: account_id)

  @spec put_domain(Hub.id(), String.t()) :: :ok
  defp put_domain(hub_id, json) do
    domain =
      json
      |> Jason.decode!()
      |> Map.fetch!("domain")

    Dash.Repo.insert!(%Dash.HubDeployment{
      domain: domain,
      hub_id: hub_id
    })

    :ok
  end

  @spec subscribe_personal(Plan.id(), DateTime.t()) :: :ok
  defp subscribe_personal(plan_id, %DateTime{} = subscribed_at) when is_integer(plan_id) do
    Repo.insert!(%__MODULE__.PlanTransition{
      event: "subscribe_personal",
      new_state: :personal,
      plan_id: plan_id,
      transitioned_at: subscribed_at
    })

    :ok
  end

  @spec subscribe_professional(Plan.id(), DateTime.t()) :: :ok
  defp subscribe_professional(plan_id, %DateTime{} = subscribed_at) when is_integer(plan_id) do
    Repo.insert!(%__MODULE__.PlanTransition{
      event: "subscribe_professional",
      new_state: :professional,
      plan_id: plan_id,
      transitioned_at: subscribed_at
    })

    :ok
  end

  @spec transitioned_at(Account.id()) :: DateTime.t()
  defp transitioned_at(account_id) when is_integer(account_id),
    do:
      Repo.one!(
        from t in __MODULE__.PlanTransition,
          join: p in assoc(t, :plan),
          select: t.transitioned_at,
          where: p.account_id == ^account_id,
          order_by: [desc: t.transitioned_at],
          limit: 1
      )
end
