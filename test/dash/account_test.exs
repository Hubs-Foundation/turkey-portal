defmodule Dash.AccountTest do
  use ExUnit.Case
  use Dash.DataCase
  import DashWeb.TestHelpers

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  describe "Account tests" do
    test "Should delete account and their hubs" do
      expect_orch_delete()
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()

      account = Dash.Account.account_for_fxa_uid(fxa_uid)
      %Dash.Account{} = account
      if account === nil, do: raise("missing account")
      hubs = Dash.Hub.hubs_for_account(account)
      [_ | _] = hubs

      Dash.Account.delete_account_and_hubs(fxa_uid)

      hubs = Dash.Hub.hubs_for_account(account)
      assert hubs === []
      assert account == nil
  end
end
