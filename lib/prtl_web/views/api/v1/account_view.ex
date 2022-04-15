defmodule PrtlWeb.Api.V1.AccountView do
  use PrtlWeb, :view

  def render("index.json", nil), do: nil

  def render("index.json", %{fxa_account_info: %Prtl.FxaAccountInfo{} = fxa_account_info}) do
    %{
      displayName: fxa_account_info.fxa_display_name,
      profilePic: fxa_account_info.fxa_pic,
      email: fxa_account_info.fxa_email
    }
  end
end
