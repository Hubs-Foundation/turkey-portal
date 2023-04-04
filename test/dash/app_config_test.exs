defmodule Dash.AppConfigTest do
  use ExUnit.Case

  import Dash.TestHelpers, only: [merge_module_config: 3]

  test "should define cluster correctly" do
    merge_module_config(:dash, Dash.AppConfig, host: "dashboard.cluster.domain.com")
    assert Dash.AppConfig.cluster_domain() === "cluster.domain.com"

    merge_module_config(:dash, Dash.AppConfig, host: "dashboard.domain.com")
    assert Dash.AppConfig.cluster_domain() === "domain.com"
  end
end
