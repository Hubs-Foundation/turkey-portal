defmodule DashWeb.Api.V1.FxaEventsControllerTest do
  use DashWeb.ConnCase

  import Dash.TestHelpers
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

  setup do
    Mox.verify_on_exit!()
  end

  describe "FxA Events Controller Webhook: Password change events" do
    # Password change event handled correctly
    test "should return 200 and password change event handled correctly", %{conn: conn} do
      # Create Account
      create_test_account_and_hub()
      account_before = get_test_account()

      # Should have nothing set for auth_changed_at
      assert account_before.auth_updated_at == nil

      timestamp_ms = 1_565_721_242_227
      event_struct = get_password_change_event(time: timestamp_ms)
      body = get_generic_fxa_event_struct(fxa_uid: get_default_test_uid(), event: event_struct)

      conn
      |> put_resp_content_type("application/json")
      |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
      |> post("/api/v1/events/fxa")

      # time set for auth_changed_at
      account_after = get_test_account()

      assert account_after.auth_updated_at ===
               timestamp_ms
               |> DateTime.from_unix!(:millisecond)
               |> DateTime.truncate(:second)
    end

    # Account is not created if the account never existed and we receive a password change event
    test "should return 200 and if account never existed, there's still no account", %{
      conn: conn
    } do
      account_before = get_test_account()

      # No account for fxa_uid
      assert account_before == nil

      timestamp_ms = 1_565_721_242_227
      event_struct = get_password_change_event(time: timestamp_ms)
      body = get_generic_fxa_event_struct(fxa_uid: get_default_test_uid(), event: event_struct)

      conn
      |> put_resp_content_type("application/json")
      |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
      |> post("/api/v1/events/fxa")

      account_after = get_test_account()

      # Still no account for fxa_uid
      assert account_after == nil
    end
  end

  describe "FxA Events Controller Webhook: Account delete change events" do
    test "should return 200 and delete user event handled correctly", %{conn: conn} do
      expect_orch_delete()
      create_test_account_and_hub(subscribe?: false)
      fxa_uid = get_default_test_uid()

      account = Dash.Account.account_for_fxa_uid(fxa_uid)

      create_capabilities(account, 1)
      subscribe_test_account(nil)

      %Dash.Account{} = account
      hubs = Dash.Hub.hubs_for_account(account)
      [_] = hubs
      [_, _] = Dash.get_all_capabilities_for_account(account)

      event_struct = get_account_delete_event()
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      hubs = Dash.Hub.hubs_for_account(account)
      assert [] === hubs

      assert [] ===
               Dash.get_all_capabilities_for_account(account)

      assert nil == Dash.Account.account_for_fxa_uid(fxa_uid)
    end
  end

  describe "Profile and account email changed event" do
    test "should return :ok for any profile changes that is not email", %{conn: conn} do
      fxa_uid = get_default_test_uid()
      Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      event_struct = get_profile_changed_event()
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)
    end

    test "should return :ok for email changes for account", %{conn: conn} do
      fxa_uid = get_default_test_uid()
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      nil = account.email

      new_email = "new@new.new"
      event_struct = get_email_changed_event(new_email)
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      updated_account = Dash.Account.account_for_fxa_uid(fxa_uid)
      assert new_email === updated_account.email
    end
  end

  describe "Subscription changed event" do
    test "with an unknown capability", %{conn: conn} do
      unknown = "unknown-capability"

      for capabilities <- [[], ["managed-hubs", unknown], [unknown]] do
        token =
          [
            fxa_uid: "dummy-uid",
            event: get_subscription_changed_event(capabilities: capabilities, event_only: false)
          ]
          |> get_generic_fxa_event_struct()
          |> Jason.encode!()

        assert_raise RuntimeError, fn ->
          conn
          |> put_resp_content_type("application/json")
          |> put_req_header("authorization", "Bearer #{token}")
          |> post("/api/v1/events/fxa")
        end
      end
    end

    test "on subscription to personal plan", %{conn: conn} do
      expect_orch_post()
      fxa_uid = "dummy-uid"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      nil = account.auth_updated_at

      token =
        [
          fxa_uid: fxa_uid,
          event:
            get_subscription_changed_event(
              capabilities: ["managed-hubs"],
              event_only: false,
              is_active: true
            )
        ]
        |> get_generic_fxa_event_struct()
        |> Jason.encode!()

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{token}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert fxa_uid
             |> Dash.Account.account_for_fxa_uid()
             |> Map.fetch!(:auth_updated_at)

      assert {:ok, plan} = Dash.fetch_active_plan(account)
      assert "personal" === plan.name
      assert plan.subscription?
      assert [_] = Dash.Hub.hubs_for_account(account)
    end

    test "on subscription to professional plan", %{conn: conn} do
      expect_orch_post()
      fxa_uid = "dummy-uid"
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
      nil = account.auth_updated_at

      token =
        [
          fxa_uid: fxa_uid,
          event:
            get_subscription_changed_event(
              capabilities: ["hubs-professional"],
              event_only: false,
              is_active: true
            )
        ]
        |> get_generic_fxa_event_struct()
        |> Jason.encode!()

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{token}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert fxa_uid
             |> Dash.Account.account_for_fxa_uid()
             |> Map.fetch!(:auth_updated_at)

      assert {:ok, plan} = Dash.fetch_active_plan(account)
      assert "professional" === plan.name
      assert plan.subscription?
      assert [_] = Dash.Hub.hubs_for_account(account)
    end

    test "on plan change", %{conn: conn} do
      expect_orch_post()
      fxa_uid = "dummy-uid"
      the_past = ~U[1970-01-01 00:00:00.000000Z]
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid, "dummy@test.com")
      nil = account.auth_updated_at
      :ok = Dash.subscribe_to_personal_plan(account, the_past)

      token =
        [
          fxa_uid: fxa_uid,
          event:
            get_subscription_changed_event(
              capabilities: ["hubs-professional"],
              event_only: false,
              is_active: true
            )
        ]
        |> get_generic_fxa_event_struct()
        |> Jason.encode!()

      Mox.stub(Dash.HttpMock, :patch, fn _url, _json, _headers, _opts ->
        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{token}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert fxa_uid
             |> Dash.Account.account_for_fxa_uid()
             |> Map.fetch!(:auth_updated_at)

      assert {:ok, plan} = Dash.fetch_active_plan(account)
      assert "professional" === plan.name
      assert plan.subscription?
      assert [_] = Dash.Hub.hubs_for_account(account)
    end

    test "on expiration", %{conn: conn} do
      expect_orch_post()
      fxa_uid = "dummy-uid"
      the_past = ~U[1970-01-01 00:00:00.000000Z]
      account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid, "dummy@test.com")
      nil = account.auth_updated_at
      :ok = Dash.subscribe_to_personal_plan(account, the_past)

      token =
        [
          fxa_uid: fxa_uid,
          event: get_subscription_changed_event(event_only: false, is_active: false)
        ]
        |> get_generic_fxa_event_struct()
        |> Jason.encode!()

      Mox.stub(Dash.HttpMock, :patch, fn _url, _json, _headers, _opts ->
        {:ok, %HTTPoison.Response{status_code: 200}}
      end)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{token}")
             |> put_req_header("content-type", "application/json")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert fxa_uid
             |> Dash.Account.account_for_fxa_uid()
             |> Map.fetch!(:auth_updated_at)

      assert {:ok, plan} = Dash.fetch_active_plan(account)
      assert "starter" === plan.name
      refute plan.subscription?
    end
  end

  describe "create/2" do
    test "No account is created for delete account event", %{conn: conn} do
      fxa_uid = get_default_test_uid()

      false = Dash.has_account_for_fxa_uid?(fxa_uid)

      event_struct = get_account_delete_event()
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert false === Dash.has_account_for_fxa_uid?(fxa_uid)
    end

    test "No account is created password changed event", %{conn: conn} do
      fxa_uid = get_default_test_uid()

      false = Dash.has_account_for_fxa_uid?(fxa_uid)

      timestamp_ms = 1_565_721_242_227
      event_struct = get_password_change_event(time: timestamp_ms)
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert false === Dash.has_account_for_fxa_uid?(fxa_uid)
    end

    test "No account is created for profile changed event", %{conn: conn} do
      fxa_uid = get_default_test_uid()

      event_struct = get_profile_changed_event()
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert false === Dash.has_account_for_fxa_uid?(fxa_uid)
    end

    test "Account is created for subscription changed event", %{conn: conn} do
      expect_orch_post()
      fxa_uid = get_default_test_uid()

      false = Dash.has_account_for_fxa_uid?(fxa_uid)

      event_struct = get_subscription_changed_event(event_only: false)
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert true === Dash.has_account_for_fxa_uid?(fxa_uid)
    end

    test "Deleted account is added to deleted_fxa_account table", %{conn: conn} do
      expect_orch_delete()
      fxa_uid = get_default_test_uid()
      create_test_account_and_hub()

      true = Dash.has_account_for_fxa_uid?(fxa_uid)

      event_struct = get_account_delete_event()
      body = get_generic_fxa_event_struct(fxa_uid: fxa_uid, event: event_struct)

      assert conn
             |> put_resp_content_type("application/json")
             |> put_req_header("authorization", "Bearer #{Jason.encode!(body)}")
             |> post("/api/v1/events/fxa")
             |> response(200)

      assert Dash.was_deleted?(fxa_uid)
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

  defp get_account_delete_event() do
    %{
      "https://schemas.accounts.fxa.local/event/delete-user" => %{}
    }
  end

  defp get_email_changed_event(email) do
    %{
      "https://schemas.accounts.firefox.com/event/profile-change" => %{
        "email" => email
      }
    }
  end

  defp get_profile_changed_event() do
    %{
      "https://schemas.accounts.firefox.com/event/profile-change" => %{
        "displayName" => "display-name"
      }
    }
  end
end
