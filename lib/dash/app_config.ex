defmodule Dash.AppConfig do
  @moduledoc "Provides configuration values to the app, and to the frontend code via index.html.heex"

  def to_json() do
    Jason.encode!(%{
      CLUSTER: cluster()
    })
  end

  def cluster() do
    Application.get_env(:dash, __MODULE__)[:host]
    |> String.split(".")
    |> Enum.drop(1)
    |> Enum.join(".")
  end
end
