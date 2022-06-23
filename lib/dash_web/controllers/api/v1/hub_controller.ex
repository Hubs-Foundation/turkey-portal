defmodule DashWeb.Api.V1.HubController do
  use DashWeb, :controller

  alias Dash.Hub

  def action(conn, _) do
    args = [conn, conn.params, conn.assigns[:account]]
    apply(__MODULE__, action_name(conn), args)
  end

  def show(conn, %{"id" => hub_id}, account) do
    hub = Hub.get_hub(hub_id, account)

    conn |> render("show.json", hub: hub)
  end

  # All hubs for 1 account
  def index(conn, %{}, account) do
    # Check that this account has at least one hub
    case Hub.ensure_default_hub_is_ready(account, conn.assigns[:fxa_account_info].fxa_email) do
      {:ok} ->
        hubs = Hub.hubs_with_usage_stats_for_account(account)
        conn |> render("index.json", hubs: hubs)

      {:error, err} ->
        conn |> send_resp(500, Jason.encode!(%{error: err})) |> halt()
    end
  end

  # Create hub with defaults
  def create(conn, _, account) do
    fxa_email = conn.assigns[:fxa_account_info].fxa_email

    case Hub.create_default_hub(account, fxa_email) do
      {:ok, new_hub} -> conn |> render("create.json", hub: new_hub)
      {:error, err} -> conn |> send_resp(400, Jason.encode!(%{error: err})) |> halt()
    end
  end

  def update(conn, %{"id" => hub_id} = attrs, account) do
    # this verifies that the account has a hub with this id
    case Hub.update_hub(hub_id, json_camel_to_snake(attrs), account) do
      {:ok} ->
        conn |> send_resp(200, "")

      {:error, err} ->
        conn |> send_resp(400, Jason.encode!(%{error: err})) |> halt()
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
    # Todo call to orchestrator to delete the hub
    # Todo protect this endpoint for development purposes only
    deleted_hub = Hub.delete_hub(hub_id, account)

    conn |> render("delete.json", deleted_hub: deleted_hub)
  end
end
