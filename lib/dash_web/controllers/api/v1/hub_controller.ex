defmodule DashWeb.Api.V1.HubController do
  use DashWeb, :controller

  alias Dash.Hub
  require Logger

  def action(conn, _) do
    args = [conn, conn.params, conn.assigns[:account]]
    apply(__MODULE__, action_name(conn), args)
  end

  def show(conn, %{"id" => id_string}, %Dash.Account{} = account) do
    hub =
      id_string
      |> String.to_integer()
      |> Dash.get_hub(account)

    render(conn, :show, hub: hub)
  end

  # All hubs for 1 account
  def index(conn, %{}, account) do
    # Check that this account has at least one hub if subscribed
    fxa_account_info = conn.assigns[:fxa_account_info]
    fxa_email = fxa_account_info.fxa_email
    has_subscription? = fxa_account_info.has_subscription?
    Logger.info("HAS SUBSCRIPTION: #{has_subscription?}")

    case Hub.ensure_default_hub_is_ready(account, fxa_email, has_subscription?) do
      :ok ->
        hubs = Hub.hubs_with_usage_stats_for_account(account)
        render(conn, :index, hubs: hubs)

      {:error, err} ->
        conn |> send_resp(500, Jason.encode!(%{error: err})) |> halt()
    end
  end

  def update(conn, %{"id" => hub_id} = attrs, account) do
    # this verifies that the account has a hub with this id
    case Hub.update_hub(hub_id, json_camel_to_snake(attrs), account) do
      {:ok, updated_hub} ->
        render(conn, :show, hub: updated_hub)

      {:error, err} ->
        conn
        |> put_resp_content_type("application/json")
        |> send_resp(400, Jason.encode!(%{error: err}))
        |> halt()
    end
  end

  # Takes json camel case keys and converts into json snake case keys
  # Ex - %{ "storageLimitMb": 5000 } -> %{ "storage_limit_mb": 5000 }
  defp json_camel_to_snake(json) do
    json
    |> Enum.map(fn {k, v} -> {Macro.underscore(k), v} end)
    |> Map.new()
  end

  def delete(conn, %{"id" => hub_id}, account) do
    # TODO EA call to orchestrator to delete the hub
    deleted_hub = Hub.delete_hub(hub_id, account)

    render(conn, :delete, deleted_hub: deleted_hub)
  end

  def validate_subdomain(
        conn,
        %{"excludedHubId" => excluded_hub_id, "subdomain" => subdomain},
        _account
      ) do
    case Hub.validate_subdomain(excluded_hub_id, subdomain) do
      {:ok} ->
        conn |> send_resp(200, Jason.encode!(%{success: true}))

      {:error, err} ->
        conn |> send_resp(200, Jason.encode!(%{success: false, error: err}))
    end
  end
end
