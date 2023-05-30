defmodule DashWeb.Api.V1.PlanController do
  use DashWeb, :controller

  def create(conn, %{"tier" => "starter"}) do
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
  end
end
