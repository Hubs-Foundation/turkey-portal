defmodule PrtlWeb.Api.V1.LogoutController do
  use PrtlWeb, :controller

  def index(conn, _) do
    conn |> delete_resp_cookie(PrtlWeb.Plugs.Auth.get_cookie_name()) |> redirect(to: "/")
  end
end
