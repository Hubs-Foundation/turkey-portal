defmodule PrtlWeb.LogoutController do
  use PrtlWeb, :controller

  # TODO remove variable and delete_resp_cookie line after MVP1 auth server
  @temp_auth_cookie_name "_turkeyauthcookie"

  def index(conn, _) do
    conn
    |> delete_resp_cookie(PrtlWeb.Plugs.Auth.get_cookie_name(),
      domain: ".#{conn.host |> String.split(".") |> Enum.take(-2) |> Enum.join(".")}"
    )
    |> delete_resp_cookie(@temp_auth_cookie_name,
      domain: ".#{conn.host |> String.split(".") |> Enum.take(-2) |> Enum.join(".")}"
    )
    |> redirect(to: "/")
  end
end
