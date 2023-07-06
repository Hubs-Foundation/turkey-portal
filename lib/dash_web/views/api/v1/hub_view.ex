defmodule DashWeb.Api.V1.HubView do
  use DashWeb, :view

  def render("index.json", %{hubs: hubs}),
    do: Enum.map(hubs, &render_hub_with_usage_stats/1)

  def render("show.json", %{hub: nil}),
    do: nil

  def render("show.json", %{hub: hub}) do
    hub |> render_hub()
  end

  def render("create.json", %{hub: hub}) do
    hub |> render_hub()
  end

  def render("delete.json", %{deleted_hub: nil}), do: %{success: false, deleted_hub: nil}

  def render("delete.json", %{deleted_hub: deleted_hub}) do
    deleted_hub |> render_deleted_hub()
  end

  defp render_deleted_hub(hub) do
    %{success: true, deletedHub: render_hub(hub)}
  end

  defp render_hub(%Dash.Hub{} = hub),
    do: %{
      ccuLimit: hub.ccu_limit,
      domain: hub.deployment.domain,
      hubId: Integer.to_string(hub.hub_id),
      status: hub.status,
      storageLimitMb: hub.storage_limit_mb,
      subdomain: hub.subdomain,
      tier: hub.tier
    }

  defp render_hub_with_usage_stats(map) when is_map(map),
    do: %{
      ccuLimit: map.ccu_limit,
      domain: map.deployment.domain,
      currentCcu: map.current_ccu,
      currentStorageMb: map.current_storage_mb,
      hubId: Integer.to_string(map.hub_id),
      status: map.status,
      storageLimitMb: map.storage_limit_mb,
      subdomain: map.subdomain,
      tier: map.tier
    }
end
