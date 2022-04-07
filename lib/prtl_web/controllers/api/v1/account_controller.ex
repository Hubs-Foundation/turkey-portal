defmodule PrtlWeb.Api.V1.AccountController do
  use PrtlWeb, :controller

  def index(conn, _) do
    conn |> render("index.json", account: conn.private[:account])
  end
end
