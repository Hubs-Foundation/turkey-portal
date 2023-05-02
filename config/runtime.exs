import Config

# config/runtime.exs is executed for all environments, including
# during releases. It is executed after compilation and before the
# system starts, so it is typically used to load production configuration
# and secrets from environment variables or elsewhere. Do not define
# any compile-time configuration in here, as it won't be applied.
# The block below contains prod specific runtime configuration.

# Start the phoenix server if environment is set and running in a release
if System.get_env("PHX_SERVER") && System.get_env("RELEASE_NAME") do
  config :dash, DashWeb.Endpoint, server: true
end

database_hostname = System.get_env("DB_HOSTNAME", "localhost")
starter_plan_enabled? = System.get_env("ENABLE_STARTER_PLAN") === "enabled"

# TODO DO NOT MERGE IWTH THIS TRUE
# config :dash, :starter_plan_enabled?, starter_plan_enabled?
config :dash, :starter_plan_enabled?, true

case config_env() do
  :dev ->
    config :dash, Dash.Repo, hostname: database_hostname

  :test ->
    config :dash, Dash.Repo, hostname: database_hostname

  :prod ->
    database_url =
      System.get_env("DATABASE_URL") ||
        raise """
        environment variable DATABASE_URL is missing.
        For example: ecto://USER:PASS@HOST/DATABASE
        """

    maybe_ipv6 = if System.get_env("ECTO_IPV6"), do: [:inet6], else: []

    config :dash, Dash.Repo,
      # ssl: true,
      url: database_url,
      pool_size: String.to_integer(System.get_env("POOL_SIZE") || "10"),
      socket_options: maybe_ipv6

    # For sending requests to deployed hub reticulum nodes
    config :dash, Dash.RetClient, dashboard_ret_access_key: System.get_env("DASHBOARD_ACCESS_KEY")

    # Credentials for site-wide basic auth
    config :dash, DashWeb.Plugs.BasicAuth,
      username: System.get_env("BASIC_AUTH_USERNAME"),
      password: System.get_env("BASIC_AUTH_PASSWORD")

    config :dash, DashWeb.Endpoint,
      cors_origins: (System.get_env("CORS_ORIGINS") || "") |> String.split(",")

    config :dash, DashWeb.Plugs.FxaEventsParser,
      fxa_jwk_string:
        System.get_env("FXA_JWK_STRING") ||
          raise("""
          Environment variable FXA_JWK_STRING is missing. Used in FxA webhook event JWT authentication.
          """)

    # The secret key base is used to sign/encrypt cookies and other secrets.
    # A default value is used in config/dev.exs and config/test.exs but you
    # want to use a different value for prod and you most likely don't want
    # to check this value into version control, so we use an environment
    # variable instead.
    secret_key_base =
      System.get_env("SECRET_KEY_BASE") ||
        raise """
        environment variable SECRET_KEY_BASE is missing.
        You can generate one by calling: mix phx.gen.secret
        """

    host = System.get_env("PHX_HOST") || "example.com"
    port = String.to_integer(System.get_env("PORT") || "4000")

    config :dash, Dash.AppConfig,
      host: host,
      auth_server: System.get_env("AUTH_SERVER"),
      fxa_server: System.get_env("FXA_SERVER")

    config :dash, DashWeb.Endpoint,
      url: [host: host, port: 443],
      http: [
        # Enable IPv6 and bind on all interfaces.
        # Set it to  {0, 0, 0, 0, 0, 0, 0, 1} for local network only access.
        # See the documentation on https://hexdocs.pm/plug_cowboy/Plug.Cowboy.html
        # for details about using IPv6 vs IPv4 and loopback vs public addresses.
        ip: {0, 0, 0, 0, 0, 0, 0, 0},
        port: port
      ],
      secret_key_base: secret_key_base

    # Public key for JWT auth
    config :dash, DashWeb.Plugs.Auth,
      cookie_secure: true,
      auth_pub_key:
        System.get_env("AUTH_PUBLIC_KEY") ||
          raise("""
          Environment variable AUTH_PUBLIC_KEY is missing. Used in JWT authentication.
          """)

    config :dash, Dash,
      plans: System.fetch_env!("PLANS"),
      subdomain_wait_time: 15000

    # ## Using releases
    #
    # If you are doing OTP releases, you need to instruct Phoenix
    # to start each relevant endpoint:
    #
    #     config :dash, DashWeb.Endpoint, server: true
    #
    # Then you can assemble a release by calling `mix release`.
    # See `mix help release` for more information.

    # ## Configuring the mailer
    #
    # In production you need to configure the mailer to use a different adapter.
    # Also, you may need to configure the Swoosh API client of your choice if you
    # are not using SMTP. Here is an example of the configuration:
    #
    #     config :dash, Dash.Mailer,
    #       adapter: Swoosh.Adapters.Mailgun,
    #       api_key: System.get_env("MAILGUN_API_KEY"),
    #       domain: System.get_env("MAILGUN_DOMAIN")
    #
    # For this example you need include a HTTP client required by Swoosh API client.
    # Swoosh supports Hackney and Finch out of the box:
    #
    #     config :swoosh, :api_client, Swoosh.ApiClient.Hackney
    #
    # See https://hexdocs.pm/swoosh/Swoosh.html#module-installation for details.
end
