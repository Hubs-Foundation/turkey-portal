defmodule DashWeb.Api.V1.RegionController do
  use DashWeb, :controller

  @region_header "x-client-region"

  def show(conn, _) do
    code =
      case get_req_header(conn, @region_header) do
        [code] ->
          code

        [] ->
          nil
      end

    conn
    |> send_resp(200, Jason.encode!(%{code: code}))
  end

  def region_header, do: @region_header
end
