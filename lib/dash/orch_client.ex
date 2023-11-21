defmodule Dash.OrchClient do
  @moduledoc """
  Orchestrator manages hub instances and their infrastructure.
  This module handles requests to Orchestrator to make changes to create/update specific hub instances.
  """

  alias Dash.Hub

  def create_hub(fxa_email, %Hub{} = hub, opts \\ []) when is_list(opts) do
    disable_branding? = Keyword.get(opts, :disable_branding?, false)

    json =
      Jason.encode!(%{
        ccu_limit: Integer.to_string(hub.ccu_limit),
        disable_branding: disable_branding?,
        hub_id: Integer.to_string(hub.hub_id),
        region: "us",
        storage_limit: Float.to_string(hub.storage_limit_mb / 1024),
        subdomain: hub.subdomain,
        tier: hub.tier,
        useremail: fxa_email
      })

    http_client().post(orch_hub_endpoint(), json, [], options())
  end

  # TODO: test this behavior somewhere
  def delete_hub(%Hub{} = hub) do
    json = Jason.encode!(identity(hub))
    http_client().request(:delete, orch_hub_endpoint(), json, [], options())
  end

  def update_hub(fxa_email, %Hub{} = hub, opts \\ [])
      when is_binary(fxa_email) and is_list(opts) do
    disable_branding? = Keyword.get(opts, :disable_branding?, false)
    reset_branding? = Keyword.get(opts, :reset_branding?, false)
    reset_client? = Keyword.get(opts, :reset_client?, false)
    reset_domain? = Keyword.get(opts, :reset_domain?, false)

    params = %{
      ccu_limit: Integer.to_string(hub.ccu_limit),
      disable_branding: disable_branding?,
      reset_branding: reset_branding?,
      reset_client: reset_client?,
      reset_domain: reset_domain?,
      storage_limit: Float.to_string(hub.storage_limit_mb / 1024),
      subdomain: hub.subdomain,
      tier: hub.tier,
      useremail: fxa_email
    }

    json =
      params
      |> Map.merge(identity(hub))
      |> Jason.encode!()

    http_client().patch(orch_hub_endpoint(), json, [], options())
  end

  def update_subdomain(%Hub{} = hub) do
    params = %{
      subdomain: hub.subdomain
    }

    json =
      params
      |> Map.merge(identity(hub))
      |> Jason.encode!()

    http_client().patch(orch_hub_endpoint(), json, [], options())
  end

  ## Helpers

  @spec http_client :: module
  defp http_client,
    do:
      :dash
      |> Application.get_env(__MODULE__)
      |> Keyword.get(:http_client, HTTPoison)

  @spec identity(Hub.t()) :: %{atom => String.t()}
  defp identity(%Hub{} = hub),
    do: %{domain: hub.deployment.domain, hub_id: Integer.to_string(hub.hub_id)}

  @spec options :: Keyword.t()
  defp options,
    do: [hackney: [:insecure], recv_timeout: 300_000]

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
