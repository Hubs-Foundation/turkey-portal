defmodule DashWeb.Api.V1.AccountController do
  use DashWeb, :controller

  def show(conn, _) do
    # has_hubs allows the frontend to distinguish between the first login,
    # where we need to build the users's first hub, and subsequent logins,
    # where the user's hub is available, but is yet to be loaded in the frontend.
    # has_creating_hubs allows the frontend to distinguish between whether to show building hub view
    %{account: account, fxa_account_info: fxa_account_info} = conn.assigns

    {active_plan?, active_subscription?, plan_name} =
      case Dash.fetch_active_plan(account) do
        {:ok, %Dash.Plan{name: name, subscription?: active_subscription?}} ->
          {true, active_subscription?, name}

        {:ok, %Dash.Capability{is_active: true}} ->
          {true, true, "standard"}

        {:error, :no_active_plan} ->
          {false, false, nil}
      end

    render(conn, "show.json",
      active_plan?: active_plan?,
      active_subscription?: active_subscription?,
      creating_hubs?: Dash.Hub.has_creating_hubs(account),
      forbidden?: Dash.ApprovedEmail.is_forbidden(fxa_account_info.fxa_email),
      fxa_account_info: fxa_account_info,
      hubs?: Dash.Hub.has_hubs(account),
      plan_name: plan_name
    )
  end
end
