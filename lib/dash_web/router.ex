defmodule DashWeb.Router do
  use DashWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug DashWeb.ContentTypeRestriction, ["application/json"]
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

  scope "/api/v1", DashWeb do
    resources "/region", Api.V1.RegionController, only: [:show], singleton: true
  end

  scope "/api/v1", DashWeb do
    pipe_through :basic_auth
    resources "/logout", LogoutController, only: [:index]
  end

  scope "/api/v1", DashWeb do
    pipe_through [:api, :basic_auth, :jwt_authenticated]

    resources "/account", Api.V1.AccountController, only: [:show], singleton: true
    resources "/plans", Api.V1.PlanController, only: [:create]
    resources "/subscription", Api.V1.SubscriptionController, only: [:show], singleton: true
    resources "/analytics", Api.V1.AnalyticsController, only: [:show], singleton: true
  end

  scope "/api/v1", DashWeb do
    pipe_through [:api, :basic_auth, :jwt_authenticated, :approved_email_auth]

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
    resources "/events/fxa", Api.V1.FxaEventsController, only: [:create]
  end

  # Enable LiveDashboard in development
  if Application.compile_env(:dash, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: DashWeb.Telemetry
    end
  end
end
