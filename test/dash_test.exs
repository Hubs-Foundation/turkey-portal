defmodule DashTest do
  use Dash.DataCase

  alias Dash.{Account, HttpMock, Hub, Plan}

  import Dash.TestHelpers
  require Logger

  setup do
    Mox.verify_on_exit!()
  end

  describe "change_email/2" do
    @old_email "old@old.old"
    @new_email "new@new.new"

    test "should return :ok, account is null" do
      assert :ok === Dash.change_email(nil, @new_email)
    end

    test "should return :ok, account has no previously set email, no hub" do
      fxa_uid = "no_email"
      account_without_email = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)

      result = Dash.change_email(account_without_email, @new_email)

      updated_account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      assert @new_email = updated_account.email
      assert :ok === result
    end

    test "should raise, account has no previously set email, has hubs" do
      expect_orch_post()

      fxa_uid = "no_email"
      account_without_email = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      Dash.Hub.create_default_hub(account_without_email, @old_email)

      assert_raise MatchError, fn -> Dash.change_email(account_without_email, @new_email) end
    end

    test "should return :ok, account has previously set email and has no hubs" do
      fxa_uid = "with_email"
      account_with_email = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid, @old_email)

      result = Dash.change_email(account_with_email, @new_email)

      updated_account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      assert @new_email = updated_account.email
      assert :ok === result
    end

    test "should return :ok, account has previously set email and has hubs, admin emails changed correctly" do
      Mox.expect(Dash.HttpMock, :patch, fn url, json, headers, opts ->
        assert String.ends_with?(url, "/api-internal/v1/change_email_for_login")
        assert {:ok, payload} = Jason.decode(json)
        assert @old_email === payload["old_email"]
        assert @new_email === payload["new_email"]
        assert "application/json" === :proplists.get_value("content-type", headers)
        assert :proplists.is_defined("x-ret-dashboard-access-key", headers)
        assert [hackney: [:insecure]] === opts

        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      expect_orch_post()

      fxa_uid = "with_email"
      account_with_email = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid, @old_email)
      Dash.Hub.create_default_hub(account_with_email, @old_email)

      result = Dash.change_email(account_with_email, @new_email)

      updated_account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      assert @new_email = updated_account.email
      assert :ok === result
    end

    test "should return :ok, despite not updating email correctly, account has previously set email and has hubs, admin emails changed incorrectly" do
      stub_failed_ret_patch_update_email()
      expect_orch_post()

      fxa_uid = "with_email"
      account_with_email = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid, @old_email)
      Dash.Hub.create_default_hub(account_with_email, @old_email)

      result = Dash.change_email(account_with_email, @new_email)

      updated_account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      assert @new_email = updated_account.email
      assert :ok === result
    end
  end

  describe "was_deleted?/1" do
    test "if on deleted list, should return true" do
      fxa_uid = "fxa_uid_test"
      Dash.fxa_uid_to_deleted_list!(fxa_uid)

      assert true === Dash.was_deleted?(fxa_uid)
    end

    test "if NOT on deleted list, should return false" do
      fxa_uid = "fxa_uid_test"

      assert false === Dash.was_deleted?(fxa_uid)
    end
  end

  describe "fxa_uid_to_deleted_list!/1" do
    test "adds fxa_uid to the deleted list" do
      fxa_uid = "fxa_uid_test"
      false = Dash.was_deleted?(fxa_uid)

      Dash.fxa_uid_to_deleted_list!(fxa_uid)
      assert Dash.was_deleted?(fxa_uid)
    end
  end

  describe "has_account_for_fxa_uid?/1" do
    test "true if has account" do
      fxa_uid = "fxa_uid_test"
      Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      assert Dash.has_account_for_fxa_uid?(fxa_uid)
    end

    test "false if no account" do
      refute Dash.has_account_for_fxa_uid?("fxa-uid")
    end
  end

  describe "has_capability?/1" do
    test "true if account has any capabilities" do
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      create_capabilities(account, 1)
      assert Dash.has_capability?(account)
    end

    test "false if account has no capabilities" do
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      refute Dash.has_capability?(account)
    end
  end

  describe "handle_first_sign_in_initialize_subscriptions/3" do
    test "no fxa subscriptions in cookie" do
      %{now: now} = now_earlier_later_dt_s()
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)

      false = Dash.has_capability?(account)

      Dash.handle_first_sign_in_initialize_subscriptions(account, [], now)

      refute Dash.has_capability?(account)
      assert [] = Dash.get_all_active_capabilities_for_account(account)
    end

    test "if has fxa_subscriptions in cookie, account is subscribed to personal plan" do
      expect_orch_post()
      %{now: now} = now_earlier_later_dt_s()
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)

      Dash.handle_first_sign_in_initialize_subscriptions(
        account,
        ["managed-hubs"],
        now
      )

      assert {:ok, plan} = Dash.fetch_active_plan(account)
      assert plan.subscription?
      assert "personal" === plan.name
    end
  end

  describe "expire_plan_subscription/2" do
    setup do
      %{account: create_account(), expired_at: DateTime.utc_now()}
    end

    test "when the account cannot be found", %{expired_at: expired_at} do
      assert {:error, :account_not_found} ===
               Dash.expire_plan_subscription(%Account{account_id: 1}, expired_at)
    end

    test "when the account has no plan", %{account: account, expired_at: expired_at} do
      assert {:error, :no_subscription} === Dash.expire_plan_subscription(account, expired_at)
    end

    @tag :skip
    test "when the account has a stopped plan"

    test "when the account has an active starter plan", %{
      account: account,
      expired_at: expired_at
    } do
      expect_orch_post()
      :ok = Dash.start_plan(account)

      assert {:error, :no_subscription} === Dash.expire_plan_subscription(account, expired_at)
    end

    test "when the account has an active subscription plan", %{
      account: account,
      expired_at: expired_at
    } do
      expect_orch_post()
      :ok = Dash.subscribe_to_personal_plan(account, DateTime.add(expired_at, -1, :second))
      custom_subdomain = "dummy-subdomain"

      %{hub_id: hub_id} =
        Hub.hubs_for_account(account)
        |> hd()
        |> Ecto.Changeset.change(subdomain: custom_subdomain)
        |> Repo.update!()

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

      assert :ok === Dash.expire_plan_subscription(account, expired_at)
      assert {:ok, %{subscription?: false}} = Dash.fetch_active_plan(account)
      assert [hub] = Hub.hubs_for_account(account)
      assert 10 === hub.ccu_limit
      assert hub_id === hub.hub_id
      assert :updating === hub.status
      assert 500 === hub.storage_limit_mb
      assert custom_subdomain !== hub.subdomain
      assert :p0 === hub.tier
    end

    test "with expired_at earlier than the last state transition, when the account has an active subscription plan",
         %{account: account, expired_at: expired_at} do
      expect_orch_post()
      :ok = Dash.subscribe_to_personal_plan(account, DateTime.add(expired_at, 1, :second))
      custom_subdomain = "dummy-subdomain"

      Hub.hubs_for_account(account)
      |> hd()
      |> Ecto.Changeset.change(subdomain: custom_subdomain)
      |> Repo.update!()

      Mox.expect(HttpMock, :patch, 0, fn _url, _json, _headers, _opts -> nil end)
      assert {:error, :superseded} === Dash.expire_plan_subscription(account, expired_at)
      assert {:ok, %{subscription?: true}} = Dash.fetch_active_plan(account)
      assert [hub] = Hub.hubs_for_account(account)
      assert 10 !== hub.ccu_limit
      assert :updating !== hub.status
      assert 500 !== hub.storage_limit_mb
      assert custom_subdomain === hub.subdomain
      assert :p0 !== hub.tier
    end
  end

  describe "fetch_active_plan/1" do
    setup do
      %{account: create_account()}
    end

    test "when the account cannot be found" do
      assert {:error, :account_not_found} === Dash.fetch_active_plan(%Account{account_id: 1})
    end

    test "when the account has no plan", %{account: account} do
      assert {:error, :no_active_plan} === Dash.fetch_active_plan(account)
    end

    test "when the account has an active starter plan", %{account: account} do
      expect_orch_post()
      :ok = Dash.start_plan(account)

      assert {:ok, %Plan{name: "starter", subscription?: false}} = Dash.fetch_active_plan(account)
    end

    test "when the account has an active personal plan", %{account: account} do
      expect_orch_post()
      :ok = Dash.subscribe_to_personal_plan(account, DateTime.utc_now())

      assert {:ok, %Plan{name: "personal", subscription?: true}} = Dash.fetch_active_plan(account)
    end

    @tag :skip
    test "when the account has a stopped plan"
  end

  describe "get_hub/2" do
    setup do
      account = Dash.Account.find_or_create_account_for_fxa_uid("fake-uid")

      hub =
        Dash.Repo.insert!(%Dash.Hub{
          account_id: account.account_id,
          ccu_limit: 10,
          storage_limit_mb: 9,
          subdomain: "fake-subdomain",
          status: :ready,
          tier: :p1
        })

      Dash.Repo.insert!(%Dash.HubDeployment{
        domain: "fake-domain",
        hub_id: hub.hub_id
      })

      %{account: account, hub: Repo.preload(hub, :deployment)}
    end

    test "returns the hub", %{account: account, hub: hub} do
      assert result = Dash.get_hub(hub.hub_id, account)
      assert %Hub{} = result
      assert hub.ccu_limit === result.ccu_limit
      assert hub.deployment.domain === result.deployment.domain
      assert hub.hub_id === result.hub_id
      assert hub.status === result.status
      assert hub.storage_limit_mb === result.storage_limit_mb
      assert hub.subdomain === result.subdomain
      assert hub.tier === result.tier
    end

    test "with an unknown hub id", %{account: account} do
      assert nil === Dash.get_hub(1, account)
    end

    test "with an unknown account", %{hub: hub} do
      assert nil === Dash.get_hub(hub.hub_id, %Account{account_id: 1})
    end

    test "with a hub id not belonging to the account", %{hub: hub} do
      account = Dash.Account.find_or_create_account_for_fxa_uid("another-uid")

      assert nil === Dash.get_hub(hub.hub_id, account)
    end
  end

  describe "start_plan/1" do
    setup do
      %{account: create_account()}
    end

    test "when the account cannot be found" do
      assert {:error, :account_not_found} === Dash.start_plan(%Account{account_id: 1})
    end

    test "when the account has an active starter plan", %{account: account} do
      expect_orch_post()
      :ok = Dash.start_plan(account)

      assert {:error, :already_started} === Dash.start_plan(account)
    end

    test "when the account has an active subscription plan", %{account: account} do
      expect_orch_post()
      :ok = Dash.subscribe_to_personal_plan(account, DateTime.utc_now())

      assert {:error, :already_started} === Dash.start_plan(account)
    end

    test "when the account has no plan", %{account: account} do
      domain = "this.here.domain"

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

      assert :ok === Dash.start_plan(account)
      assert {:ok, %{subscription?: false}} = Dash.fetch_active_plan(account)
      assert [hub] = Hub.hubs_for_account(account)
      assert 10 === hub.ccu_limit
      assert :creating === hub.status
      assert 500 === hub.storage_limit_mb
      assert :p0 === hub.tier
      assert domain === hub.deployment.domain
    end

    @tag :skip
    test "when the account has a stopped plan"
  end

  describe "subscribe_to_personal_plan/2" do
    setup do
      %{account: create_account(), subscribed_at: ~U[1970-01-01 00:00:00.877000Z]}
    end

    test "when the account cannot be found", %{subscribed_at: subscribed_at} do
      assert {:error, :account_not_found} ===
               Dash.subscribe_to_personal_plan(%Account{account_id: 1}, subscribed_at)
    end

    test "when the account has an active subscription plan", %{
      account: account,
      subscribed_at: subscribed_at
    } do
      expect_orch_post()
      :ok = Dash.subscribe_to_personal_plan(account, subscribed_at)

      assert {:error, :already_started} ===
               Dash.subscribe_to_personal_plan(account, subscribed_at)
    end

    test "when the account has no plan", %{
      account: account,
      subscribed_at: subscribed_at
    } do
      domain = "testdomain.example"

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

      assert :ok === Dash.subscribe_to_personal_plan(account, subscribed_at)
      assert {:ok, %{subscription?: true}} = Dash.fetch_active_plan(account)
      assert [hub] = Hub.hubs_for_account(account)
      assert 20 === hub.ccu_limit
      assert :creating === hub.status
      assert 2_000 === hub.storage_limit_mb
      assert :p1 === hub.tier
      assert domain === hub.deployment.domain
    end

    @tag :skip
    test "when the account has a stopped plan"

    @tag :skip
    test "with subscribed_at earlier than the last state transition, when the account has a stopped plan"

    test "when the account has an active starter plan", %{account: account} do
      expect_orch_post()
      :ok = Dash.start_plan(account)
      after_start = DateTime.utc_now()
      {:ok, %{plan_id: plan_id}} = Dash.fetch_active_plan(account)
      [%{hub_id: hub_id}] = Hub.hubs_for_account(account)

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

      assert :ok === Dash.subscribe_to_personal_plan(account, after_start)
      {:ok, plan} = Dash.fetch_active_plan(account)
      assert plan_id === plan.plan_id
      assert plan.subscription?
      assert [hub] = Hub.hubs_for_account(account)
      assert 20 === hub.ccu_limit
      assert hub_id === hub.hub_id
      assert :updating === hub.status
      assert 2_000 === hub.storage_limit_mb
      assert :p1 === hub.tier
    end
  end

  @spec create_account :: Account.t()
  defp create_account,
    do: Account.find_or_create_account_for_fxa_uid("dummy UID", "dummy@test.com")

  defp stub_failed_ret_patch_update_email() do
    Mox.stub(HttpMock, :patch, fn url, _body, _headers, _opts ->
      cond do
        url =~ ~r/change_email_for_login$/ ->
          {:ok, %HTTPoison.Response{status_code: 500}}

        true ->
          Logger.error(
            "Inside test, hit set up in stub_failed_storage_ret_get/0, but GET request URL did not match either condition, did you mean to do that?"
          )
      end
    end)
  end
end
