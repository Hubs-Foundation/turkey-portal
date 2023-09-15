defmodule Dash.Repo.Migrations.RenameProPlanState do
  use Ecto.Migration

  def change do
    execute "ALTER TYPE plan_state RENAME VALUE 'pro' TO 'professional'",
            "ALTER TYPE plan_state RENAME VALUE 'professional' TO 'pro'"
  end
end
