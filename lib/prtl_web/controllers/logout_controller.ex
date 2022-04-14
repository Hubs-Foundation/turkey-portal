defmodule PrtlWeb.LogoutController do
  use PrtlWeb, :controller

  def index(conn, _) do
    conn |> delete_resp_cookie(PrtlWeb.Plugs.Auth.get_cookie_name(), domain: get_cookie_domain(conn.host)) |> redirect(to: "/")
  end

  defp get_cookie_domain("localhost"), do: ""
  defp get_cookie_domain(_), do: ".myhubs.net"
end
