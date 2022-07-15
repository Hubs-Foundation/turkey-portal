defmodule Dash.RetClient do
  @moduledoc """
  This module handles requests to specific hub instance's reticulum backend.
  """
  require Logger
  use Retry

  @ret_host_prefix "ret.hc-"
  @ret_host_postfix ".svc.cluster.local"
  @ret_internal_port "4000"
  defp ret_host_url(%Dash.Hub{} = hub), do: ret_host_url(hub.hub_id)

  defp ret_host_url(hub_id) when is_integer(hub_id) do
    "https://#{@ret_host_prefix}#{hub_id}#{@ret_host_postfix}:#{@ret_internal_port}"
  end

  @ret_internal_scope "/api-internal/v1/"
  defp fetch_ret_internal_endpoint(%Dash.Hub{} = hub, endpoint),
    do: fetch_ret_internal_endpoint(hub.hub_id, endpoint)

  defp fetch_ret_internal_endpoint(hub_id, endpoint, opts \\ []) when is_integer(hub_id) do
    # Make the http client module configurable so that we can mock it out in tests.
    http_client = get_http_client() || HTTPoison

    http_client.get(
      ret_host_url(hub_id) <> @ret_internal_scope <> endpoint,
      [{"x-ret-dashboard-access-key", get_ret_access_key()}],
      [hackney: [:insecure]] ++ opts
    )
  end

  @health_endpoint "/health"
  defp fetch_health_endpoint(%Dash.Hub{} = hub) do
    http_client = get_http_client() || HTTPoison

    http_client.get(
      ret_host_url(hub) <> @health_endpoint,
      [],
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
      {:error, err} ->
        Logger.error("Failed to retrieve reticulum CCU. Error: #{inspect(err)}")
        nil
    end
  end

  # start_time and end_time should be in iso format
  @range_max_ccu_endpoint "presence/range_max"
  def get_max_ccu_for_range(hub_id, start_time, end_time, opts \\ [])
      when is_binary(start_time) and is_binary(end_time) do
    case fetch_ret_internal_endpoint(
           hub_id,
           @range_max_ccu_endpoint,
           [params: %{start_time: start_time, end_time: end_time}] ++ opts
         ) do
      # Reticulum returned the max ccu correctly
      {:ok, %{status_code: 200, body: body}} ->
        %{"max_ccu" => max_ccu} = Poison.Parser.parse!(body)
        max_ccu

      # Reticulum completed the request but did not return the ccu
      {:ok, %{status_code: status_code}} ->
        Logger.error(
          "Failed to retrieve #{hub_id} reticulum max_CCU. Status code: #{status_code}"
        )

        nil

      # An error occurred
      {:error, err} ->
        Logger.error("Failed to retrieve #{hub_id} reticulum CCU. Error: #{inspect(err)}")
        nil
    end
  end

  @storage_endpoint "storage"
  def get_current_storage_usage_mb(%Dash.Hub{} = hub),
    do: get_current_storage_usage_mb(hub.hub_id)

  def get_current_storage_usage_mb(hub_id, opts \\ []) when is_integer(hub_id) do
    case fetch_ret_internal_endpoint(hub_id, @storage_endpoint, opts) do
      {:ok, %{status_code: 200, body: body}} ->
        %{"storage_mb" => storage_mb} = Poison.Parser.parse!(body)
        storage_mb

      {:ok, %{status_code: status_code}} ->
        Logger.error("Failed to retrieve reticulum storage usage. Status code: #{status_code}")
        nil

      {:error, err} ->
        Logger.error("Failed to retrieve reticulum storage usage. Error: #{inspect(err)}")
        nil
    end
  end

  def wait_until_healthy(%Dash.Hub{} = hub) do
    retry with: constant_backoff(get_wait_ms()) |> expiry(get_timeout_ms()) do
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

  def get_timeout_ms() do
    Application.get_env(:dash, Dash.RetClient)[:timeout_ms]
  end

  def get_wait_ms() do
    Application.get_env(:dash, Dash.RetClient)[:wait_ms]
  end

  def get_http_client() do
    Application.get_env(:dash, Dash.Hub)[:http_client]
  end
end
