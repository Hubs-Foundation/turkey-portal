defmodule DashWeb.Api.V1.AccountController do
  use DashWeb, :controller

  def show(conn, _) do
    # has_hubs allows the frontend to distinguish between the first login,
    # where we need to build the users's first hub, and subsequent logins,
    # where the user's hub is available, but is yet to be loaded in the frontend.
    # has_creating_hubs allows the frontend to distinguish between whether to show building hub view
    %{account: account, fxa_account_info: fxa_account_info} = conn.assigns

    render(conn, "show.json",
      active_plan?: Dash.active_plan?(account),
      active_subscription?: fxa_account_info.has_subscription?,
      creating_hubs?: Dash.Hub.has_creating_hubs(account),
      forbidden?: Dash.ApprovedEmail.is_forbidden(fxa_account_info.fxa_email),
      fxa_account_info: fxa_account_info,
      hubs?: Dash.Hub.has_hubs(account)
    )
  end
end
