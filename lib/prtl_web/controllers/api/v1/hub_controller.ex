defmodule PrtlWeb.Api.V1.HubController do
  use PrtlWeb, :controller

  def index(conn, %{"fxa_uid" => fxa_uid}) do
    account = Prtl.Account.account_for_fxa_uid(fxa_uid)

    hubs = Prtl.Hub.hubs_for_account(account)
    conn |> render("index.json", hubs: hubs)
  end
end
