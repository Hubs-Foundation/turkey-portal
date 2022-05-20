defmodule DashWeb.Api.V1.AccountControllerTest do
  use DashWeb.ConnCase

  alias Dash.TokenTestHelper

  describe "Account API" do
    setup do
      TokenTestHelper.clear_auth_config()
      Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: false)
    end

    test "should error for unauthorized users", %{conn: conn} do
      conn = get(conn, "/api/v1/account")
      assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
    end

    test "should error for unverified tokens", %{conn: conn} do
      conn =
        conn
        |> TokenTestHelper.put_test_token(
          %{},
          token_expiry: ~N[3000-01-01 00:00:00],
          unverified: true
        )
        |> get("/api/v1/account")

      assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
    end

    test "should error for expired tokens", %{conn: conn} do
      conn =
        conn
        |> TokenTestHelper.put_test_token(
          %{},
          token_expiry: ~N[2000-01-01 00:00:00]
        )
        |> get("/api/v1/account")

      assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
    end

    test "should return account info for authorized users", %{conn: conn} do
      conn =
        conn
        |> TokenTestHelper.put_test_token(
          %{
            "sub" => "fake-uid",
            "fxa_email" => "email@fake.com",
            "fxa_pic" => "https://fake.com/pic.jpg",
            "fxa_displayName" => "Faker McFakerson"
          },
          token_expiry: ~N[3000-01-01 00:00:00]
        )
        |> get("/api/v1/account")

      assert json_response(conn, 200)["email"] === "email@fake.com"
    end
  end
end
