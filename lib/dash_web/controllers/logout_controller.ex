defmodule DashWeb.LogoutController do
  use DashWeb, :controller

  @dev_cluster_auth_cookie_name "_turkeyauthcookie"

  def index(conn, _) do
    conn
    |> remove_cookies()
    |> redirect(to: "/")
  end

  def remove_cookies(conn) do
    cluster_domain = ".#{conn.host |> String.split(".") |> Enum.take(-2) |> Enum.join(".")}"

    conn
    |> delete_resp_cookie(DashWeb.Plugs.Auth.get_cookie_name(), domain: cluster_domain)
    # This cookie is only used on our dev/staging environments. It should not exist on production environments.
    |> delete_resp_cookie(@dev_cluster_auth_cookie_name, domain: cluster_domain)
  end
end
