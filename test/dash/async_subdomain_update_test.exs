defmodule DashWeb.Api.V1.HubControllerTest do
  # async: true
  use DashWeb.ConnCase
  use Retry
  import DashWeb.TestHelpers
  import Mox
  alias Dash.Hub

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  describe "Dash.Hub.update_hub/3" do
    test "should wait before doing health call on subdomain update" do
      stub_ret_rewrite_assets()
      expect_ret_wait_on_health(time_until_healthy_ms: 0, max_expected_calls: 1)
      expect_orch_patch()

      dash_env =
        :dash
        |> Application.fetch_env!(Dash)
        |> Keyword.put(:subdomain_wait_time, 2000)

      Application.put_env(:dash, Dash, dash_env)

      %{hub: hub, account: account} = create_test_account_and_hub()
      assert hub.subdomain =~ "test-subdomain"

      Dash.Hub.update_hub(hub.hub_id, %{"subdomain" => "new-subdomain"}, account)

      conn |> patch_subdomain(hub, "NEW-subdomain", expected_status: :ok)
      %{"subdomain" => "new-subdomain"} = get_hub(conn, hub)

      Application.put_env(:dash, Dash, Keyword.put(dash_env, :subdomain_wait_time, 0))
    end
  end
end
