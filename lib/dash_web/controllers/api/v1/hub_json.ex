defmodule DashWeb.Api.V1.HubJSON do
  def create(%{hub: hub}),
    do: render_hub(hub)

  def delete(%{deleted_hub: nil}),
    do: %{success: false, deleted_hub: nil}

  def delete(%{deleted_hub: deleted_hub}),
    do: %{success: true, deletedHub: render_hub(deleted_hub)}

  def index(%{hubs: maps}) do
    for map <- maps do
      %{
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
  end

  def show(%{hub: nil}),
    do: nil

  def show(%{hub: hub}),
    do: render_hub(hub)

  ## Helpers

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
end
