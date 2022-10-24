defmodule Dash.SubscriptionTest do
  use Dash.DataCase
  import Ecto.Query
  import DashWeb.TestHelpers

  alias Dash.{Repo, Account, Subscription}
  require Logger

  @capability1 "foo"
  @capability2 "bar"

  describe "create_subscription/2" do
    # TODO throws changeset error when adding a capability that matches another capability
    test "can create multiple subscriptions for existing account" do
      create_test_account_and_hub()
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      Subscription.create_subscription(account, %{
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      Subscription.create_subscription(account, %{
        capability: @capability2,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert length(Subscription.get_all_subscriptions_for_account(account)) === 2
    end
  end

  describe "update_or_create_subscription_for_changeset/1" do
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

      assert [_] === Subscription.get_all_subscriptions_for_account(account)
      refute is_nil(Subscription.get_one_subscription(account, capability: @capability1))
    end

    test "Updates subscription if the time changed is later than the one in db" do
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      now = DateTime.utc_now() |> DateTime.truncate(:second)
      earlier = DateTime.add(now, -5000) |> DateTime.truncate(:second)
      later = DateTime.add(now, 5000) |> DateTime.truncate(:second)

      subscription_map = %{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: now
      }

      Subscription.update_or_create_subscription_for_changeset(subscription_map)

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               now
             ) == :eq

      # Does NOT update time for earlier
      subscription_map
      |> Map.merge(%{change_time: earlier})
      |> Subscription.update_or_create_subscription_for_changeset()

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               now
             ) == :eq

      # YES update for later
      subscription_map
      |> Map.merge(%{change_time: later})
      |> Subscription.update_or_create_subscription_for_changeset()

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               later
             ) == :eq

      # YES update for same time and is_active_changed
      subscription_map
      |> Map.merge(%{change_time: later, is_active: false})
      |> Subscription.update_or_create_subscription_for_changeset()

      assert DateTime.compare(
               Subscription.get_one_subscription(account, capability: @capability1).change_time,
               later
             ) == :eq

      assert Subscription.get_one_subscription(account, capability: @capability1).is_active ==
               false
    end

    test "Delete subscriptions of ONLY the selected account" do
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)
      account1 = Account.find_or_create_account_for_fxa_uid(fxa_uid <> "1")
      account2 = Account.find_or_create_account_for_fxa_uid(fxa_uid <> "2")
      account3 = Account.find_or_create_account_for_fxa_uid(fxa_uid <> "3")

      count = 1
      count1 = 3
      count2 = 4
      count3 = 2

      create_subscriptions(account, count)
      create_subscriptions(account1, count1)
      create_subscriptions(account2, count2)
      create_subscriptions(account3, count3)

      {num, nil} = Subscription.delete_all_subscriptions_for_account(account)
      {num1, nil} = Subscription.delete_all_subscriptions_for_account(account1)
      {num2, nil} = Subscription.delete_all_subscriptions_for_account(account2)

      assert num == count
      assert num1 == count1
      assert num2 == count2

      assert length(Subscription.get_all_subscriptions_for_account(account3)) == count3
    end
  end
end
