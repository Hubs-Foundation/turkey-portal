defmodule DashWeb.Api.V1.AccountJSON do
  def show(%{
        active_plan?: active_plan?,
        active_subscription?: active_subscription?,
        creating_hubs?: creating_hubs?,
        forbidden?: forbidden?,
        fxa_account_info: %Dash.FxaAccountInfo{} = fxa_account_info,
        hubs?: hubs?,
        plan_name: plan_name
      }) do
    %{
      displayName: fxa_account_info.fxa_display_name,
      email: fxa_account_info.fxa_email,
      hasCreatingHubs: creating_hubs?,
      hasHubs: hubs?,
      hasPlan: active_plan?,
      hasSubscription: active_subscription?,
      isForbidden: forbidden?,
      planName: plan_name,
      profilePic: fxa_account_info.fxa_pic
    }
  end
end
