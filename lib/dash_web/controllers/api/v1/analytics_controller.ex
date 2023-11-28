defmodule DashWeb.Api.V1.AnalyticsController do
  use DashWeb, :controller

  require Logger

  def show(conn, %{"start_date" => start_date, "end_date" => end_date} = _params) do
    hubs = Dash.get_hubs_by_date(start_date, end_date)

    render(conn, :show, hubs: hubs)
  end
end
