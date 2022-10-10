import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :dash, Dash.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "dash_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :dash, DashWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "+Zm3JIfo2DSCREfgIyagAsR48QVEh/l6LR+jDuNaLqVDByGe7U5GTdNHZ0lOWHsw",
  server: false

config :dash, Dash.AppConfig, host: "dashboard.cluster.turkey.local"

config :dash, DashWeb.Plugs.BasicAuth, enabled: false

config :dash, DashWeb.Plugs.Auth, auth_server: "test.auth.server"

config :dash, Dash.ApprovedEmail, enabled: false

# In test we don't send emails.
config :dash, Dash.Mailer, adapter: Swoosh.Adapters.Test

config :dash, Dash.RetClient,
  timeout_ms: 3_000,
  wait_ms: 500

# Print only logs that are critical and above
config :logger, level: :critical

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

config :dash, Dash.HubStat, enable_hub_stats: true

config :dash, Dash.Subscription, subscription_capability: "hubs-local-sub-test"
