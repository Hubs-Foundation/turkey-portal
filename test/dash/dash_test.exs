defmodule Dash.Test do
  use Dash.DataCase

  alias Dash.{Account, HttpMock, Hub}

  import Dash.TestHelpers
  import Dash.Utils, only: [capability_string: 0]
  require Logger

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
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
      expect_ret_patch_update_email()
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
      expect_ret_patch_update_email()
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

    test "if has fxa_subscriptions in cookie, capability is created for account" do
      %{now: now} = now_earlier_later_dt_s()
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      false = Dash.has_capability?(account)

      Dash.handle_first_sign_in_initialize_subscriptions(
        account,
        [capability_string()],
        now
      )

      assert Dash.has_capability?(account)

      active_capabilities = Dash.get_all_active_capabilities_for_account(account)
      assert [_] = active_capabilities
      assert capability_string() in active_capabilities
    end
  end

  describe "active_plan?/1" do
    test "when the account cannot be found" do
      assert false === Dash.active_plan?(%Account{account_id: 1})
    end

    test "when the account has no plan" do
      account = create_account()

      assert false === Dash.active_plan?(account)
    end

    test "when the account has an active starter plan" do
      stub_http_post_200()
      account = create_account()
      :ok = Dash.start_plan(account)

      assert true === Dash.active_plan?(account)
    end

    test "when the account has an active subscription plan" do
      account = create_account()

      Dash.create_capability!(account, %{
        capability: capability_string(),
        change_time: DateTime.utc_now(),
        is_active: true
      })

      assert true === Dash.active_plan?(account)
    end

    @tag :skip
    test "when the account has a stopped plan"
  end

  describe "start_plan/1" do
    test "creates the plan" do
      stub_http_post_200()
      account = create_account()

      assert :ok === Dash.start_plan(account)
      assert Dash.active_plan?(account)
    end

    test "creates the hub" do
      account = create_account()

      Mox.expect(HttpMock, :post, fn _url, json, _headers, _opts ->
        payload = Jason.decode!(json)
        assert "free" === payload["tier"]
        assert account.email === payload["useremail"]
        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert :ok === Dash.start_plan(account)
      assert [hub] = Hub.hubs_for_account(account)
      assert :free === hub.tier
      assert account.account_id === hub.account_id
    end

    test "when the account cannot be found" do
      assert {:error, :account_not_found} === Dash.start_plan(%Account{account_id: 1})
    end

    test "when the account has an active starter plan" do
      stub_http_post_200()
      account = create_account()
      :ok = Dash.start_plan(account)

      assert {:error, :already_started} === Dash.start_plan(account)
    end

    test "when the account has an active subscription plan" do
      account = create_account()

      Dash.create_capability!(account, %{
        capability: capability_string(),
        change_time: DateTime.utc_now(),
        is_active: true
      })

      assert {:error, :already_started} === Dash.start_plan(account)
    end

    @tag :skip
    test "when the account has a stopped plan"
  end

  @spec create_account :: Account.t()
  defp create_account,
    do: Account.find_or_create_account_for_fxa_uid("dummy UID")

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
