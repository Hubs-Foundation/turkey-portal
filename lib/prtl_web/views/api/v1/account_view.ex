defmodule PrtlWeb.Api.V1.AccountView do
  use PrtlWeb, :view

  def render("index.json", nil), do: nil
  def render("index.json", %Prtl.FxaAccountInfo{} = fxa_account_info) do
    %{
      fxa_displayName: fxa_account_info.fxa_displayName,
      fxa_pic: fxa_account_info.fxa_pic,
      fxa_email: fxa_account_info.fxa_email
    }
  end

end
