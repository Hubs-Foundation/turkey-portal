defmodule Dash.PlanStateMachineTest do
  use Dash.DataCase, async: true

  alias Dash.{Account, Capability, HttpMock, Hub, Plan, PlanStateMachine}
  import Dash.Utils, only: [capability_string: 0]

  setup do
    %{account: Repo.insert!(%Account{})}
  end

  describe "handle_event/2" do
    test "with an unknown account" do
      assert {:error, :account_not_found} ===
               PlanStateMachine.handle_event(:start, %Account{account_id: 1})
    end

    test "with an unhandled event", %{account: account} do
      assert_raise FunctionClauseError, fn ->
        PlanStateMachine.handle_event(:the_unexpected, account)
      end
    end

    test "commits on success", %{account: account} do
      Mox.expect(HttpMock, :post, fn _url, _json, _headers, _opts ->
        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok === PlanStateMachine.handle_event(:start, account)
      assert {:cont, :starter, _} = PlanStateMachine.init(account)
      assert Repo.get_by(Hub, account_id: account.account_id)
    end

    test "rolls back on failure", %{account: account} do
      Mox.expect(HttpMock, :post, fn _url, _json, _headers, _opts -> :error end)
      assert_raise MatchError, fn -> PlanStateMachine.handle_event(:start, account) end
      assert {:cont, nil, _} = PlanStateMachine.init(account)
      refute Repo.get_by(Hub, account_id: account.account_id)
    end
  end

  describe "init/1" do
    test "with an unknown account" do
      assert {:halt, {:error, :account_not_found}} ===
               PlanStateMachine.init(%Account{account_id: 1})
    end

    test "when there is no plan", %{account: account} do
      assert {:cont, nil, nil} === PlanStateMachine.init(account)
    end

    test "when there is a plan transition", %{account: account} do
      state = :stopped
      put_in_state(account, state)

      assert {:cont, state, nil} === PlanStateMachine.init(account)
    end

    test "when there is an active capability (DEPRECATED)", %{account: account} do
      Repo.insert!(%Capability{
        account_id: account.account_id,
        capability: capability_string(),
        change_time: DateTime.truncate(DateTime.utc_now(), :second),
        is_active: true
      })

      assert {:cont, :standard, nil} === PlanStateMachine.init(account)
    end

    test "when there is an inactive capability (DEPRECATED)", %{account: account} do
      Repo.insert!(%Capability{
        account_id: account.account_id,
        capability: capability_string(),
        change_time: DateTime.truncate(DateTime.utc_now(), :second),
        is_active: false
      })

      assert {:cont, nil, nil} === PlanStateMachine.init(account)
    end
  end

  describe "handle_event/4" do
    test "nil -- fetch_active_plan ->", %{account: account} do
      assert {:error, :no_active_plan} ===
               PlanStateMachine.handle_event(nil, :fetch_active_plan, account, nil)

      assert [] === Hub.hubs_for_account(account)
      assert [] === Repo.all(Plan)
      assert [] === ordered_transitions()
    end

    test "nil -- start ->", %{account: account} do
      Mox.expect(HttpMock, :post, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure]] === opts
        assert "10" === payload["ccu_limit"]
        assert Integer.to_string(hub.hub_id) === payload["hub_id"]
        assert "0.48828125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "free" === payload["tier"]
        assert account.email === payload["useremail"]

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok === PlanStateMachine.handle_event(nil, :start, account, nil)

      assert [hub] = Hub.hubs_for_account(account)
      assert 10 === hub.ccu_limit
      assert 500 === hub.storage_limit_mb
      assert :free === hub.tier

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition] = ordered_transitions()
      assert "start" === transition.event
      assert :starter === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 50 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
    end

    test "nil -- subscribe_standard ->", %{account: account} do
      Mox.expect(HttpMock, :post, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure]] === opts
        assert "25" === payload["ccu_limit"]
        assert Integer.to_string(hub.hub_id) === payload["hub_id"]
        assert "1.953125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "early_access" === payload["tier"]
        assert account.email === payload["useremail"]

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok ===
               PlanStateMachine.handle_event(
                 nil,
                 {:subscribe_standard, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [hub] = Hub.hubs_for_account(account)
      assert 25 === hub.ccu_limit
      assert 2_000 === hub.storage_limit_mb
      assert :early_access === hub.tier

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition] = ordered_transitions()
      assert "subscribe_standard" === transition.event
      assert :standard === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 50 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
    end

    test "nil -- expire_subscription ->", %{account: account} do
      assert {:error, :no_subscription} ===
               PlanStateMachine.handle_event(
                 nil,
                 {:expire_subscription, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [] === Hub.hubs_for_account(account)
      assert [] === Repo.all(Plan)
      assert [] === ordered_transitions()
    end

    test "starter -- fetch_active_plan ->", %{account: account} do
      :ok = put_in_state(account, :starter)

      assert {:ok, plan} =
               PlanStateMachine.handle_event(:starter, :fetch_active_plan, account, nil)

      assert %Plan{} = plan
      assert account.account_id === plan.account_id
      assert false === plan.subscription?

      assert [_] = ordered_transitions()
    end

    test "starter -- start ->", %{account: account} do
      :ok = put_in_state(account, :starter)

      assert {:error, :already_started} =
               PlanStateMachine.handle_event(:starter, :start, account, nil)

      assert [_] = ordered_transitions()
    end

    test "starter -- subscribe_standard ->", %{account: account} do
      :ok = put_in_state(account, :starter)
      %{hub_id: hub_id} = Repo.insert!(%Hub{account_id: account.account_id})

      Mox.expect(HttpMock, :patch, 1, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure]] === opts
        assert "25" === payload["ccu_limit"]
        assert Integer.to_string(hub.hub_id) === payload["hub_id"]
        assert "1.953125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "early_access" === payload["tier"]

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok ===
               PlanStateMachine.handle_event(
                 :starter,
                 {:subscribe_standard, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [hub] = Hub.hubs_for_account(account)
      assert 25 === hub.ccu_limit
      assert hub_id === hub.hub_id
      assert 2_000 === hub.storage_limit_mb
      assert :early_access === hub.tier

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition, _] = ordered_transitions()
      assert "subscribe_standard" === transition.event
      assert :standard === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 50 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
    end

    test "starter -- expire_subscription ->", %{account: account} do
      :ok = put_in_state(account, :starter)

      assert {:error, :no_subscription} ===
               PlanStateMachine.handle_event(
                 :starter,
                 {:expire_subscription, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [_] = ordered_transitions()
    end

    test "standard -- fetch_active_plan ->", %{account: account} do
      :ok = put_in_state(account, :standard)

      assert {:ok, plan} =
               PlanStateMachine.handle_event(:standard, :fetch_active_plan, account, nil)

      assert %Plan{} = plan
      assert account.account_id === plan.account_id
      assert true === plan.subscription?

      assert [_] = ordered_transitions()
    end

    test "standard -- start ->", %{account: account} do
      :ok = put_in_state(account, :standard)

      assert {:error, :already_started} =
               PlanStateMachine.handle_event(:standard, :start, account, nil)

      assert [_] = ordered_transitions()
    end

    test "standard -- subscribe_standard ->", %{account: account} do
      :ok = put_in_state(account, :standard)

      assert {:error, :already_started} =
               PlanStateMachine.handle_event(
                 :standard,
                 {:subscribe_standard, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [_] = ordered_transitions()
    end

    test "standard -- expire_subscription ->", %{account: account} do
      :ok = put_in_state(account, :standard)
      custom_subdomain = "dummy-subdomain"

      %{hub_id: hub_id} =
        Repo.insert!(%Hub{account_id: account.account_id, subdomain: custom_subdomain})

      Mox.expect(HttpMock, :patch, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure]] === opts
        assert "10" === payload["ccu_limit"]
        assert Integer.to_string(hub_id) === payload["hub_id"]
        assert "0.48828125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "free" === payload["tier"]

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok ===
               PlanStateMachine.handle_event(
                 :standard,
                 {:expire_subscription, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [hub] = Hub.hubs_for_account(account)
      assert 10 === hub.ccu_limit
      assert hub_id === hub.hub_id
      assert 500 === hub.storage_limit_mb
      assert custom_subdomain !== hub.subdomain
      assert :free === hub.tier

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition, _] = ordered_transitions()
      assert "expire_subscription" === transition.event
      assert :starter === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 50 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
    end
  end

  @spec ordered_transitions :: [%PlanStateMachine.PlanTransition{}]
  defp ordered_transitions,
    do: Repo.all(from t in PlanStateMachine.PlanTransition, order_by: [desc: t.transitioned_at])

  @spec put_in_state(Account.t(), :starter | :standard | :stopped) :: :ok
  defp put_in_state(%Account{} = account, state)
       when state in [:starter, :standard, :stopped] do
    %{plan_id: plan_id} = Repo.insert!(%Plan{account_id: account.account_id})

    Repo.insert!(%PlanStateMachine.PlanTransition{
      event: "test event",
      new_state: state,
      plan_id: plan_id,
      transitioned_at: DateTime.utc_now()
    })

    :ok
  end
end