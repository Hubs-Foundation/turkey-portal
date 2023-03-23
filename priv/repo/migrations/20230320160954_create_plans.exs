defmodule Dash.Repo.Migrations.CreatePlans do
  use Ecto.Migration

  def change do
    create table("plans", primary_key: false) do
      add :plan_id, :bigint, default: fragment("next_id()"), primary_key: true

      add :account_id, references("accounts", column: :account_id, on_delete: :delete_all),
        null: false

      timestamps()
    end

    create index("plans", [:account_id])
  end
end
