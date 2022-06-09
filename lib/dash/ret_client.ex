defmodule Dash.RetClient do
  @moduledoc """
  This module handles requests to specific hub instance's reticulum backend.
  """
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
        {:ok, count}

      # Reticulum completed the request but did not return the ccu
      {:ok, %{status_code: _} = response} ->
        IO.inspect(response)
        {:error, :no_ccu_returned}

      # An error occurred
      {:error, reason} ->
        IO.inspect(reason)
        {:error, reason}
    end
  end

  @storage_endpoint "storage"
  def get_current_storage_usage_mb(%Dash.Hub{} = hub) do
    case fetch_ret_internal_endpoint(hub, @storage_endpoint) do
      {:ok, %{status_code: 200, body: body}} ->
        %{"storage_mb" => storage_mb} = Poison.Parser.parse!(body)
        {:ok, storage_mb}

      {:ok, _} ->
        # TODO Log and error here when we introduce Logger
        {:error, :no_storage_returned}

      {:error, reason} ->
        # TODO Log and error here when we introduce Logger
        {:error, reason}
    end
  end

  # Timeout after five minutes
  @timeout_ms 300_000
  def wait_until_ready_state(%Dash.Hub{} = hub) do
    try do
      Task.await(Task.async(fn -> check_for_ready(hub, false, first_run: true) end), @timeout_ms)
    rescue
      _ ->
        IO.puts("timout_waiting_for_hub_ready_state")
        {:error, :timout_waiting_for_hub_ready_state}
    end
  end

  @wait_ms 5000
  def check_for_ready(%Dash.Hub{} = _hub, is_ready, first_run: _first_run) when is_ready === true,
    do: {:ok}

  def check_for_ready(%Dash.Hub{} = hub, is_ready, first_run: first_run)
      when is_ready === false do
    # Wait on every run except the first
    if !first_run, do: :timer.sleep(@wait_ms)

    # {:ok, resp} = fetch_health_endpoint(hub)
    # TODO add resiliency if there's at least one error with HTTPoison? Should this be a "try until success"?
    case HTTPoison.get("http://localhost:3000/health") do
      {:ok, resp} ->
        IO.inspect(resp)
        IO.puts("next")
        check_for_ready(hub, resp.status_code === 200, first_run: false)

      {:error, error} ->
        Logger.error("Failed getting hub /health. Reason: #{error}")
        {:error, error}
    end
  end

  defp get_ret_access_key() do
    Application.get_env(:dash, Dash.RetClient)[:dashboard_ret_access_key]
  end
end
