defmodule Prtl.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    {:ok, _} = EctoBootMigration.migrate(:prtl)

    children = [
      # Start the Ecto repository
      Prtl.Repo,
      # Start the Telemetry supervisor
      PrtlWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Prtl.PubSub},
      # Start the Endpoint (http/https)
      PrtlWeb.Endpoint
      # Start a worker by calling: Prtl.Worker.start_link(arg)
      # {Prtl.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Prtl.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    PrtlWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
