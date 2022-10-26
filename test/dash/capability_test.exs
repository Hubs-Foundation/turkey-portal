defmodule Dash.CapabilityTest do
  use Dash.DataCase
  import Ecto.Query
  import DashWeb.TestHelpers

  alias Dash.{Repo, Account, Capability}
  require Logger

  @capability1 "foo"
  @capability2 "bar"

  describe "create_capability/2" do
    # TODO throws changeset error when adding a capability that matches another capability
    test "can create multiple capabilities for existing account" do
      create_test_account_and_hub()
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      Capability.create_capability(account, %{
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      Capability.create_capability(account, %{
        capability: @capability2,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert length(Capability.get_all_capabilities_for_account(account)) === 2
    end
  end

  describe "update_or_create_capability_for_changeset/1" do
    test "Creates account if capability is added" do
      fxa_uid = get_default_test_uid()
      refute Repo.exists?(from(a in Dash.Account, where: a.fxa_uid == ^fxa_uid))

      Capability.update_or_create_capability_for_changeset(%{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: DateTime.utc_now()
      })

      assert Repo.exists?(from(a in Dash.Account, where: a.fxa_uid == ^fxa_uid))
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      assert length(Capability.get_all_capabilities_for_account(account)) == 1
      refute is_nil(Capability.get_one_capability(account, capability: @capability1))
    end

    test "Updates capability if the time changed is later than the one in db" do
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)

      now = DateTime.utc_now() |> DateTime.truncate(:second)
      earlier = DateTime.add(now, -5000) |> DateTime.truncate(:second)
      later = DateTime.add(now, 5000) |> DateTime.truncate(:second)

      capability_map = %{
        fxa_uid: fxa_uid,
        capability: @capability1,
        is_active: true,
        change_time: now
      }

      Capability.update_or_create_capability_for_changeset(capability_map)

      assert DateTime.compare(
               Capability.get_one_capability(account, capability: @capability1).change_time,
               now
             ) == :eq

      # Does NOT update time for earlier
      capability_map
      |> Map.merge(%{change_time: earlier})
      |> Capability.update_or_create_capability_for_changeset()

      assert DateTime.compare(
               Capability.get_one_capability(account, capability: @capability1).change_time,
               now
             ) == :eq

      # YES update for later
      capability_map
      |> Map.merge(%{change_time: later})
      |> Capability.update_or_create_capability_for_changeset()

      assert DateTime.compare(
               Capability.get_one_capability(account, capability: @capability1).change_time,
               later
             ) == :eq

      # YES update for same time and is_active_changed
      capability_map
      |> Map.merge(%{change_time: later, is_active: false})
      |> Capability.update_or_create_capability_for_changeset()

      assert DateTime.compare(
               Capability.get_one_capability(account, capability: @capability1).change_time,
               later
             ) == :eq

      assert Capability.get_one_capability(account, capability: @capability1).is_active ==
               false
    end

    test "Delete capabilities of ONLY the selected account" do
      fxa_uid = get_default_test_uid()
      account = Account.find_or_create_account_for_fxa_uid(fxa_uid)
      account1 = Account.find_or_create_account_for_fxa_uid(fxa_uid <> "1")
      account2 = Account.find_or_create_account_for_fxa_uid(fxa_uid <> "2")
      account3 = Account.find_or_create_account_for_fxa_uid(fxa_uid <> "3")

      count = 1
      count1 = 3
      count2 = 4
      count3 = 2

      create_capabilities(account, count)
      create_capabilities(account1, count1)
      create_capabilities(account2, count2)
      create_capabilities(account3, count3)

      {num, nil} = Capability.delete_all_capabilities_for_account(account)
      {num1, nil} = Capability.delete_all_capabilities_for_account(account1)
      {num2, nil} = Capability.delete_all_capabilities_for_account(account2)

      assert num == count
      assert num1 == count1
      assert num2 == count2

      assert length(Capability.get_all_capabilities_for_account(account3)) == count3
    end
  end
end
