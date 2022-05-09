import Config

pub_key_choice = :local

auth_pub_key =
  case pub_key_choice do
    :dev ->
      # Public key for verifying tokens generated by the dev auth server.
      "-----BEGIN RSA PUBLIC KEY-----\n" <>
        "MIIBCgKCAQEA3RY0qLmdthY6Q0RZ4oyNQSL035BmYLNdleX1qVpG1zfQeLWf/otg\n" <>
        "c8Ho2w8y5wW2W5vpI4a0aexNV2evgfsZKtx0q5WWwjsr2xy0Ak1zhWTgZD+FoHVG\n" <>
        "J0xeFse2PnEhrtWalLacTza5RKEJskbNiTTu4fD+UfOCMctlwudNSs+AkmiPSxc8\n" <>
        "nWrZ5BuvdnEXcJOuw0h4oyyUlkmj+Oa/ZQVH44lmPI9Ih0OakXWpIfOob3X0Xqcd\n" <>
        "ywlMVI2hzBR3JNodRjyEz33p6E//lY4Iodw9NdcRpohGcxcgQ5vf4r4epLIacr0y\n" <>
        "5w1ZiRyf6BwyqJ6IBpA7yYpws3r9qxmAqwIDAQAB\n" <>
        "-----END RSA PUBLIC KEY-----\n"

    :local ->
      # Public key for verifying tokens generated by the dash.generate_local_token mix task.
      "-----BEGIN RSA PUBLIC KEY-----\n" <>
        "MEgCQQC+ASneiujaZPa4lvmwcNesSp1ovryCQgT8QTIAwa4onj/q/yn5tsEyBfp1\n" <>
        "1E7rTVYVO/XYL+V0YxkI27KHGRmDAgMBAAE=\n" <>
        "-----END RSA PUBLIC KEY-----\n"
  end

# Configure your database
config :dash, Dash.Repo,
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  database: "dash_dev",
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with esbuild to bundle .js and .css sources.
config :dash, DashWeb.Endpoint,
  # Binding to loopback ipv4 address prevents access from other machines.
  # Change to `ip: {0, 0, 0, 0}` to allow access from other machines.
  http: [ip: {0, 0, 0, 0}, port: 4000],
  check_origin: false,
  code_reloader: true,
  debug_errors: true,
  secret_key_base: "PAg4b9J2Hq5u9H28jtxURymTJntRERKlYvJQqg7CYjbu4tag2AYbhUwv36v6qJCf",
  watchers: [
    # Start the esbuild watcher by calling Esbuild.install_and_run(:default, args)
    esbuild: {Esbuild, :install_and_run, [:default, ~w(--sourcemap=inline --watch)]}
  ]

config :dash, DashWeb.Plugs.Auth, auth_pub_key: auth_pub_key

config :dash, DashWeb.Plugs.BasicAuth,
  # Disable BasicAuth by default in local dev, since it's a bit annoying.
  enabled: false,
  username: "local",
  password: "pass"

config :dash, Dash.OrchClient, orch_host: ""

config :dash, Dash.FeatureFlags,
  create_hubs: false,
  delete_hubs: true,
  tier_selection: true,
  ccu_selection: true,
  storage_selection: true

config :cors_plug,
  origin: ["http://localhost:3000"]

# ## SSL Support
#
# In order to use HTTPS in development, a self-signed
# certificate can be generated by running the following
# Mix task:
#
#     mix phx.gen.cert
#
# Note that this task requires Erlang/OTP 20 or later.
# Run `mix help phx.gen.cert` for more information.
#
# The `http:` config above can be replaced with:
#
#     https: [
#       port: 4001,
#       cipher_suite: :strong,
#       keyfile: "priv/cert/selfsigned_key.pem",
#       certfile: "priv/cert/selfsigned.pem"
#     ],
#
# If desired, both `http:` and `https:` keys can be
# configured to run both http and https servers on
# different ports.

# Watch static and templates for browser reloading.
config :dash, DashWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"priv/gettext/.*(po)$",
      ~r"lib/dash_web/(live|views)/.*(ex)$",
      ~r"lib/dash_web/templates/.*(eex)$"
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime
