defmodule Dash.SubscriptionTest do
  use Dash.DataCase
  import Ecto.Query
  import DashWeb.TestHelpers

  alias Dash.{Repo, Account, Subscription}
  require Logger

  @capability1 "foo"
  @capability2 "bar"
  describe "Subscription tests" do
    # TODO throws changeset error when adding a capability that matches another capability
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

    test "Updates subscription if the time is later" do
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      %{now: now, earlier: earlier, later: later} = get_times()

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

    test "Delete subscriptions of ONLY the selected account" do
      fxa_uid = get_default_test_uid()
      account = fxa_uid |> Account.find_or_create_account_for_fxa_uid()
      account1 = (fxa_uid <> "1") |> Account.find_or_create_account_for_fxa_uid()
      account2 = (fxa_uid <> "2") |> Account.find_or_create_account_for_fxa_uid()
      account3 = (fxa_uid <> "3") |> Account.find_or_create_account_for_fxa_uid()

      count = 1
      count1 = 3
      count2 = 4
      count3 = 2

      account |> create_subscriptions(count)
      account1 |> create_subscriptions(count1)
      account2 |> create_subscriptions(count2)
      account3 |> create_subscriptions(count3)

      {num, nil} = account |> Subscription.delete_all_subscriptions_for_account()
      {num1, nil} = account1 |> Subscription.delete_all_subscriptions_for_account()
      {num2, nil} = account2 |> Subscription.delete_all_subscriptions_for_account()

      assert num == count
      assert num1 == count1
      assert num2 == count2

      assert length(Subscription.get_all_subscriptions_for_account(account3)) == count3
    end
  end

  describe "Subscription test process_latest_fxa_subscription: cookie and subscriptions comparison" do
    # Process process_latest_fxa_subscription

    # Happy paths:
    test "Subscriptions in db matches cookie: Sub is nil, cookie no subs" do
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      cookie_info = %{iat_utc_dt: now(), fxa_subscriptions: []}
      fxa_subscriptions = Subscription.process_latest_fxa_subscription(account, cookie_info)

      assert fxa_subscriptions == []
    end

    test "Subscriptions in db matches cookie: Sub is not_active, cookie no subs" do
      %{later: later, earlier: earlier} = get_times()

      # Test with iat later
      test_struct1 = %{
        fxa_uid: "uid1",
        iat: later,
        change_time: earlier,
        is_active: false,
        fxa_subscriptions: []
      }

      fxa_subscriptions = get_latest_fxa_subscriptions(test_struct1)

      assert fxa_subscriptions == []

      # Test with change_time later
      test_struct2 = %{
        fxa_uid: "uid2",
        iat: earlier,
        change_time: later,
        is_active: false,
        fxa_subscriptions: []
      }

      fxa_subscriptions2 = get_latest_fxa_subscriptions(test_struct2)

      assert fxa_subscriptions2 == []
    end

    test "Subscriptions in db matches cookie: Sub is_active, cookie subs" do
      %{later: later, earlier: earlier} = get_times()
      capability = Subscription.get_capability_string()

      # iat later, change_time earlier
      # Sub is_active=true, cookie hasSub
      test_struct1 = %{
        fxa_uid: "uid1",
        iat: later,
        change_time: earlier,
        is_active: true,
        fxa_subscriptions: [capability]
      }

      fxa_subscriptions1 = get_latest_fxa_subscriptions(test_struct1)

      assert capability in fxa_subscriptions1

      # Test with change_time later
      test_struct2 = %{
        fxa_uid: "uid2",
        iat: earlier,
        change_time: later,
        is_active: false,
        fxa_subscriptions: []
      }

      fxa_subscriptions2 = get_latest_fxa_subscriptions(test_struct2)

      assert capability in fxa_subscriptions2
    end

    # Test: subscription and cookie do NOT match, change_time LATER
    test "Subscriptions do NOT match db and cookie: cookie NO sub, sub is_active=true, change_time later, match is_active=true" do
      # cookie = no subs , subscription = sub, subscription change_at later
      %{later: later, earlier: earlier} = get_times()
      capability = Subscription.get_capability_string()

      # iat earlier, change_time later
      # Sub is_active=true, cookie NO subs
      test_struct = %{
        fxa_uid: "uid1",
        iat: earlier,
        change_time: later,
        is_active: true,
        fxa_subscriptions: []
      }

      fxa_subscriptions = get_latest_fxa_subscriptions(test_struct)

      assert capability in fxa_subscriptions
    end

    # Test: subscription and cookie do NOT match
    test "Subscriptions do NOT match db and cookie: cookie YES sub, sub is_active=false, change_time later, match is_active=false" do
      %{later: later, earlier: earlier} = get_times()
      capability = Subscription.get_capability_string()

      # cookie = yes subs, subscription no subs, subscription change_at later
      test_struct = %{
        fxa_uid: "uid1",
        iat: earlier,
        change_time: later,
        is_active: false,
        fxa_subscriptions: [capability]
      }

      fxa_subscriptions = get_latest_fxa_subscriptions(test_struct)

      assert fxa_subscriptions == []
    end

    # Not happy paths
    test "NOT Happy path, means something was wrong: Subscriptions do NOT match, iat later, match cookie" do
      %{later: later, earlier: earlier} = get_times()
      capability = Subscription.get_capability_string()

      # cookie = NO subs, subscription YES subs, iat later
      test_struct1 = %{
        fxa_uid: "uid1",
        iat: later,
        change_time: earlier,
        is_active: true,
        fxa_subscriptions: []
      }

      fxa_subscriptions1 = get_latest_fxa_subscriptions(test_struct1)

      assert fxa_subscriptions1 == []

      # cookie = YES subs, subscription NO subs, iat later
      test_struct2 = %{
        fxa_uid: "uid1",
        iat: later,
        change_time: earlier,
        is_active: false,
        fxa_subscriptions: [capability]
      }

      fxa_subscriptions2 = get_latest_fxa_subscriptions(test_struct2)

      # Not happy path but refer to latest iat
      assert fxa_subscriptions2 == [capability]
    end
  end

  defp now() do
    DateTime.utc_now() |> DateTime.truncate(:second)
  end

  defp get_times() do
    now = now()
    earlier = DateTime.add(now, -5000) |> DateTime.truncate(:second)
    later = DateTime.add(now, 5000) |> DateTime.truncate(:second)
    %{now: now, earlier: earlier, later: later}
  end

  defp get_latest_fxa_subscriptions(%{iat: iat, fxa_subscriptions: fxa_subscriptions} = opts) do
    account = create_account_and_subscription(opts)

    cookie_info = %{
      iat_utc_dt: iat,
      fxa_subscriptions: fxa_subscriptions
    }

    Subscription.process_latest_fxa_subscription(account, cookie_info)
  end

  # Uses fxa_uid in the struct
  defp create_account_and_subscription(%{fxa_uid: fxa_uid} = opts) do
    account = Account.find_or_create_account_for_fxa_uid(fxa_uid)
    create_subscription(account, opts)
    account
  end

  # Uses is_active: true, change_time, capability: nil in the struct
  defp create_subscription(
         account,
         %{
           is_active: is_active,
           change_time: change_time
         }
       ) do
    capability = Subscription.get_capability_string()

    subscription_struct = %{
      fxa_uid: account.fxa_uid,
      capability: capability,
      is_active: is_active,
      change_time: change_time
    }

    Subscription.update_or_create_subscription_for_changeset(subscription_struct)
  end
end
