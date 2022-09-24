defmodule DashWeb.Api.V1.AccountView do
  use DashWeb, :view

  def render("index.json", nil), do: nil

  def render("index.json", %{
        fxa_account_info: %Dash.FxaAccountInfo{} = fxa_account_info,
        has_hubs: has_hubs,
        has_creating_hubs: has_creating_hubs,
        is_forbidden: is_forbidden,
        has_subscription: has_subscription
      }) do
    %{
      displayName: fxa_account_info.fxa_display_name,
      profilePic: fxa_account_info.fxa_pic,
      email: fxa_account_info.fxa_email,
      hasHubs: has_hubs,
      hasCreatingHubs: has_creating_hubs,
      isForbidden: is_forbidden,
      hasSubscription: has_subscription
    }
  end
end
