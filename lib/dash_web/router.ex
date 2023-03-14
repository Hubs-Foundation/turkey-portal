defmodule DashWeb.Router do
  use DashWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :put_root_layout, {DashWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug DashWeb.Plugs.Auth
  end

  pipeline :fxa_events_parser do
    plug DashWeb.Plugs.FxaEventsParser
  end

  pipeline :basic_auth do
    plug DashWeb.Plugs.BasicAuth
  end

  pipeline :approved_email_auth do
    plug DashWeb.Plugs.ApprovedEmailAuth
  end

  scope "/", DashWeb do
    pipe_through [:basic_auth, :browser]

    get "/", PageController, :index
    get "/hubs/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", DashWeb do
  #   pipe_through :api
  # end

  scope "/api/v1", DashWeb do
    resources "/region", Api.V1.RegionController, only: [:show], singleton: true
  end

  scope "/api/v1", DashWeb do
    pipe_through :basic_auth
    resources "/logout", LogoutController, [:index]
  end

  scope "/api/v1", DashWeb do
    pipe_through [:basic_auth, :jwt_authenticated]

    resources "/account", Api.V1.AccountController, [:index]
    resources "/subscription", Api.V1.SubscriptionController, only: [:show], singleton: true
    resources "/plans", Api.V1.PlansController, [:create]
  end

  scope "/api/v1", DashWeb do
    pipe_through [:basic_auth, :jwt_authenticated, :approved_email_auth]

    resources "/hubs",
              Api.V1.HubController,
              Dash.FeatureFlags.actions_for_flags(
                always: [:index, :show, :update],
                flags: [create_hubs: :create, delete_hubs: :delete]
              )

    post "/hubs/validate_subdomain", Api.V1.HubController, :validate_subdomain
  end

  scope "/api/v1", DashWeb do
    pipe_through :fxa_events_parser
    # TODO decode JWT tokens from FxA with a new plug
    resources "/events/fxa", Api.V1.FxaEventsController, [:create]
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: DashWeb.Telemetry
    end
  end

  # Enables the Swoosh mailbox preview in development.
  #
  # Note that preview only shows emails that were sent by the same
  # node running the Phoenix server.
  if Mix.env() == :dev do
    scope "/dev" do
      pipe_through :browser

      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end

  scope "/", DashWeb do
    pipe_through [:basic_auth, :browser]
    get "/*path", PageController, :not_found
  end
end
