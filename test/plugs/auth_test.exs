defmodule DashWeb.Plugs.AuthTest do
  use DashWeb.ConnCase
  import DashWeb.TestHelpers
  import Mox
  use DashWeb, :controller
  alias DashWeb.Plugs.Auth

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  setup [:verify_on_exit!]

  describe "Auth Plug" do
    setup do
      clear_auth_config()
    end

    @valid_expiration token_expiry: ~N[3000-01-01 00:00:00]
    @invalid_expiration token_expiry: ~N[2000-01-01 00:00:00]
    @without_subscription_claims claims: %{fxa_subscriptions: []}

    test "No JWT token: /api/v1/account responds with 401 with redirect to auth server", %{
      conn: conn
    } do
      put_keys_for_jwk()

      conn =
        conn
        # |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{
                 error: "unauthorized",
                 redirect: Auth.get_auth_url(current_url(conn))
               })
    end

    test "Yes JWT token, no subscription: /api/v1/account responds with 401 with redirect to /subscribe page",
         %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration ++ @without_subscription_claims)
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{error: "unauthorized", redirect: Auth.get_pricing_page_path()})
    end

    test "Yes JWT token, yes subscription: /api/v1/account responds with 200", %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 200)
    end

    test "Invalid JWT token responds with 401 with redirect to auth server", %{conn: conn} do
      conn =
        conn
        |> put_test_token(@invalid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{
                 error: "unauthorized",
                 redirect: Auth.get_auth_url(current_url(conn))
               })
    end

    test "Invalid JWT token/odd string for token responds with 401 with redirect to auth server",
         %{conn: conn} do
      put_keys_for_jwk()

      conn =
        conn
        |> put_req_cookie("_turkeyauthtoken", "foobarbaz")
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{
                 error: "unauthorized",
                 redirect: Auth.get_auth_url(current_url(conn))
               })
    end
  end
end
