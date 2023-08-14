import Config

config :dash, Dash.OrchClient, http_client: Dash.HttpMock, orch_host: "orch.test"

# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :dash, Dash.Repo,
  username: "postgres",
  password: "postgres",
  database: "dash_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

config :dash, Dash.RetClient, http_client: Dash.HttpMock

config :dash, DashWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "+Zm3JIfo2DSCREfgIyagAsR48QVEh/l6LR+jDuNaLqVDByGe7U5GTdNHZ0lOWHsw",
  server: false

config :dash, Dash.AppConfig, host: "dashboard.cluster.turkey.local"

config :dash, DashWeb.Plugs.BasicAuth, enabled: false

config :dash, Dash,
  plans: "plan_test_1,USD,10;plan_test_2,EUR,20",
  subdomain_wait_time: 0

config :dash, DashWeb.Plugs.Auth,
  auth_server: "test.auth.server",
  cookie_secure: false

config :dash, Dash.ApprovedEmail, enabled: false

config :dash, Dash.RetClient,
  timeout_ms: 3_000,
  wait_ms: 500

config :dash, Dash.HubStat, enable_hub_stats: true

config :dash, DashWeb.Plugs.FxaEventsParser, fxa_jwk_string: "test-aC2KtiGDxtqvNmv"

# Print only logs that are critical and above
config :logger, level: :critical

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Disable swoosh api client as it is only required for production adapters.
config :swoosh, :api_client, false
