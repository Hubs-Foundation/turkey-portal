defmodule Dash.PlanStateMachine.PlanTransition do
  @moduledoc """
  A PlanTransition struct.

  The PlanTransition acts both as an entry in an audit log and an event in a
  plan state event source.
  """
  use Ecto.Schema

  alias Dash.Plan

  @primary_key {:plan_transition_id, :id, autogenerate: true}
  schema "plan_transitions" do
    field :event, :string
    field :new_state, Ecto.Enum, values: [:stopped, :starter, :personal, :professional]
    field :transitioned_at, :utc_datetime_usec

    belongs_to :plan, Plan, references: :plan_id

    timestamps()
  end
end
