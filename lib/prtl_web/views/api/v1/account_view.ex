defmodule PrtlWeb.Api.V1.AccountView do
  use PrtlWeb, :view

  def render("index.json", %{account: account}) do
    %{
      id: account.account_id |> to_string,
      fxa_uid: account.fxa_uid
    }
  end
end
