defmodule DashWeb.Api.V1.PlanController do
  use DashWeb, :controller

  def create(conn, %{"tier" => "starter"}) do
    if Application.fetch_env!(:dash, :starter_plan_enabled?) do
      case Dash.start_plan(conn.assigns.account) do
        :ok ->
          conn
          |> put_status(:created)
          |> json(%{status: "created"})

        {:error, :already_started} ->
          conn
          |> put_status(:conflict)
          |> json(%{error: "already started"})
      end
    else
      send_resp(conn, 404, "Not Found")
    end
  end
end
