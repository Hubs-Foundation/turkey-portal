defmodule Dash.Repo.Migrations.BackfillPersonalPlanHubs do
  use Ecto.Migration

  alias Dash.Repo
  alias Dash.Repo.Migrations
  import Ecto.Query

  def up do
    for %{account_id: account_id, email: email} <- Repo.all(personal_plan_accounts_without_hubs()) do
      subdomain = Dash.Utils.rand_string(10)
      {:ok, hub_id} = insert_hub(account_id, subdomain)
      {:ok, domain} = deploy_hub(hub_id, email, subdomain)
      :ok = insert_hub_deployment(hub_id, domain)
    end
  end

  @spec deploy_hub(pos_integer, String.t(), String.t()) :: {:ok, String.t()}
  defp deploy_hub(hub_id, email, subdomain)
       when is_integer(hub_id) and is_binary(email) and is_binary(subdomain) do
    {:ok, 200, _, json} =
      http_client().post(
        "https://turkeyorch:889/hc_instance",
        [],
        Jason.encode!(%{
          ccu_limit: "20",
          disable_branding: false,
          hub_id: Integer.to_string(hub_id),
          region: "us",
          storage_limit: "1.953125",
          subdomain: subdomain,
          tier: "p1",
          useremail: email
        }),
        [:insecure, :with_body]
      )

    domain =
      json
      |> Jason.decode!()
      |> Map.fetch!("domain")

    {:ok, domain}
  end

  @spec http_client :: module
  defp http_client,
    do:
      :dash
      |> Application.fetch_env!(Migrations)
      |> Keyword.fetch!(:http_client)

  @spec insert_hub(pos_integer, String.t()) :: {:ok, pos_integer}
  defp insert_hub(account_id, subdomain) when is_integer(account_id) and is_binary(subdomain) do
    inserted_at = DateTime.utc_now()

    {1, [%{hub_id: hub_id}]} =
      Repo.insert_all(
        "hubs",
        [
          %{
            account_id: account_id,
            ccu_limit: 20,
            inserted_at: inserted_at,
            status: "creating",
            storage_limit_mb: 2_000,
            subdomain: subdomain,
            tier: "p1",
            updated_at: inserted_at
          }
        ],
        returning: [:hub_id]
      )

    {:ok, hub_id}
  end

  @spec insert_hub_deployment(pos_integer, String.t()) :: :ok
  defp insert_hub_deployment(hub_id, domain) when is_integer(hub_id) and is_binary(domain) do
    inserted_at = DateTime.utc_now()

    {1, _} =
      Repo.insert_all("hub_deployments", [
        %{
          domain: domain,
          hub_id: hub_id,
          inserted_at: inserted_at,
          updated_at: inserted_at
        }
      ])

    :ok
  end

  @spec personal_plan_accounts_without_hubs :: Ecto.Query.t()
  defp personal_plan_accounts_without_hubs do
    from a in "accounts",
      join: p in "plans",
      on: p.account_id == a.account_id,
      join: t in "plan_transitions",
      on: t.plan_id == p.plan_id,
      full_join: h in "hubs",
      on: h.account_id == p.account_id,
      where:
        t.plan_transition_id in subquery(
          from t in "plan_transitions",
            distinct: t.plan_id,
            order_by: [desc: t.transitioned_at],
            select: t.plan_transition_id
        ),
      where: t.new_state == "personal",
      where: is_nil(h),
      select: %{account_id: a.account_id, email: a.email}
  end

  def down do
  end
end
