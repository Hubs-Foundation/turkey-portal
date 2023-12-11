defmodule DashWeb.Api.V1.AnalyticsJSON do
  def show(%{hubs: hubs}) do
    list =
      for h <- hubs do
        %{
          hubId: Integer.to_string(h.hub_id),
          tier: h.tier
        }
      end

    %{hubs: list}
  end
end
