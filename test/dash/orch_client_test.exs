defmodule Dash.OrchClientTest do
  use ExUnit.Case

  alias Dash.{HttpMock, Hub, HubDeployment}

  setup do
    Mox.verify_on_exit!()
  end

  test "should patch subdomain with the correct API shape" do
    Mox.expect(HttpMock, :patch, 1, fn url, body_str, _headers, _opts ->
      assert url =~ ~r/\/hc_instance$/

      body = Jason.decode!(body_str)
      assert %{"domain" => "domain", "hub_id" => "1234", "subdomain" => "newsubdomain"} = body
    end)

    Dash.OrchClient.update_subdomain(%Hub{
      deployment: %HubDeployment{domain: "domain"},
      hub_id: 1234,
      subdomain: "newsubdomain"
    })
  end
end
