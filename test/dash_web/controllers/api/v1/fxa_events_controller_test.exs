defmodule DashWeb.Api.V1.FxaEventsControllerTest do
  use DashWeb.ConnCase
  import DashWeb.TestHelpers
  require Logger

  # @password_change_struct %{
  #   "iss" => "https://accounts.firefox.com/",
  #   "sub" => "FXA_USER_ID",
  #   "aud" => "REMOTE_SYSTEM",
  #   "iat" => 1565720808,
  #   "jti" => "e19ed6c5-4816-4171-aa43-56ffe80dbda1",
  #   "events" => {
  #     "https://schemas.accounts.firefox.com/event/password-change" => {
  #         "changeTime" => 1565721242227
  #     }
  #   }
  # }

  describe "FxA Events Controller Webhook" do
    # Password change event handled correctly
    @tag marked: true
    test "should return 200 and password change event handled correctly", %{conn: conn} do
      # Create Account
      create_test_account_and_hub()
      account_before = get_test_account()

      # Logger.error("account #{inspect(account_before)}")

      # Should have nothing set for auth_changed_at
      assert account_before.auth_updated_at == nil

      timestamp_ms = 1_565_721_242_227
      event_struct = get_password_change_event(time: timestamp_ms)
      body = get_generic_fxa_event_struct(fxa_uid: get_default_test_uid(), event: event_struct)

      conn
      |> put_resp_content_type("application/json")
      |> get("/api/v1/events/fxa", body)

      # time set for auth_changed_at
      account_after = get_test_account()

      assert account_after.auth_updated_at ==
               Dash.FxaEvents.fxa_timestamp_str_to_utc_datetime(Integer.to_string(timestamp_ms))
    end

    # Account is not created if the account never existed and we receive a password change event
    @tag marked: true
    test "should return 200 and if account never existed, there's still no account", %{conn: conn} do
      account_before = get_test_account()

      # No account for fxa_uid
      assert account_before == nil

      timestamp_ms = 1_565_721_242_227
      event_struct = get_password_change_event(time: timestamp_ms)
      body = get_generic_fxa_event_struct(fxa_uid: get_default_test_uid(), event: event_struct)

      conn
      |> put_resp_content_type("application/json")
      |> get("/api/v1/events/fxa", body)

      account_after = get_test_account()

      # Still no account for fxa_uid
      assert account_after == nil
    end
  end

  defp get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct) do
    %{
      "iss" => "https://accounts.fxa.local/",
      "sub" => fxa_uid,
      "aud" => "REMOTE_SYSTEM",
      "iat" => 1_565_720_808,
      "jti" => "e19ed6c5-4816-4171-aa43-56ffe80dbda1",
      "events" => event_struct
    }
  end

  defp get_password_change_event(time: time) do
    %{
      "https://schemas.accounts.fxa.local/event/password-change" => %{
        "changeTime" => time
      }
    }
  end
end
