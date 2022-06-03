defmodule Dash.OrchClient do
  @moduledoc """
  Orchestrator manages hub instances and their infrastructure.
  This module handles requests to Orchestrator to make changes to create/update specific hub instances.
  """

  def create_hub(fxa_email, %Dash.Hub{} = hub) do
    orch_hub_create_params = %{
      useremail: fxa_email,
      hub_id: hub.hub_id |> to_string(),
      subdomain: hub.subdomain,
      tier: hub.tier,
      ccu_limit: hub.ccu_limit |> to_string(),
      storage_limit: (hub.storage_limit_mb / 1024) |> to_string()
    }

    resp =
      get_http_client().post(
        "http://#{get_orch_host()}/hc_instance",
        Jason.encode!(orch_hub_create_params)
      )

    IO.inspect(resp)
  end

  def update_subdomain(%Dash.Hub{} = hub) do
    get_http_client().patch(
      "http://#{get_orch_host()}/hc_instance/#{hub.hub_id}",
      Jason.encode!(%{subdomain: hub.subdomain})
    )
  end

  defp get_http_client() do
    # Make the http client module configurable so that we can mock it out in tests.
    Application.get_env(:dash, Dash.Hub)[:http_client] || HTTPoison
  end

  defp get_orch_host() do
    Application.get_env(:dash, Dash.OrchClient)[:orch_host]
  end
end
