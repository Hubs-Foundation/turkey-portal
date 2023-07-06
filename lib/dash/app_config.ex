defmodule Dash.AppConfig do
  @moduledoc "Provides configuration values to the app, and to the frontend code via index.html.heex"

  def to_json() do
    Jason.encode!(%{
      AUTH_SERVER: auth_server(),
      FXA_SERVER: fxa_server()
    })
  end

  def cluster_domain() do
    Application.get_env(:dash, __MODULE__)[:host]
    |> String.split(".")
    |> Enum.drop(1)
    |> Enum.join(".")
  end

  def auth_server do
    Application.get_env(:dash, __MODULE__)[:auth_server]
  end

  def fxa_server do
    Application.get_env(:dash, __MODULE__)[:fxa_server]
  end
end
