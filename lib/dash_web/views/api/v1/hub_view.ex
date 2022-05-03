defmodule DashWeb.Api.V1.HubView do
  use DashWeb, :view

  def render("index.json", %{hubs: hubs}) do
    hubs |> Enum.map(&render_hub/1)
  end

  def render("show.json", %{hub: nil}), do: nil

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
    %{success: true, deleted_hub: render_hub(hub)}
  end

  defp render_hub(hub) do
    %{
      hub_id: hub.hub_id |> to_string,
      name: hub.name,
      ccu_limit: hub.ccu_limit,
      storage_limit_mb: hub.storage_limit_mb,
      tier: hub.tier,
      subdomain: hub.subdomain,
      status: hub.status
    }
  end
end
