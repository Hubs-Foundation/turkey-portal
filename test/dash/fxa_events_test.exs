defmodule Dash.FxaEventsTest do
  use ExUnit.Case
  use Dash.DataCase

  import Dash.TestHelpers

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  describe "handle_subscription_changed_event/2" do
    test "Should delete hub if subscription event is_active is false" do
      expect_orch_delete()
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()

      account = Dash.Account.account_for_fxa_uid(fxa_uid)
      %Dash.Account{} = account
      [_] = Dash.Hub.hubs_for_account(account)
      [_] = Dash.get_all_capabilities_for_account(account)

      event = get_subscription_changed_event(is_active: false)
      Dash.FxaEvents.handle_subscription_changed_event(fxa_uid, event)

      assert [] === Dash.Hub.hubs_for_account(account)

      assert [_] = Dash.get_all_capabilities_for_account(account)
    end

    test "if subscribed event, then a later subscribed event, then capability should have the latest" do
      fxa_uid = get_default_test_uid()
      %{now: now, later: later} = now_earlier_later_unix_millisecond()

      event_now = get_subscription_changed_event(change_time: now)
      Dash.FxaEvents.handle_subscription_changed_event(fxa_uid, event_now)

      event_later = get_subscription_changed_event(change_time: later)
      Dash.FxaEvents.handle_subscription_changed_event(fxa_uid, event_later)

      account = Dash.Account.account_for_fxa_uid(fxa_uid)

      [%Dash.Capability{change_time: change_time}] =
        Dash.get_all_capabilities_for_account(account)

      later_dt =
        later
        |> DateTime.from_unix!(:millisecond)
        |> DateTime.truncate(:second)

      assert :eq === DateTime.compare(later_dt, change_time)
    end

    test "should make account if handle subscribed event true and no previous account" do
      fxa_uid = "fxa-uid"
      nil = Dash.Account.account_for_fxa_uid(fxa_uid)

      event = get_subscription_changed_event()
      Dash.FxaEvents.handle_subscription_changed_event(fxa_uid, event)

      assert %Dash.Account{} = Dash.Account.account_for_fxa_uid(fxa_uid)
    end

    test "each subscription changed event forces user to log in again" do
      # iat changed in the account
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()
      %{now: now} = now_earlier_later_unix_millisecond()

      event = get_subscription_changed_event(change_time: now)
      Dash.FxaEvents.handle_subscription_changed_event(fxa_uid, event)

      %Dash.Account{auth_updated_at: auth_updated_at} = Dash.Account.account_for_fxa_uid(fxa_uid)

      assert :eq ==
               DateTime.compare(
                 auth_updated_at,
                 now |> DateTime.from_unix!(:millisecond) |> DateTime.truncate(:second)
               )
    end
  end
end
