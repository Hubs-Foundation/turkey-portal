defmodule Dash.RetClient do
  @moduledoc """
  This module handles requests to specific hub instance's reticulum backend.
  """
  use Retry

  alias Dash.{Hub, Repo}
  require Logger

  defp ret_host_url(hub_or_hub_id)

  defp ret_host_url(hub_id) when is_integer(hub_id) and hub_id > 0,
    do:
      Hub
      |> Repo.get!(hub_id)
      |> Repo.preload(:deployment)
      |> ret_host_url()

  defp ret_host_url(%Hub{} = hub) do
    # TODO: test this somewhere
    if hub.deployment.local? do
      "http://ret.hc-#{hub.hub_id}.svc.cluster.local:4001"
    else
      "https://#{hub.subdomain}.#{hub.deployment.domain}"
    end
  end

  @ret_internal_scope "/api-internal/v1/"
  defp fetch_ret_internal_endpoint(%Dash.Hub{} = hub, endpoint),
    do: fetch_ret_internal_endpoint(hub.hub_id, endpoint)

  defp fetch_ret_internal_endpoint(hub_id, endpoint, opts \\ []) when is_integer(hub_id) do
    get_http_client().get(
      ret_host_url(hub_id) <> @ret_internal_scope <> endpoint,
      [{"x-ret-dashboard-access-key", get_ret_access_key()}],
      [hackney: [:insecure]] ++ opts
    )
  end

  @health_endpoint "/health"
  defp fetch_health_endpoint(%Dash.Hub{} = hub) do
    get_http_client().get(
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

  @change_email_for_login "change_email_for_login"
  def update_hub_admin_email(%Dash.Hub{hub_id: hub_id}, old_email, new_email) do
    response =
      get_http_client().patch(
        ret_host_url(hub_id) <> @ret_internal_scope <> @change_email_for_login,
        Jason.encode!(%{old_email: old_email, new_email: new_email}),
        [
          {"x-ret-dashboard-access-key", get_ret_access_key()},
          {"content-type", "application/json"}
        ],
        hackney: [:insecure]
      )

    case response do
      {:ok, %{status_code: 200}} ->
        :ok

      {:ok, %{status_code: status_code}} ->
        Logger.error(
          "Unexpected status code. Failed to update admin email for hub. Status code: #{status_code}"
        )

        :error

      {:error, err} ->
        Logger.error(
          "Unexpected error occurred updating admin email for hub. Error: #{inspect(err)}"
        )

        {:error, err}
    end
  end

  defp get_ret_access_key() do
    Application.get_env(:dash, Dash.RetClient)[:dashboard_ret_access_key]
  end

  defp get_timeout_ms do
    Application.get_env(:dash, Dash.RetClient)[:timeout_ms]
  end

  def get_wait_ms() do
    Application.get_env(:dash, Dash.RetClient)[:wait_ms]
  end

  defp get_http_client,
    do:
      :dash
      |> Application.get_env(__MODULE__)
      |> Keyword.get(:http_client, HTTPoison)
end
