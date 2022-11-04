defmodule DashWeb.Api.V1.SubscriptionController do
  use DashWeb, :controller

  def show(conn, _) do
    %Dash.FxaSubscription{
      fxa_cancel_at_period_end: fxa_cancel_at_period_end,
      fxa_current_period_end: fxa_current_period_end,
      fxa_plan_id: fxa_plan_id
    } = conn.assigns.fxa_subscription

    {currency, amount} = Dash.currency_and_amount_for_plan(fxa_plan_id)

    json(conn, %{
      subscriptionEndTimestampS: fxa_current_period_end,
      currency: currency,
      amount: amount,
      isCancelled: fxa_cancel_at_period_end
    })
  end
end
