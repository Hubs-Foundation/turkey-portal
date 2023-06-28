defmodule DashWeb.Api.V1.PlanControllerTest do
  use DashWeb.ConnCase, async: false

  import Dash.TestHelpers
  import Dash.Utils, only: [capability_string: 0]

  @unauthorized_redirect Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
  @route "/api/v1/plans"

  describe "POST /api/v1/plans?tier=starter" do
    test "returns a 201", %{conn: conn} do
      expect_orch_post()

      assert %{"status" => "created"} ===
               conn
               |> put_test_token(claims: %{"fxa_subscriptions" => []}, token_expiry: tomorrow())
               |> put_req_header("content-type", "application/json")
               |> post(@route, tier: "starter")
               |> json_response(201)
    end

    test "when the account has an active plan", %{conn: conn} do
      stub_http_post_200()

      assert %{"error" => "already started"} ===
               conn
               |> put_test_token(
                 claims: %{"fxa_subscriptions" => [capability_string()]},
                 token_expiry: tomorrow()
               )
               |> put_req_header("content-type", "application/json")
               |> post(@route, tier: "starter")
               |> json_response(409)
    end

    test "when the user is not authorized", %{conn: conn} do
      assert @unauthorized_redirect ===
               conn
               |> put_req_header("content-type", "application/json")
               |> post(@route, tier: "starter")
               |> response(401)
    end

    test "when token is unverified", %{conn: conn} do
      assert @unauthorized_redirect ===
               conn
               |> put_test_token(token_expiry: tomorrow(), unverified: true)
               |> put_req_header("content-type", "application/json")
               |> post(@route, tier: "starter")
               |> response(401)
    end

    test "when token is expired", %{conn: conn} do
      assert @unauthorized_redirect ===
               conn
               |> put_test_token(token_expiry: ~N[1970-01-01 00:00:00])
               |> put_req_header("content-type", "application/json")
               |> post(@route, tier: "starter")
               |> response(401)
    end
  end

  @spec tomorrow :: NaiveDateTime.t()
  defp tomorrow,
    do: NaiveDateTime.add(NaiveDateTime.utc_now(), 60 * 60 * 24)
end
