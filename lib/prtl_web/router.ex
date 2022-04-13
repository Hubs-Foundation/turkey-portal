defmodule PrtlWeb.Router do
  use PrtlWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :put_root_layout, {PrtlWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :jwt_authenticated do
    plug PrtlWeb.Plugs.Auth
  end

  scope "/", PrtlWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/hubs/*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", PrtlWeb do
  #   pipe_through :api
  # end

  scope "/api/v1", PrtlWeb do
    resources("/logout", Api.V1.LogoutController, [:index])
  end

  scope "/api/v1", PrtlWeb do
    pipe_through :jwt_authenticated

    resources("/account", Api.V1.AccountController, [:index])
    resources("/hubs", Api.V1.HubController, [:index, :create, :delete])
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

      live_dashboard "/dashboard", metrics: PrtlWeb.Telemetry
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

  scope "/", PrtlWeb do
    pipe_through :browser
    get "/*path", PageController, :not_found
  end
end
