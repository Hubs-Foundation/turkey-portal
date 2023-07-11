defmodule DashWeb.Api.V1.AccountControllerTest do
  use DashWeb.ConnCase, async: false

  import Dash.TestHelpers
  import Dash.Utils, only: [capability_string: 0]

  @route "/api/v1/account"

  describe "GET /api/vi/account" do
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

    test "when there is no plan", %{conn: conn} do
      assert payload =
               conn
               |> put_test_token(claims: %{"fxa_subscriptions" => []})
               |> get(@route)
               |> json_response(200)

      assert false === payload["hasPlan"]
      assert nil === payload["planName"]
    end

    @tag :skip
    test "when the account has a stopped plan"

    test "when the account has an active starter plan", %{conn: conn} do
      expect_orch_post()

      :ok =
        get_default_test_uid()
        |> Dash.Account.find_or_create_account_for_fxa_uid()
        |> Dash.start_plan()

      assert payload =
               conn
               |> put_test_token(claims: %{"fxa_subscriptions" => []})
               |> get(@route)
               |> json_response(200)

      assert true === payload["hasPlan"]
      assert "starter" === payload["planName"]
    end

    test "when the account has an active personal plan", %{conn: conn} do
      stub_http_post_200()

      assert payload =
               conn
               |> put_test_token(claims: %{"fxa_subscriptions" => [capability_string()]})
               |> get(@route)
               |> json_response(200)

      assert true === payload["hasPlan"]
      assert "personal" === payload["planName"]
    end
  end
end
