defmodule DashWeb.Api.V1.AccountController do
  use DashWeb, :controller

  def index(conn, _) do
    # has_hubs allows the frontend to distinguish between the first login,
    # where we need to build the users's first hub, and subsequent logins,
    # where the user's hub is available, but is yet to be loaded in the frontend.
    # has_creating_hubs allows the frontend to distinguish between whether to show building hub view
    has_hubs = Dash.Hub.has_hubs(conn.assigns[:account])
    has_creating_hubs = Dash.Hub.has_creating_hubs(conn.assigns[:account])
    fxa_account_info = conn.assigns[:fxa_account_info]
    is_forbidden = Dash.ApprovedEmail.is_forbidden(fxa_account_info.fxa_email)
    has_subscription? = fxa_account_info.has_subscription?

    conn
    |> render(
      "index.json",
      fxa_account_info: fxa_account_info,
      has_hubs: has_hubs,
      has_creating_hubs: has_creating_hubs,
      is_forbidden: is_forbidden,
      has_subscription?: has_subscription?
    )
  end
end
