defmodule PrtlWeb.Api.V1.HubController do
  use PrtlWeb, :controller

  def action(conn, _) do
    args = [conn, conn.params, conn.assigns[:account]]
    apply(__MODULE__, action_name(conn), args)
  end

  def show(conn, %{"id" => hub_id}, account) do
    hub = Prtl.Hub.get_hub(hub_id, account)

    conn |> render("show.json", hub: hub)
  end

  def index(conn, %{"fxa_uid" => fxa_uid}, _account) do
    account = Prtl.Account.account_for_fxa_uid(fxa_uid)

    hubs = Prtl.Hub.hubs_for_account(account)
    conn |> render("index.json", hubs: hubs)
  end

  # All hubs for 1 account
  def index(conn, %{}, account) do
    hubs = Prtl.Hub.hubs_for_account(account)
    conn |> render("index.json", hubs: hubs)
  end

  # Create free hub with defaults
  def create(conn, _, account) do
    fxa_email = conn.assigns[:fxa_email]
    new_hub = Prtl.Hub.create_default_free_hub(account, fxa_email)

    conn |> render("create.json", hub: new_hub)
  end

  def delete(conn, %{"id" => hub_id}, account) do
    deleted_hub = Prtl.Hub.delete_hub(hub_id, account)

    IO.inspect(["deleted hub", deleted_hub])

    conn |> render("delete.json", deleted_hub: deleted_hub)
  end
end
