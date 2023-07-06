defmodule Dash.PlanStateMachineTest do
  use Dash.DataCase, async: true

  alias Dash.{Account, HttpMock, Hub, HubDeployment, Plan, PlanStateMachine}
  import Dash.TestHelpers, only: [expect_orch_post: 0]

  setup do
    Mox.verify_on_exit!()
    %{account: Repo.insert!(%Account{email: "dummy@test.com"})}
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
      expect_orch_post()

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
      domain = "dummy.test"

      Mox.expect(HttpMock, :post, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure], recv_timeout: 15_000] === opts
        assert "10" === payload["ccu_limit"]
        assert true === payload["disable_branding"]
        assert Integer.to_string(hub.hub_id) === payload["hub_id"]
        assert "us" === payload["region"]
        assert "0.48828125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "p0" === payload["tier"]
        assert account.email === payload["useremail"]

        {:ok, %HTTPoison.Response{body: Jason.encode!(%{domain: domain}), status_code: 200}}
      end)

      assert :ok === PlanStateMachine.handle_event(nil, :start, account, nil)

      assert [hub] = Hub.hubs_for_account(account)
      assert 10 === hub.ccu_limit
      assert :creating === hub.status
      assert 500 === hub.storage_limit_mb
      assert :p0 === hub.tier
      assert domain === hub.deployment.domain

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition] = ordered_transitions()
      assert "start" === transition.event
      assert :starter === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 100 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
    end

    test "nil -- subscribe_personal ->", %{account: account} do
      domain = "region.root.test"

      Mox.expect(HttpMock, :post, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure], recv_timeout: 15_000] === opts
        assert "20" === payload["ccu_limit"]
        assert false === payload["disable_branding"]
        assert Integer.to_string(hub.hub_id) === payload["hub_id"]
        assert "us" === payload["region"]
        assert "1.953125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "p1" === payload["tier"]
        assert account.email === payload["useremail"]

        {:ok, %HTTPoison.Response{body: Jason.encode!(%{domain: domain}), status_code: 200}}
      end)

      assert :ok ===
               PlanStateMachine.handle_event(
                 nil,
                 {:subscribe_personal, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [hub] = Hub.hubs_for_account(account)
      assert 20 === hub.ccu_limit
      assert :creating === hub.status
      assert 2_000 === hub.storage_limit_mb
      assert :p1 === hub.tier
      assert domain === hub.deployment.domain

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition] = ordered_transitions()
      assert "subscribe_personal" === transition.event
      assert :personal === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 100 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
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

    test "starter -- subscribe_personal ->", %{account: account} do
      :ok = put_in_state(account, :starter)
      %{hub_id: hub_id} = Repo.insert!(%Hub{account_id: account.account_id})
      Repo.insert!(%HubDeployment{domain: "fake.domain", hub_id: hub_id})

      Mox.expect(HttpMock, :patch, 1, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure], recv_timeout: 15_000] === opts
        assert "20" === payload["ccu_limit"]
        assert false === payload["disable_branding"]
        assert hub.deployment.domain === payload["domain"]
        assert Integer.to_string(hub.hub_id) === payload["hub_id"]
        assert false === payload["reset_branding"]
        assert "1.953125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "p1" === payload["tier"]
        assert account.email === payload["useremail"]

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok ===
               PlanStateMachine.handle_event(
                 :starter,
                 {:subscribe_personal, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [hub] = Hub.hubs_for_account(account)
      assert 20 === hub.ccu_limit
      assert hub_id === hub.hub_id
      assert :updating === hub.status
      assert 2_000 === hub.storage_limit_mb
      assert :p1 === hub.tier

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition, _] = ordered_transitions()
      assert "subscribe_personal" === transition.event
      assert :personal === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 100 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
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

    test "personal -- fetch_active_plan ->", %{account: account} do
      :ok = put_in_state(account, :personal)

      assert {:ok, plan} =
               PlanStateMachine.handle_event(:personal, :fetch_active_plan, account, nil)

      assert %Plan{} = plan
      assert account.account_id === plan.account_id
      assert true === plan.subscription?

      assert [_] = ordered_transitions()
    end

    test "personal -- start ->", %{account: account} do
      :ok = put_in_state(account, :personal)

      assert {:error, :already_started} =
               PlanStateMachine.handle_event(:personal, :start, account, nil)

      assert [_] = ordered_transitions()
    end

    test "personal -- subscribe_personal ->", %{account: account} do
      :ok = put_in_state(account, :personal)

      assert {:error, :already_started} =
               PlanStateMachine.handle_event(
                 :personal,
                 {:subscribe_personal, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [_] = ordered_transitions()
    end

    test "personal -- expire_subscription ->", %{account: account} do
      :ok = put_in_state(account, :personal)
      custom_subdomain = "dummy-subdomain"

      %{hub_id: hub_id} =
        Repo.insert!(%Hub{account_id: account.account_id, subdomain: custom_subdomain})

      Repo.insert!(%HubDeployment{domain: "dummy.domain", hub_id: hub_id})

      Mox.expect(HttpMock, :patch, fn url, json, _headers, opts ->
        payload = Jason.decode!(json)
        [hub] = Hub.hubs_for_account(account)
        assert String.ends_with?(url, "hc_instance")
        assert [hackney: [:insecure], recv_timeout: 15_000] === opts
        assert "10" === payload["ccu_limit"]
        assert true === payload["disable_branding"]
        assert hub.deployment.domain === payload["domain"]
        assert Integer.to_string(hub_id) === payload["hub_id"]
        assert true === payload["reset_branding"]
        assert "0.48828125" === payload["storage_limit"]
        assert hub.subdomain === payload["subdomain"]
        assert "p0" === payload["tier"]
        assert account.email === payload["useremail"]

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok ===
               PlanStateMachine.handle_event(
                 :personal,
                 {:expire_subscription, DateTime.utc_now()},
                 account,
                 nil
               )

      assert [hub] = Hub.hubs_for_account(account)
      assert 10 === hub.ccu_limit
      assert hub_id === hub.hub_id
      assert :updating === hub.status
      assert 500 === hub.storage_limit_mb
      assert custom_subdomain !== hub.subdomain
      assert :p0 === hub.tier

      assert [plan] = Repo.all(Plan)
      assert account.account_id === plan.account_id

      assert [transition, _] = ordered_transitions()
      assert "expire_subscription" === transition.event
      assert :starter === transition.new_state
      assert plan.plan_id === transition.plan_id
      assert 100 > DateTime.diff(DateTime.utc_now(), transition.transitioned_at, :millisecond)
    end
  end

  @spec ordered_transitions :: [%PlanStateMachine.PlanTransition{}]
  defp ordered_transitions,
    do: Repo.all(from t in PlanStateMachine.PlanTransition, order_by: [desc: t.transitioned_at])

  @spec put_in_state(Account.t(), :starter | :personal | :stopped) :: :ok
  defp put_in_state(%Account{} = account, state)
       when state in [:starter, :personal, :stopped] do
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
