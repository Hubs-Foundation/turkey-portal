# Should create subscriptions for each capability passed in
# Should create an account before adding subscriptions for missing account
# Conn If iat is later than change_time do something???
# Remember to delete subscriptions if account is deleted
defmodule Dash.SubscriptionTest do
  use Dash.DataCase
  import Ecto.Query
  import DashWeb.TestHelpers

  alias Dash.{Repo, Account, Subscription}
  require Logger

  @capability1 "foo"
  @capability2 "bar"
  describe "Subscription tests" do
    @tag marked: true
    test "can create multiple subscriptions for existing account" do
      create_test_account_and_hub()

      fxa_uid = get_default_test_uid()

      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      assert Subscription.get_all_subscriptions_for_account(account) |> length() == 0

      Subscription.create_subscription(account, %{
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert Subscription.get_all_subscriptions_for_account(account) |> length() == 1

      Subscription.create_subscription(account, %{
        capability: @capability2,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert Subscription.get_all_subscriptions_for_account(account) |> length() == 2
    end

    @tag marked: true
    test "Creates account if subscription is added" do
      fxa_uid = get_default_test_uid()
      refute Repo.exists?(from(a in Dash.Account, where: a.fxa_uid == ^fxa_uid))

      Subscription.update_or_create_subscription_for_changeset(%{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert Repo.exists?(from(a in Dash.Account, where: a.fxa_uid == ^fxa_uid))
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      assert Subscription.get_all_subscriptions_for_account(account) |> length() == 1
      refute is_nil(Subscription.get_one_subscription(account, capability: @capability1))
    end

    @tag marked: true
    test "Updates subscription if the time is later" do
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      now = DateTime.utc_now() |> DateTime.truncate(:second)
      earlier = DateTime.add(now, -5000) |> DateTime.truncate(:second)
      later = DateTime.add(now, 5000) |> DateTime.truncate(:second)

      subscription_struct = %{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: now
      }

      Subscription.update_or_create_subscription_for_changeset(subscription_struct)

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               now
             ) == :eq

      # Does NOT update time for earlier
      subscription_struct
      |> Map.merge(%{change_time: earlier})
      |> Subscription.update_or_create_subscription_for_changeset()

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               now
             ) == :eq

      # YES update for later
      subscription_struct
      |> Map.merge(%{change_time: later})
      |> Subscription.update_or_create_subscription_for_changeset()

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               later
             ) == :eq

      # YES update for same time and is_active_changed
      subscription_struct
      |> Map.merge(%{change_time: later, is_active: false})
      |> Subscription.update_or_create_subscription_for_changeset()

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               later
             ) == :eq

      assert Subscription.get_one_subscription(account, capability: @capability1).is_active ==
               false
    end
  end
end
