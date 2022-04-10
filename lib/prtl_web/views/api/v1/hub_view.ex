defmodule PrtlWeb.Api.V1.HubView do
  use PrtlWeb, :view

  def render("index.json", %{hubs: hubs}) do
    hubs |> Enum.map(&render_hub/1)
  end

  def render("create.json", %{hub: hub}) do
    hub |> render_hub()
  end

  defp render_hub(hub) do
    %{
      hub_id: hub.hub_id,
      name: hub.name,
      ccu_limit: hub.ccu_limit,
      storage_limit_mb: hub.storage_limit_mb,
      tier: hub.tier,
      subdomain: hub.subdomain,
      status: hub.status
    }
  end
end
