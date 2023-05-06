defmodule DashWeb.ContentTypeRestriction do
  @moduledoc """
  Plug to restrict the content-types of requests.

  This can be used to prevent cross-site request forgery (CSRF) on JSON-only
  routes, subjecting all requests to the browser-enforced same-origin policy
  (SOP).

  ## Examples

      plug DashWeb.ContentTypeRestriction, ["application/json", "application/vnd.api+json"]

  """
  @behaviour Plug
  @unprotected_methods ~w(HEAD GET OPTIONS)

  @impl Plug
  def init(allowed_types) when is_list(allowed_types),
    do: allowed_types

  @impl Plug
  def call(%Plug.Conn{} = conn, allowed_types) when is_list(allowed_types) do
    if conn.method in @unprotected_methods or content_type(conn) in allowed_types do
      conn
    else
      conn
      |> Plug.Conn.send_resp(415, "Unsupported Media Type")
      |> Plug.Conn.halt()
    end
  end

  @spec content_type(Plug.Conn.t()) :: String.t()
  defp content_type(%Plug.Conn{} = conn) do
    case Plug.Conn.get_req_header(conn, "content-type") do
      [] ->
        "text/plain"

      [content_type] ->
        content_type
    end
  end
end
