defmodule DashWeb.Plugs.AuthTest do
  use DashWeb.ConnCase
  import DashWeb.TestHelpers
  import Mox
  use DashWeb, :controller

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

    test "No JWT token: /api/v1/account responds with 401 with redirect to login page", %{
      conn: conn
    } do
      put_keys_for_jwk()

      conn =
        conn
        # |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{
                 error: "unauthorized"
               })
    end

    test "Yes JWT token, no subscription: /api/v1/account responds with 200 account",
         %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration ++ @without_subscription_claims)
        |> get("/api/v1/account")

      assert response(conn, 200)
    end

    test "Yes JWT token, yes subscription: /api/v1/account responds with 200", %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 200)
    end

    test "Invalid JWT token responds with 401 with redirect to marketing page", %{conn: conn} do
      conn =
        conn
        |> put_test_token(@invalid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{
                 error: "unauthorized"
               })
    end

    test "Invalid JWT token/odd string for token responds with 401 with redirect to marketing page",
         %{conn: conn} do
      put_keys_for_jwk()

      conn =
        conn
        |> put_req_cookie("_turkeyauthtoken", "foobarbaz")
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{
                 error: "unauthorized"
               })
    end
  end

  describe "Auth Plug account.auth_updated_at tests" do
    test "Should reject if token.iat is before account.auth_updated_at", %{conn: conn} do
      create_test_account_and_hub()
      fxa_test_uid = get_default_test_uid()

      utc_datetime_now = DateTime.utc_now() |> DateTime.truncate(:second)

      earlier_datetime = utc_datetime_now
      later_datetime = DateTime.add(utc_datetime_now, 1000)

      Dash.Account.set_auth_updated_at(fxa_test_uid, later_datetime)

      conn =
        conn
        |> put_test_token(claims: %{iat: datetime_to_timestamp(earlier_datetime)})
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(%{
                 error: "unauthorized"
               })
    end

    test "Should succeed if token.iat is after account.auth_updated_at", %{conn: conn} do
      create_test_account_and_hub()
      fxa_test_uid = get_default_test_uid()

      utc_datetime_now = DateTime.utc_now() |> DateTime.truncate(:second)

      earlier_datetime = utc_datetime_now
      later_datetime = DateTime.add(utc_datetime_now, 1000)

      Dash.Account.set_auth_updated_at(fxa_test_uid, earlier_datetime)

      conn =
        conn
        |> put_test_token(claims: %{iat: datetime_to_timestamp(later_datetime)})
        |> get("/api/v1/account")

      assert json_response(conn, 200)["email"] === get_test_email()
    end
  end

  defp datetime_to_timestamp(datetime) do
    DateTime.to_unix(datetime)
  end
end