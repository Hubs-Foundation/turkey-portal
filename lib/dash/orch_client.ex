defmodule Dash.OrchClient do
  @moduledoc """
  Orchestrator manages hub instances and their infrastructure.
  This module handles requests to Orchestrator to make changes to create/update specific hub instances.
  """

  alias Dash.Hub

  def create_hub(fxa_email, %Hub{} = hub, opts \\ []) when is_list(opts) do
    disable_branding? = Keyword.get(opts, :disable_branding?, false)

    orch_hub_create_params = %{
      useremail: fxa_email,
      disable_branding: disable_branding?,
      hub_id: hub.hub_id |> to_string(),
      subdomain: hub.subdomain,
      tier: hub.tier,
      ccu_limit: hub.ccu_limit |> to_string(),
      storage_limit: (hub.storage_limit_mb / 1024) |> to_string()
    }

    http_client().post(
      orch_hub_endpoint(),
      Jason.encode!(orch_hub_create_params),
      [],
      hackney: [:insecure]
    )
  end

  def delete_hub(%Hub{} = hub) do
    http_client().request(
      :delete,
      orch_hub_endpoint(),
      Jason.encode!(%{hub_id: hub.hub_id |> to_string}),
      [],
      hackney: [:insecure]
    )
  end

  def update_hub(%Hub{} = hub, opts \\ []) when is_list(opts) do
    disable_branding? = Keyword.get(opts, :disable_branding?, false)
    reset_branding? = Keyword.get(opts, :reset_branding?, false)

    http_client().patch(
      orch_hub_endpoint(),
      Jason.encode!(%{
        ccu_limit: Integer.to_string(hub.ccu_limit),
        disable_branding: disable_branding?,
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

  def update_subdomain(%Hub{} = hub) do
    http_client().patch(
      orch_hub_endpoint(),
      Jason.encode!(%{
        hub_id: hub.hub_id |> to_string,
        subdomain: hub.subdomain
      }),
      [],
      hackney: [:insecure]
    )
  end

  ## Helpers

  @spec http_client :: module
  defp http_client,
    do:
      :dash
      |> Application.get_env(__MODULE__)
      |> Keyword.get(:http_client, HTTPoison)

  @spec orch_host :: String.t()
  defp orch_host,
    do:
      :dash
      |> Application.get_env(__MODULE__)
      |> Keyword.fetch!(:orch_host)

  @spec orch_hub_endpoint :: String.t()
  defp orch_hub_endpoint,
    do: "https://#{orch_host()}/hc_instance"
end
