defmodule DashWeb.Api.V1.SubscriptionController do
  use DashWeb, :controller

  def show(conn, _) do
    region =
      case get_req_header(conn, @region_header) do
        [region] ->
          region

        [] ->
          nil
      end

    conn |> send_resp(200, Jason.encode!(%{region: region}))
  end
end
