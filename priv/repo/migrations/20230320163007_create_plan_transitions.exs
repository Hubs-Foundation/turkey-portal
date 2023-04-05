defmodule Dash.Repo.Migrations.CreatePlanTransitions do
  use Ecto.Migration

  def change do
    execute "CREATE TYPE plan_state AS ENUM ('stopped', 'starter', 'standard', 'pro')",
            "DROP TYPE plan_state"

    create table("plan_transitions", primary_key: false) do
      add :plan_transition_id, :bigint, default: fragment("next_id()"), primary_key: true
      add :event, :string, null: false
      add :new_state, :plan_state, null: false
      add :transitioned_at, :naive_datetime_usec, null: false
      add :plan_id, references("plans", column: :plan_id, on_delete: :delete_all), null: false

      timestamps()
    end

    create index("plan_transitions", [:plan_id])
  end
end
