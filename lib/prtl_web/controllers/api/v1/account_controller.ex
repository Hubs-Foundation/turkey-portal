defmodule PrtlWeb.Api.V1.AccountController do
  use PrtlWeb, :controller

  def index(conn, _) do
    conn |> render("index.json", fxa_account_info: conn.assigns[:fxa_account_info])
  end

end
