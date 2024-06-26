defmodule Dash.AccountTest do
  use Dash.DataCase

  import Dash.TestHelpers

  setup do
    Mox.verify_on_exit!()
  end

  describe "delete_account_and_hubs/1" do
    test "Should delete account and their hubs" do
      expect_orch_delete()
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()

      account = Dash.Account.account_for_fxa_uid(fxa_uid)
      %Dash.Account{} = account
      if account === nil, do: raise("missing account")
      hubs = Dash.Hub.hubs_for_account(account)
      [_ | _] = hubs

      Dash.Account.delete_account_and_hubs(account)

      hubs = Dash.Hub.hubs_for_account(account)
      assert [] === hubs
      assert nil == Dash.Account.account_for_fxa_uid(fxa_uid)
    end

    test "Account should NOT be added to deleted_fxa_accounts table" do
      expect_orch_delete()
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()

      account = Dash.Account.account_for_fxa_uid(fxa_uid)
      %Dash.Account{} = account
      if account === nil, do: raise("missing account")
      hubs = Dash.Hub.hubs_for_account(account)
      [_ | _] = hubs

      Dash.Account.delete_account_and_hubs(account)

      refute Dash.was_deleted?(fxa_uid)
    end
  end

  describe "add_email_to_account/2" do
    test "Adds new email to existing account, returns updated account" do
      new_email = "new@new.new"
      account = Dash.Account.find_or_create_account_for_fxa_uid("fxa_uid")

      updated_account = Dash.add_email_to_account(account, new_email)
      assert %Dash.Account{} = updated_account
      assert new_email === updated_account.email
    end
  end

  describe "update_email/2" do
    test "Adds new email to account, no previous email, returns :ok" do
      new_email = "new@new.new"
      account = Dash.Account.find_or_create_account_for_fxa_uid("fxa_uid")

      updated_account = Dash.add_email_to_account(account, new_email)
      assert %Dash.Account{} = updated_account
      assert new_email === updated_account.email
    end

    test "Adds new email to account with previous email, returns :ok" do
      new_email = "new@new.new"
      account = Dash.Account.find_or_create_account_for_fxa_uid("fxa_uid", "old@old.old")

      result = Dash.update_email(account, new_email)

      updated_account = Dash.Account.find_or_create_account_for_fxa_uid("fxa_uid")
      assert new_email === updated_account.email
      assert :ok === result
    end
  end
end
