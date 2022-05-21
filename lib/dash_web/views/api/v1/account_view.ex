defmodule DashWeb.Api.V1.AccountView do
  use DashWeb, :view

  def render("index.json", nil), do: nil

  def render("index.json", %{
        fxa_account_info: %Dash.FxaAccountInfo{} = fxa_account_info,
        has_hubs: has_hubs
      }) do
    %{
      displayName: fxa_account_info.fxa_display_name,
      profilePic: fxa_account_info.fxa_pic,
      email: fxa_account_info.fxa_email,
      hasHubs: has_hubs
    }
  end
end
