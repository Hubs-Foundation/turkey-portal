defmodule Dash.RetClient do
  @moduledoc """
  This module handles requests to specific hub instance's reticulum backend.
  """
  require Logger
  use Retry

  require Logger

  @ret_host_prefix "ret.hc-"
  @ret_host_postfix ".svc.cluster.local"
  @ret_internal_port "4000"
  defp ret_host_url(%Dash.Hub{} = hub) do
    "https://#{@ret_host_prefix}#{hub.hub_id}#{@ret_host_postfix}:#{@ret_internal_port}"
  end

  @ret_internal_scope "/api-internal/v1/"
  defp fetch_ret_internal_endpoint(%Dash.Hub{} = hub, endpoint) do
    # Make the http client module configurable so that we can mock it out in tests.
    http_client = Application.get_env(:dash, Dash.Hub)[:http_client] || HTTPoison

    http_client.get(
      ret_host_url(hub) <> @ret_internal_scope <> endpoint,
      [{"x-ret-dashboard-access-key", get_ret_access_key()}],
      hackney: [:insecure]
    )
  end

  @health_endpoint "/health"
  defp fetch_health_endpoint(%Dash.Hub{} = hub) do
    http_client = Application.get_env(:dash, Dash.Hub)[:http_client] || HTTPoison

    http_client.get(
      ret_host_url(hub) <> @health_endpoint,
      hackney: [:insecure]
    )
  end

  @ccu_endpoint "presence"
  def get_current_ccu(%Dash.Hub{} = hub) do
    case fetch_ret_internal_endpoint(hub, @ccu_endpoint) do
      # Reticulum returned the ccu correctly
      {:ok, %{status_code: 200, body: body}} ->
        %{"count" => count} = Poison.Parser.parse!(body)
        count

      # Reticulum completed the request but did not return the ccu
      {:ok, %{status_code: status_code}} ->
        Logger.error("Failed to retrieve reticulum CCU. Status code: #{status_code}")
        nil

      # An error occurred
      {:error, reason} ->
        Logger.error("Failed to retrieve reticulum CCU. Reason: #{reason}")
        nil
    end
  end

  @storage_endpoint "storage"
  def get_current_storage_usage_mb(%Dash.Hub{} = hub) do
    case fetch_ret_internal_endpoint(hub, @storage_endpoint) do
      {:ok, %{status_code: 200, body: body}} ->
        %{"storage_mb" => storage_mb} = Poison.Parser.parse!(body)
        storage_mb

      {:ok, %{status_code: status_code}} ->
        Logger.error("Failed to retrieve reticulum storage usage. Status code: #{status_code}")
        nil

      {:error, reason} ->
        Logger.error("Failed to retrieve reticulum storage usage. Reason: #{reason}")
        nil
    end
  end

  # Timeout after five minutes
  @timeout_ms 300_000
  @wait_ms 5000
  def wait_until_ready_state(%Dash.Hub{} = hub) do
    retry with: constant_backoff(@wait_ms) |> expiry(@timeout_ms) do
      case fetch_health_endpoint(hub) do
        {:ok, %{status_code: 200}} ->
          :ok

        {:ok, _} ->
          # Ret server successfully responded, not ready yet
          :error

        {:error, reason} ->
          # Something went wrong reaching Ret server
          Logger.error("Error getting health endpoint. #{inspect(reason)}")
          :error
      end
    after
      _ -> {:ok}
    else
      _ ->
        Logger.error("Failed getting /health in retry loop. Likely timed out.")
        {:error, :wait_for_ready_state_timed_out}
    end
  end

  defp get_ret_access_key() do
    Application.get_env(:dash, Dash.RetClient)[:dashboard_ret_access_key]
  end
end
