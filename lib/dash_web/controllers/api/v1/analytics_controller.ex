defmodule DashWeb.Api.V1.AnalyticsController do
  use DashWeb, :controller

  require Logger

  def show(conn, %{"start_date" => start_date, "end_date" => end_date} = params) do


    hubs = Dash.get_hubs_by_date(start_date,end_date)

    conn
    |> put_resp_header("access-control-allow-origin", "http://localhost:3000")
    |> json(%{hubs: hubs})
  end






end
