defmodule Dash.RetClient do
  @moduledoc """
  This module handles requests to specific hub instance's reticulum backend.
  """
  require Logger
  use Retry
  alias Dash.{AppConfig}

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
    get_http_client().get(
      ret_host_url(hub_id) <> @ret_internal_scope <> endpoint,
      [{"x-ret-dashboard-access-key", get_ret_access_key()}],
      [hackney: [:insecure]] ++ opts
    )
  end

  defp post_ret_internal_endpoint(%Dash.Hub{} = hub, endpoint, %{} = body),
    do: post_ret_internal_endpoint(hub.hub_id, endpoint, body)

  defp post_ret_internal_endpoint(hub_id, endpoint, %{} = body) do
    get_http_client().post(
      ret_host_url(hub_id) <> @ret_internal_scope <> endpoint,
      Jason.encode!(body),
      [
        {"x-ret-dashboard-access-key", get_ret_access_key()},
        {"content-type", "application/json"}
      ],
      hackney: [:insecure]
    )
  end

  defp post_ret_internal_endpoint_with_retry(%Dash.Hub{} = hub, endpoint, %{} = body),
    do: post_ret_internal_endpoint_with_retry(hub.hub_id, endpoint, body)

  defp post_ret_internal_endpoint_with_retry(hub_id, endpoint, %{} = body) do
    retry with: constant_backoff(get_wait_ms()) |> expiry(get_timeout_ms()) do
      case post_ret_internal_endpoint(hub_id, endpoint, body) do
        {:ok, %{status_code: 200}} ->
          :ok

        {:ok, _} ->
          :error

        {:error, err} ->
          Logger.error(
            "Error posting to internal reticulum endpoint. Endpoint: #{endpoint}. Error: #{inspect(err)}"
          )

          :error
      end
    after
      _ -> {:ok}
    else
      _ ->
        Logger.error("Failed post to reticulum in retry loop. Likely timed out.")
        {:error, :post_ret_internal_timed_out}
    end
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

  @rewrite_assets_endpoint "rewrite_assets"
  def rewrite_assets(%Dash.Hub{} = previous_hub, %Dash.Hub{} = updated_hub) do
    cluster_domain = AppConfig.cluster_domain()
    old_domain = "#{previous_hub.subdomain}.#{cluster_domain}"
    new_domain = "#{updated_hub.subdomain}.#{cluster_domain}"

    case post_ret_internal_endpoint_with_retry(updated_hub, @rewrite_assets_endpoint, %{
           "old_domain" => old_domain,
           "new_domain" => new_domain
         }) do
      {:ok} ->
        {:ok}

      {:error, err} ->
        Logger.error(
          "Failed to rewrite assets from: #{old_domain} to #{new_domain}. Error: #{inspect(err)}"
        )

        {:error, :rewrite_assets_failed}
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

  def get_timeout_ms() do
    Application.get_env(:dash, Dash.RetClient)[:timeout_ms]
  end

  def get_wait_ms() do
    Application.get_env(:dash, Dash.RetClient)[:wait_ms]
  end

  defp get_http_client() do
    # Make the http client module configurable so that we can mock it out in tests.
    Application.get_env(:dash, Dash.Hub)[:http_client] || HTTPoison
  end
end
