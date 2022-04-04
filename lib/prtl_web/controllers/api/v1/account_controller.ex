defmodule PrtlWeb.Api.V1.AccountController do
  use PrtlWeb, :controller

  # def index(conn, %{"fxa_uid" => fxa_uid}) do
  #   account = Prtl.Account.account_for_fxa_uid(fxa_uid)

  #   conn |> render("index.json", account: account)
  # end

  def index(conn, _) do
    json(conn, %{account: conn.private[:account]})
  end
end
