defmodule PrtlWeb.LogoutController do
  use PrtlWeb, :controller

  def index(conn, _) do
    conn |> delete_resp_cookie(PrtlWeb.Plugs.Auth.get_cookie_name(), domain: ".#{ conn.host |> String.split(".") |> Enum.take(-2) |> Enum.join(".") }") |> redirect(to: "/")
  end
end
