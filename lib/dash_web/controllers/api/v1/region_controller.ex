defmodule DashWeb.Api.V1.RegionController do
  use DashWeb, :controller
  require Logger

  @region_header "x-client-region"

  def index(conn, _) do
    Logger.error("req_headers are #{inspect(conn.req_headers)}")

    region =
      case get_req_header(conn, @region_header) do
        [region] ->
          Logger.error("region is #{inspect(region)}")
          region

        [] ->
          nil
      end

    conn |> send_resp(200, Jason.encode!(%{region: region}))
  end

  def region_header, do: @region_header
end
