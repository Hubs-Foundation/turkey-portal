defmodule Dash.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    Logger.add_backend(Sentry.LoggerBackend)
    {:ok, _} = EctoBootMigration.migrate(:dash)

    children = [
      # Start the Ecto repository
      Dash.Repo,
      # Start the Telemetry supervisor
      DashWeb.Telemetry,
      # Supervisor for async tasks
      {Task.Supervisor, name: Dash.TaskSupervisor},
      # Start the PubSub system
      {Phoenix.PubSub, name: Dash.PubSub},
      # Start the Endpoint (http/https)
      DashWeb.Endpoint,
      # Start a worker by calling: Dash.Worker.start_link(arg)
      # {Dash.Worker, arg}
      Dash.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Dash.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    DashWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
