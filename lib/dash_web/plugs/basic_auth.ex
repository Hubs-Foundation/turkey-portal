defmodule DashWeb.Plugs.BasicAuth do
  @moduledoc """
  A basic auth plug that we use to gate initial access to the entire dashboard.
  """
  def init(default), do: default

  def call(conn, _options) do
    # Default to enabled, unless the config is explicitly set to false.
    basic_auth_enabled = Application.get_env(:dash, __MODULE__)[:enabled] !== false

    if basic_auth_enabled do
      perform_basic_auth(conn)
    else
      conn
    end
  end

  defp perform_basic_auth(conn) do
    expected_username = Application.get_env(:dash, __MODULE__)[:username] || ""
    expected_password = Application.get_env(:dash, __MODULE__)[:password]
    Plug.BasicAuth.basic_auth(conn, username: expected_username, password: expected_password)
  end
end
