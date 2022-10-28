defmodule DashWeb.Api.V1.SubscriptionControllerTest do
  use DashWeb.ConnCase

  import DashWeb.TestHelpers

  describe "show/2" do
    @tag marked: true
    test "should return values in cookie for subscription current period end and cancel at period end",
         %{conn: conn} do
      in_two_days = DateTime.to_unix(DateTime.add(DateTime.utc_now(), 2 * 24 * 60 * 60))

      conn =
        conn
        |> put_test_token(
          claims: %{fxa_current_period_end: in_two_days, fxa_cancel_at_period_end: false}
        )
        |> get("/api/v1/subscription")

      resp = Jason.decode!(response(conn, 200))
      assert resp["subscriptionEndTimestampS"] == in_two_days
      assert resp["isCancelled"] == false
    end

    @tag marked: true
    test "should return parsed currency and amount for first plan in string", %{conn: conn} do
      in_two_days = DateTime.to_unix(DateTime.add(DateTime.utc_now(), 2 * 24 * 60 * 60))

      conn =
        conn
        |> put_test_token(claims: %{fxa_current_period_end: in_two_days})
        |> get("/api/v1/subscription")

      assert response(conn, 200) ==
               Jason.encode!(%{
                 currency: "USD",
                 amount: "10",
                 subscriptionEndTimestampS: in_two_days,
                 isCancelled: false
               })
    end

    @tag marked: true
    test "should return parsed currency and amount for second plan in string", %{conn: conn} do
      in_two_days = DateTime.to_unix(DateTime.add(DateTime.utc_now(), 2 * 24 * 60 * 60))

      conn =
        conn
        |> put_test_token(
          claims: %{fxa_plan_id: "plan_test_2", fxa_current_period_end: in_two_days}
        )
        |> get("/api/v1/subscription")

      assert response(conn, 200) ==
               Jason.encode!(%{
                 currency: "EURO",
                 amount: "20",
                 subscriptionEndTimestampS: in_two_days,
                 isCancelled: false
               })
    end

    @tag marked: true
    test "should return nil for currency and amount if plan not found in string", %{conn: conn} do
      in_two_days = DateTime.to_unix(DateTime.add(DateTime.utc_now(), 2 * 24 * 60 * 60))

      conn =
        conn
        |> put_test_token(
          claims: %{fxa_current_period_end: in_two_days, fxa_plan_id: "not-a-plan"}
        )
        |> get("/api/v1/subscription")

      assert response(conn, 200) ==
               Jason.encode!(%{
                 currency: nil,
                 amount: nil,
                 subscriptionEndTimestampS: in_two_days,
                 isCancelled: false
               })
    end

    @tag marked: true
    test "should return nil for currency and amount if plan string is not formatted properly", %{
      conn: conn
    } do
      in_two_days = DateTime.to_unix(DateTime.add(DateTime.utc_now(), 2 * 24 * 60 * 60))

      conn =
        conn
        |> put_test_token(
          claims: %{fxa_current_period_end: in_two_days, fxa_plan_id: "not-a-plan"}
        )
        |> get("/api/v1/subscription")

      assert response(conn, 200) ==
               Jason.encode!(%{
                 currency: nil,
                 amount: nil,
                 subscriptionEndTimestampS: in_two_days,
                 isCancelled: false
               })
    end

    @tag marked: true
    test "should return default values if user is not subscribed", %{conn: conn} do
      conn =
        conn
        |> put_test_token(
          claims: %{fxa_current_period_end: 0, fxa_plan_id: "", fxa_cancel_at_period_end: false}
        )
        |> get("/api/v1/subscription")

      assert response(conn, 200) ==
               Jason.encode!(%{
                 currency: nil,
                 amount: nil,
                 subscriptionEndTimestampS: 0,
                 isCancelled: false
               })
    end
  end
end
