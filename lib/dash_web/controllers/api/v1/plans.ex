defmodule DashWeb.Api.V1.PlansController do
  use DashWeb, :controller

  def create(conn, %{"plan" => "starter"} = _) do
    send_resp(conn, 200, "")
  end
end
