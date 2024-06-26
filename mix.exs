defmodule Dash.MixProject do
  use Mix.Project

  def project do
    [
      app: :dash,
      version: "0.1.0",
      elixir: "~> 1.14",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Dash.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  defp deps do
    [
      {:cors_plug, "~> 3.0"},
      {:ecto_boot_migration, "~> 0.3.0"},
      {:ecto_sql, "~> 3.10"},
      {:gettext, "~> 0.20"},
      {:hackney, "~> 1.18"},
      {:httpoison, "~> 2.1"},
      {:jason, "~> 1.2"},
      {:jose, "~> 1.11"},
      {:mimzy, "~> 2.1"},
      {:mox, "~> 1.0", only: :test},
      {:phoenix, "~> 1.7.7"},
      {:phoenix_ecto, "~> 4.4"},
      {:phoenix_live_dashboard, "~> 0.8.0"},
      {:plug_cowboy, "~> 2.5"},
      {:poison, "~> 5.0"},
      {:postgrex, ">= 0.0.0"},
      {:quantum, "~> 3.5.0"},
      {:ranch, ">= 0.0.0", manager: :rebar3, override: true},
      {:retry, "~> 0.18"},
      {:sentry, "~> 8.1"},
      {:telemetry_metrics, "~> 0.6"},
      {:telemetry_poller, "~> 1.0"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup"],
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"]
    ]
  end
end
