defmodule DashWeb.Api.V1.RegionController do
  use DashWeb, :controller

  @region_header "x-client-region"

  def show(conn, _) do
    region =
      case get_req_header(conn, @region_header) do
        [region] ->
          region

        [] ->
          nil
          "CA"
      end

    conn
    |> send_resp(200, Jason.encode!(%{region: region}))
  end

  def region_header, do: @region_header
end
