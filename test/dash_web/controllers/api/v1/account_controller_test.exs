defmodule DashWeb.Api.V1.AccountControllerTest do
  use DashWeb.ConnCase, async: false

  import Dash.TestHelpers
  import Dash.Utils, only: [capability_string: 0]

  @route "/api/v1/account"

  describe "GET /api/vi/account" do
    setup do
      starter_plan_enabled? = Application.get_env(:dash, :starter_plan_enabled?)
      Application.put_env(:dash, :starter_plan_enabled?, true)
      on_exit(fn -> Application.put_env(:dash, :starter_plan_enabled?, starter_plan_enabled?) end)
    end

    test "should error for unauthorized users", %{conn: conn} do
      conn = get(conn, @route)

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
    end

    test "should error for unverified tokens", %{conn: conn} do
      conn =
        conn
        |> put_test_token(
          token_expiry: ~N[3000-01-01 00:00:00],
          unverified: true
        )
        |> get(@route)

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
    end

    test "should error for expired tokens", %{conn: conn} do
      conn =
        conn
        |> put_test_token(token_expiry: ~N[2000-01-01 00:00:00])
        |> get(@route)

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
    end

    test "should return account info for authorized users", %{conn: conn} do
      conn =
        conn
        |> put_test_token(
          claims: %{"fxa_email" => "email@fake.com"},
          token_expiry: ~N[3000-01-01 00:00:00]
        )
        |> get(@route)

      assert json_response(conn, 200)["email"] === "email@fake.com"
    end

    test "when starter plan feature is disabled", %{conn: conn} do
      Application.put_env(:dash, :starter_plan_enabled?, false)

      assert :error ===
               conn
               |> put_test_token(claims: %{"fxa_subscriptions" => []}, token_expiry: tomorrow())
               |> get(@route)
               |> json_response(200)
               |> Map.fetch("hasPlan")
    end

    test "when there is no plan", %{conn: conn} do
      assert {:ok, false} ===
               conn
               |> put_test_token(claims: %{"fxa_subscriptions" => []}, token_expiry: tomorrow())
               |> get(@route)
               |> json_response(200)
               |> Map.fetch("hasPlan")
    end

    test "when the account has an active plan", %{conn: conn} do
      stub_http_post_200()

      assert {:ok, true} ===
               conn
               |> put_test_token(
                 claims: %{"fxa_subscriptions" => [capability_string()]},
                 token_expiry: tomorrow()
               )
               |> get(@route)
               |> json_response(200)
               |> Map.fetch("hasPlan")
    end

    @tag :skip
    test "when the account has a stopped plan"
  end

  @spec tomorrow :: NaiveDateTime.t()
  defp tomorrow,
    do: NaiveDateTime.add(NaiveDateTime.utc_now(), 60 * 60 * 24)
end
