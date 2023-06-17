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
    %{success: true, deletedHub: render_hub(hub)}
  end

  defp render_hub(hub) do
    # Returns usage stats if included in hubs keys
    maybe_include_usage_stats =
      case hub do
        %{current_ccu: ccu, current_storage_mb: storage} ->
          %{currentCcu: ccu, currentStorageMb: storage}

        _ ->
          %{}
      end

    %{
      hubId: hub.hub_id |> to_string,
      name: hub.name,
      ccuLimit: hub.ccu_limit,
      storageLimitMb: hub.storage_limit_mb,
      tier: hub.tier,
      subdomain: hub.subdomain,
      domain: hub.domain,
      region: hub.region,
      status: hub.status
    }
    |> Map.merge(maybe_include_usage_stats)
  end
end
