defmodule Dash.PlanStateMachine.Plan do
  @moduledoc """
  A Plan struct.

  The Plan gives a user their own hub.
  """
  use Ecto.Schema

  alias Dash.Account

  @primary_key {:plan_id, :id, autogenerate: true}
  schema "plans" do
    belongs_to :account, Account, references: :account_id

    timestamps()
  end
end
