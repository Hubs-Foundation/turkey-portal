defmodule DashWeb.Plugs.BasicAuth do
  @moduledoc """
  A basic auth plug that we use to gate initial access to the entire dashboard.
  """
  import Plug.Conn
  import Phoenix.Controller

  def init(default), do: default

  def call(conn, _options) do
    basic_auth_enabled = !Application.get_env(:dash, __MODULE__)[:disabled]

    if basic_auth_enabled do
      perform_basic_auth(conn)
    else
      conn
    end
  end

  defp perform_basic_auth(conn) do
    expected_username = Application.get_env(:dash, __MODULE__)[:username] || ""
    expected_password = Application.get_env(:dash, __MODULE__)[:password]

    conn =
      Plug.BasicAuth.basic_auth(conn, username: expected_username, password: expected_password)

    if conn.status == 401 do
      # Plug.BasicAuth.basic_auth displays a barebones 401 message.
      # We want to override that with our own styled page.
      conn
      |> put_root_layout({DashWeb.LayoutView, :root})
      |> put_layout({DashWeb.LayoutView, :app})
      |> put_view(DashWeb.PageView)
      |> render("401.html")
      |> halt()
    else
      conn
    end
  end
end
