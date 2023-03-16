defmodule DashWeb.Api.V1.PlanController do
  use DashWeb, :controller

  def create(conn, %{"tier" => "starter"}) do
    conn
    |> put_status(:created)
    |> json(%{status: "created"})
  end
end
