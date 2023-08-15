import Config

config :dash, Dash.OrchClient, orch_host: "turkeyorch:889"

config :dash, Dash.Repo.Migrations, http_client: :hackney

config :dash, Dash.RetClient,
  timeout_ms: 600_000,
  wait_ms: 2000

config :dash, Dash.FeatureFlags,
  create_hubs: false,
  delete_hubs: false,
  tier_selection: false,
  ccu_selection: false,
  storage_selection: false

config :dash, DashWeb.Plugs.BasicAuth, enabled: false

config :dash, Dash.HubStat, enable_hub_stats: true

config :dash, Dash.ApprovedEmail, enabled: false

config :dash, Dash.Scheduler,
  jobs: [
    # Runs every midnight:
    {"@daily", {Dash.HubStat, :job_record_hub_stats, []}}
  ]

# Do not print debug messages in production
config :logger, level: :info
