defmodule DashWeb.Plugs.AuthTest do
  use DashWeb.ConnCase
  use DashWeb, :controller

  alias DashWeb.FxaEvents
  import Dash.TestHelpers

  setup do
    Mox.verify_on_exit!()
  end

  describe "Auth Plug" do
    setup do
      clear_auth_config()
    end

    @valid_expiration token_expiry: ~N[3000-01-01 00:00:00]
    @invalid_expiration token_expiry: ~N[2000-01-01 00:00:00]
    @without_subscription_claims claims: %{fxa_subscriptions: []}
    @null_subscription_claims claims: %{fxa_subscriptions: nil}

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
                 error: "unauthorized",
                 redirect: "auth"
               })
    end

    test "Yes JWT token, EMPTY ARRAY subscription: /api/v1/account responds with 200 account",
         %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration ++ @without_subscription_claims)
        |> get("/api/v1/account")

      assert response(conn, 200)
    end

    test "Yes JWT token, NULL subscription: /api/v1/account responds with 200 account",
         %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration ++ @null_subscription_claims)
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
                 error: "unauthorized",
                 redirect: "auth"
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
                 error: "unauthorized",
                 redirect: "auth"
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
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
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

  describe "fxa subscription auth tests" do
    test "should return redirect to auth struct if subscription period end is earlier than now",
         %{
           conn: conn
         } do
      yesterday =
        DateTime.utc_now()
        |> DateTime.add(-1 * 24 * 60 * 60)
        |> DateTime.to_unix()

      conn =
        conn
        |> put_test_token(
          claims: %{fxa_current_period_end: yesterday, fxa_cancel_at_period_end: false}
        )
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
    end

    test "should return account if subscription period end is default 0 (no subscription)", %{
      conn: conn
    } do
      conn =
        conn
        |> put_test_token(
          claims: %{
            fxa_subscriptions: nil,
            fxa_current_period_end: 0,
            fxa_plan_id: "",
            fxa_cancel_at_period_end: false
          }
        )
        |> get("/api/v1/account")

      assert response(conn, 200)
    end
  end

  describe "account was deleted tests" do
    test "returns 401, if account was deleted", %{conn: conn} do
      fxa_uid = get_default_test_uid()
      Dash.fxa_uid_to_deleted_list(fxa_uid)

      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
    end
  end

  describe "handle_account_deletion_event/1" do
    test "After delete account event, a valid cookie authenticating that fxa_uid will result in a 401",
         %{conn: conn} do
      expect_orch_delete()
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()

      true = Dash.has_account_for_fxa_uid?(fxa_uid)

      FxaEvents.handle_account_deletion_event(fxa_uid)

      conn =
        conn
        |> put_test_token()
        |> get("/api/v1/account")

      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
    end
  end

  defp datetime_to_timestamp(datetime) do
    DateTime.to_unix(datetime)
  end
end
