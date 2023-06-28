defmodule Dash.Repo.Migrations.ReducePersonalPlanHubCcuLimits do
  use Ecto.Migration

  alias Dash.Repo
  import Ecto.Query, only: [from: 2]

  def up,
    do: put_personal_plan_hub_ccu_limit(20)

  def down,
    do: put_personal_plan_hub_ccu_limit(25)

  ## Helpers

  @spec hub(pos_integer) :: Ecto.Query.t()
  defp hub(hub_id) when is_integer(hub_id) and hub_id > 0 do
    from h in "hubs", where: h.hub_id == ^hub_id
  end

  @spec personal_hubs :: Ecto.Query.t()
  defp personal_hubs do
    from d in "hub_deployments",
      join: h in "hubs",
      on: d.hub_id == h.hub_id,
      join: p in "plans",
      on: p.account_id == h.account_id,
      join: t in "plan_transitions",
      on: t.plan_id == p.plan_id,
      where:
        t.plan_transition_id in subquery(
          from t in "plan_transitions",
            distinct: t.plan_id,
            order_by: [desc: t.transitioned_at],
            select: t.plan_transition_id
        ),
      where: t.new_state == "personal",
      select: %{domain: d.domain, hub_id: h.hub_id}
  end

  @spec put_personal_plan_hub_ccu_limit(pos_integer) :: :ok
  defp put_personal_plan_hub_ccu_limit(ccu_limit) do
    http_client = :hackney

    for %{domain: domain, hub_id: hub_id} <- Repo.all(personal_hubs()) do
      {:ok, 200, _, _} =
        http_client.patch(
          "https://turkeyorch:889/hc_instance",
          [],
          Jason.encode!(%{
            ccu_limit: Integer.to_string(ccu_limit),
            domain: domain,
            hub_id: Integer.to_string(hub_id),
            storage_limit: "1.953125",
            tier: "p1"
          }),
          [:insecure]
        )

      {1, _} =
        hub_id
        |> hub()
        |> Repo.update_all(set: [ccu_limit: ccu_limit, updated_at: DateTime.utc_now()])
    end

    :ok
  end
end
