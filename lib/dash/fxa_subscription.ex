defmodule Dash.FxaSubscription do
  @enforce_keys [:fxa_cancel_at_period_end, :fxa_current_period_end, :fxa_plan_id]
  defstruct @enforce_keys
end
