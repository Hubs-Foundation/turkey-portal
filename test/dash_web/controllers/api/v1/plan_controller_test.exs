defmodule DashWeb.Api.V1.PlanControllerTest do
  use DashWeb.ConnCase, async: true

  import DashWeb.TestHelpers, only: [put_test_token: 2]

  @unauthorized_redirect Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())

  describe "POST /api/v1/plans?tier=starter" do
    test "returns a 201", %{conn: conn} do
      assert %{"status" => "created"} ===
               conn
               |> put_test_token(token_expiry: tomorrow())
               |> post("/api/v1/plans", tier: "starter")
               |> json_response(201)
    end

    test "when the user is not authorized", %{conn: conn} do
      assert @unauthorized_redirect ===
               conn
               |> post("/api/v1/plans", tier: "starter")
               |> response(401)
    end

    test "when token is unverified", %{conn: conn} do
      assert @unauthorized_redirect ===
               conn
               |> put_test_token(token_expiry: tomorrow(), unverified: true)
               |> post("/api/v1/plans", tier: "starter")
               |> response(401)
    end

    test "when token is expired", %{conn: conn} do
      assert @unauthorized_redirect ===
               conn
               |> put_test_token(token_expiry: ~N[1970-01-01 00:00:00])
               |> post("/api/v1/plans", tier: "starter")
               |> response(401)
    end
  end

  @spec tomorrow :: NaiveDateTime.t()
  defp tomorrow,
    do: NaiveDateTime.add(NaiveDateTime.utc_now(), 60 * 60 * 24)
end
