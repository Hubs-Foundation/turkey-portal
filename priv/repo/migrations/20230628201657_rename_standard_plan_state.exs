defmodule Dash.Repo.Migrations.RenameStandardPlanState do
  use Ecto.Migration

  def change do
    execute "ALTER TYPE plan_state RENAME VALUE 'standard' TO 'personal'",
            "ALTER TYPE plan_state RENAME VALUE 'personal' TO 'standard'"
  end
end
