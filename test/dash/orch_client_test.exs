defmodule Dash.OrchClientTest do
  use ExUnit.Case

  import Dash.TestHelpers
  import Mox, only: [verify_on_exit!: 1]

  setup_all context do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
    verify_on_exit!(context)
  end

  test "should patch subdomain with the correct API shape" do
    Mox.expect(Dash.HttpMock, :patch, 1, fn url, body_str, _headers, _opts ->
      assert url =~ ~r/\/hc_instance$/

      body = Jason.decode!(body_str)
      assert %{"hub_id" => "1234", "subdomain" => "newsubdomain"} = body
    end)

    Dash.OrchClient.update_subdomain(%Dash.Hub{hub_id: 1234, subdomain: "newsubdomain"})
  end
end
