defmodule DashWeb.Api.V1.RegionController do
  use DashWeb, :controller

  @region_header "x-client-region"

  def show(conn, _) do
    region_code =
      case get_req_header(conn, @region_header) do
        [region_code] ->
          region_code

        [] ->
          nil
      end

    conn
    |> send_resp(200, Jason.encode!(%{regionCode: region_code}))
  end

  def region_header, do: @region_header
end
