defmodule Dash.Repo.Migrations.CreatePlanTransitionLocks do
  use Ecto.Migration

  def change do
    execute """
            CREATE VIEW plan_transition_locks AS
            SELECT account_id
            FROM accounts
            """,
            """
            DROP VIEW plan_transition_locks
            """
  end
end
