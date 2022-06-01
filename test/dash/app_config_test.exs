defmodule Dash.AppConfigTest do
  use ExUnit.Case

  test "should define cluster correctly" do
    Application.put_env(:dash, Dash.AppConfig, host: "dashboard.cluster.domain.com")
    assert Dash.AppConfig.cluster() === "cluster.domain.com"

    Application.put_env(:dash, Dash.AppConfig, host: "dashboard.domain.com")
    assert Dash.AppConfig.cluster() === "domain.com"
  end
end
