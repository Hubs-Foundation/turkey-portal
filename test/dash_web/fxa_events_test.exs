defmodule DashWeb.FxaEventsTest do
  use Dash.DataCase

  alias DashWeb.FxaEvents
  import Dash.TestHelpers

  setup do
    Mox.verify_on_exit!()
  end

  describe "handle_subscription_changed_event/2" do
    test "Should NOT delete hub if subscription event is_active is false" do
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()

      account = Dash.Account.account_for_fxa_uid(fxa_uid)
      %Dash.Account{} = account
      [_] = Dash.Hub.hubs_for_account(account)

      event = get_subscription_changed_event(is_active: false)
      FxaEvents.handle_subscription_changed_event(fxa_uid, event)

      assert [_] = Dash.Hub.hubs_for_account(account)
    end

    test "should make account if handle subscribed event true and no previous account" do
      expect_orch_post()
      fxa_uid = "fxa-uid"
      nil = Dash.Account.account_for_fxa_uid(fxa_uid)

      event = get_subscription_changed_event()
      FxaEvents.handle_subscription_changed_event(fxa_uid, event)

      assert %Dash.Account{} = Dash.Account.account_for_fxa_uid(fxa_uid)
    end

    test "each subscription changed event forces user to log in again" do
      Mox.stub(Dash.HttpMock, :patch, fn _url, _body, _headers, _opts ->
        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      expect_orch_post()
      fxa_uid = get_default_test_uid()

      :ok =
        fxa_uid
        |> Dash.Account.find_or_create_account_for_fxa_uid("dummy@email.test")
        |> Dash.start_plan()

      %{now: now} = now_earlier_later_unix_millisecond()

      event = get_subscription_changed_event(change_time: now)
      FxaEvents.handle_subscription_changed_event(fxa_uid, event)

      %Dash.Account{auth_updated_at: auth_updated_at} = Dash.Account.account_for_fxa_uid(fxa_uid)

      assert :eq ==
               DateTime.compare(
                 auth_updated_at,
                 now |> DateTime.from_unix!(:millisecond) |> DateTime.truncate(:second)
               )
    end
  end
end
