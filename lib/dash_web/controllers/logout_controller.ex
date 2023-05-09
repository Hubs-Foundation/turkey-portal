defmodule DashWeb.LogoutController do
  use DashWeb, :controller

  alias DashWeb.Plugs

  def index(conn, _) do
    conn
    |> delete_resp_cookie(Plugs.Auth.get_cookie_name(), domain: Plugs.Auth.cluster_domain(conn))
    |> redirect(to: "/")
  end
end
