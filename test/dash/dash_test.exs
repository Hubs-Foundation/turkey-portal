defmodule Dash.Test do
  use Dash.DataCase

  import DashWeb.TestHelpers
  require Logger

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  @old_email "old@old.old"
  @new_email "new@new.new"
  describe "change_email/2" do
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

  describe "has_account_for_fxa_uid?/1" do
    test "true if has account" do
      fxa_uid = "fxa_uid_test"
      Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      assert true === Dash.has_account_for_fxa_uid?(fxa_uid)
    end

    test "false if no account" do
      assert false === Dash.has_account_for_fxa_uid?("fxa-uid")
    end
  end

  describe "has_capability?/1" do
    test "true if account has any capabilities" do
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      create_capabilities(account, 1)
      assert true === Dash.has_capability?(account)
    end

    test "false if account has no capabilities" do
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      assert false === Dash.has_capability?(account)
    end
  end

  describe "handle_first_sign_in_initialize_subscriptions/3" do
    test "no fxa subscriptions in cookie" do
      %{now: now} = now_earlier_later_dt_s()
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)

      false = Dash.has_capability?(account)

      Dash.handle_first_sign_in_initialize_subscriptions(account, [], now)

      assert false === Dash.has_capability?(account)
      assert [] = Dash.get_all_active_capabilities_for_account(account)
    end

    test "if has fxa_subscriptions in cookie, capability is created for account" do
      %{now: now} = now_earlier_later_dt_s()
      fxa_uid = "fxa_uid_test"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      capability = DashWeb.Plugs.Auth.capability_string()

      false = Dash.has_capability?(account)

      Dash.handle_first_sign_in_initialize_subscriptions(
        account,
        [capability],
        now
      )

      assert true === Dash.has_capability?(account)

      active_capabilities = Dash.get_all_active_capabilities_for_account(account)
      assert [_] = active_capabilities
      assert capability in active_capabilities
    end
  end

  defp stub_failed_ret_patch_update_email() do
    Dash.HttpMock
    |> Mox.stub(:patch, fn url, _body, _headers, _opts ->
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
