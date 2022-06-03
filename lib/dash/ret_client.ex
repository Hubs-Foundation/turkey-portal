defmodule Dash.RetClient do
  @ret_access_key Application.get_env(:dash, Dash.RetClient)[:dashboard_ret_access_key]

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
      [{"x-ret-dashboard-access-key", @ret_access_key}],
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
end
