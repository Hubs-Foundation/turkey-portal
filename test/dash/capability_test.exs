defmodule Dash.CapabilityTest do
  use Dash.DataCase

  import Ecto.Query
  import DashWeb.TestHelpers
  alias Dash.{Repo, Account}
  require Logger

  @capability1 "foo"
  @capability2 "bar"

  describe "create_capability!/2" do
    test "raises error if adding a duplicate capability for account" do
      create_test_account_and_hub()
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      Dash.create_capability!(account, %{
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert_raise Ecto.InvalidChangesetError, fn ->
        Dash.create_capability!(account, %{
          capability: @capability1,
          is_active: true,
          change_time: DateTime.utc_now()
        })
      end
    end

    test "can create multiple capabilities for existing account" do
      create_test_account_and_hub(subscribe?: false)
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      Dash.create_capability!(account, %{
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      Dash.create_capability!(account, %{
        capability: @capability2,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert [_, _] = Dash.get_all_capabilities_for_account(account)
    end
  end

  describe "update_or_create_capability_for_changeset/1" do
    test "Creates account if capability is added" do
      fxa_uid = get_default_test_uid()
      false = Repo.exists?(from(a in Dash.Account, where: a.fxa_uid == ^fxa_uid))

      Dash.update_or_create_capability_for_changeset(%{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert Repo.exists?(from(a in Dash.Account, where: a.fxa_uid == ^fxa_uid))
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      assert [_] = Dash.get_all_capabilities_for_account(account)
      assert Dash.get_one_capability(account, capability: @capability1)
    end

    test "Updates capability if the time_changed is later than the one in db" do
      %{fxa_uid: fxa_uid, account: account, now: now} = setup()
      later = DateTime.add(now, 5000) |> DateTime.truncate(:second)

      capability_map = %{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: now
      }

      Dash.update_or_create_capability_for_changeset(capability_map)

      capability_map
      |> Map.put(:change_time, later)
      |> Dash.update_or_create_capability_for_changeset()

      assert DateTime.compare(
               Dash.get_one_capability(account, capability: @capability1).change_time,
               later
             ) == :eq
    end

    test "Does NOT update capability if time_changed is earlier than one in db" do
      %{fxa_uid: fxa_uid, account: account, now: now} = setup()
      earlier = DateTime.add(now, -5000) |> DateTime.truncate(:second)

      capability_map = %{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: now
      }

      Dash.update_or_create_capability_for_changeset(capability_map)

      capability_map
      |> Map.put(:change_time, earlier)
      |> Dash.update_or_create_capability_for_changeset()

      assert DateTime.compare(
               Dash.get_one_capability(account, capability: @capability1).change_time,
               now
             ) == :eq
    end

    test "updates capability if time_changed is unchanged and is_active is changed" do
      %{fxa_uid: fxa_uid, account: account, now: now} = setup()

      capability_map = %{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: now
      }

      Dash.update_or_create_capability_for_changeset(capability_map)

      capability_map
      |> Map.merge(%{change_time: now, is_active: false})
      |> Dash.update_or_create_capability_for_changeset()

      assert DateTime.compare(
               Dash.get_one_capability(account, capability: @capability1).change_time,
               now
             ) == :eq

      assert Dash.get_one_capability(account, capability: @capability1).is_active ==
               false
    end
  end

  describe "delete_all_capabilities_for_account/1" do
    test "delete capabilities of ONLY the selected account" do
      fxa_uid = get_default_test_uid()
      other_account = Account.find_or_create_account_for_fxa_uid(fxa_uid)
      create_capabilities(other_account, 1)

      for i <- 1..4 do
        account = Account.find_or_create_account_for_fxa_uid("#{fxa_uid}#{i}")
        create_capabilities(account, i)

        assert {i, nil} === Dash.delete_all_capabilities_for_account(account)
        assert [] === Dash.get_all_capabilities_for_account(account)
        assert [_] = Dash.get_all_capabilities_for_account(other_account)
      end
    end
  end

  defp setup() do
    fxa_uid = get_default_test_uid()
    account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

    now = DateTime.utc_now() |> DateTime.truncate(:second)

    %{fxa_uid: fxa_uid, account: account, now: now}
  end
end
