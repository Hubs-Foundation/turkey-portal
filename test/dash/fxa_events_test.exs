defmodule Dash.FxaEventsTest do
  use ExUnit.Case
  use Dash.DataCase
  import DashWeb.TestHelpers

  # setup_all do
  #   setup_http_mocks()
  #   on_exit(fn -> exit_http_mocks() end)
  # end

  describe "handle_subscription_changed_event/2" do
    test "Should delete hub if is_active is false" do
      # expect_orch_delete()
      # fxa_uid = get_default_test_uid()
      # create_test_account_and_hub()
    end
  end
end
