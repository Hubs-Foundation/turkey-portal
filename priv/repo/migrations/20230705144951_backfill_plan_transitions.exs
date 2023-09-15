defmodule Dash.Repo.Migrations.BackfillPlanTransitions do
  use Ecto.Migration

  alias Dash.Repo
  import Ecto.Query

  def up do
    inserted_at = DateTime.utc_now()

    for {account_id, subscribed_at} <-
          Repo.all(
            from a in "accounts",
              inner_join: c in "capabilities",
              on: c.account_id == a.account_id,
              left_join: p in "plans",
              on: p.account_id == a.account_id,
              where: c.capability == "managed-hubs",
              where: c.is_active,
              where: is_nil(p),
              select: {c.account_id, c.change_time}
          ) do
      {1, [%{plan_id: plan_id}]} =
        Repo.insert_all(
          "plans",
          [%{account_id: account_id, inserted_at: inserted_at, updated_at: inserted_at}],
          returning: [:plan_id]
        )

      {1, _} =
        Repo.insert_all("plan_transitions", [
          %{
            event: "subscribe_personal",
            new_state: "personal",
            plan_id: plan_id,
            transitioned_at: subscribed_at,
            inserted_at: inserted_at,
            updated_at: inserted_at
          }
        ])
    end
  end

  def down do
  end
end
