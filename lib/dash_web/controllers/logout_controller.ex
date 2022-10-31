defmodule DashWeb.LogoutController do
  use DashWeb, :controller

  def index(conn, _) do
    conn
    |> remove_cookies()
    |> redirect(to: "/")
  end

  def remove_cookies(conn) do
    delete_resp_cookie(conn, DashWeb.Plugs.Auth.get_cookie_name(), domain: cluster_domain(conn))
  end

  def cluster_domain(conn),
    do: conn.host
end
