defmodule DashWeb.Api.V1.AccountControllerTest do
  use DashWeb.ConnCase
  import DashWeb.TestHelpers

  describe "Account API" do
    test "should error for unauthorized users", %{conn: conn} do
      conn = get(conn, "/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.get_unauthorized_redirect_struct())
    end

    test "should error for unverified tokens", %{conn: conn} do
      conn =
        conn
        |> put_test_token(
          token_expiry: ~N[3000-01-01 00:00:00],
          unverified: true
        )
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.get_unauthorized_redirect_struct())
    end

    test "should error for expired tokens", %{conn: conn} do
      conn =
        conn
        |> put_test_token(token_expiry: ~N[2000-01-01 00:00:00])
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.get_unauthorized_redirect_struct())
    end

    test "should return account info for authorized users", %{conn: conn} do
      conn =
        conn
        |> put_test_token(
          claims: %{"fxa_email" => "email@fake.com"},
          token_expiry: ~N[3000-01-01 00:00:00]
        )
        |> get("/api/v1/account")

      assert json_response(conn, 200)["email"] === "email@fake.com"
    end
  end
end
