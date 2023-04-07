defmodule Dash.PlanStateMachine.Plan do
  @moduledoc """
  A Plan struct.

  The Plan gives a user their own hub.
  """
  use Ecto.Schema

  @primary_key {:plan_id, :id, autogenerate: true}
  schema "plans" do
    field :account_id, :id

    timestamps()
  end
end
