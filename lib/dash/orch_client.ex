defmodule Dash.OrchClient do
  @moduledoc """
  Orchestrator manages hub instances and their infrastructure.
  This module handles requests to Orchestrator to make changes to create/update specific hub instances.
  """

  alias Dash.Hub

  defp orch_hub_endpoint() do
    "https://#{get_orch_host()}/hc_instance"
  end

  def create_hub(fxa_email, %Hub{} = hub) do
    orch_hub_create_params = %{
      useremail: fxa_email,
      hub_id: hub.hub_id |> to_string(),
      subdomain: hub.subdomain,
      tier: hub.tier,
      ccu_limit: hub.ccu_limit |> to_string(),
      storage_limit: (hub.storage_limit_mb / 1024) |> to_string()
    }

    get_http_client().post(
      orch_hub_endpoint(),
      Jason.encode!(orch_hub_create_params),
      [],
      hackney: [:insecure]
    )
  end

  def update_subdomain(%Hub{} = hub) do
    get_http_client().patch(
      orch_hub_endpoint(),
      Jason.encode!(%{
        hub_id: hub.hub_id |> to_string,
        subdomain: hub.subdomain
      }),
      [],
      hackney: [:insecure]
    )
  end

  def update_tier(%Hub{} = hub, opts \\ []) when is_list(opts) do
    reset_branding? = Keyword.get(opts, :reset_branding?, false)

    get_http_client().patch(
      orch_hub_endpoint(),
      Jason.encode!(%{
        ccu_limit: Integer.to_string(hub.ccu_limit),
        hub_id: Integer.to_string(hub.hub_id),
        reset_branding: reset_branding?,
        storage_limit: Float.to_string(hub.storage_limit_mb / 1024),
        subdomain: hub.subdomain,
        tier: hub.tier
      }),
      [],
      hackney: [:insecure]
    )
  end

  def delete_hub(%Hub{} = hub) do
    get_http_client().request(
      :delete,
      orch_hub_endpoint(),
      Jason.encode!(%{hub_id: hub.hub_id |> to_string}),
      [],
      hackney: [:insecure]
    )
  end

  defp get_http_client,
    do:
      :dash
      |> Application.get_env(__MODULE__)
      |> Keyword.get(:http_client, HTTPoison)

  defp get_orch_host() do
    Application.get_env(:dash, Dash.OrchClient)[:orch_host]
  end
end
