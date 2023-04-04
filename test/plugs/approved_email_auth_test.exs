defmodule DashWeb.Plugs.ApprovedEmailAuthTest do
  use DashWeb.ConnCase

  import Dash.TestHelpers
  import Mox
  alias Dash.ApprovedEmail

  setup_all do
    setup_http_mocks()
    on_exit(fn -> exit_http_mocks() end)
  end

  setup [:verify_on_exit!]

  describe "ApprovedEmailAuth Plug" do
    setup do
      clear_auth_config()
      merge_module_config(:dash, Dash.ApprovedEmail, enabled: true)
      on_exit(fn -> merge_module_config(:dash, Dash.ApprovedEmail, enabled: false) end)
    end

    @valid_expiration token_expiry: ~N[3000-01-01 00:00:00]

    test "ApprovedEmails should not be enabled when disabled", %{conn: conn} do
      merge_module_config(:dash, Dash.ApprovedEmail, enabled: false)

      stub_ret_get()
      expect_orch_post()
      subscribe_test_account(nil)

      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/hubs")

      assert response(conn, 200)
    end

    # if no token/email on the conn, should do nothing to the conn
    test "should give 401 for unauthorized users by passing ApprovedEmailAuth and NOT a 403", %{
      conn: conn
    } do
      conn = get(conn, "/api/v1/hubs")

      # Passes through ApprovedEmailAuth without responding with a 403
      assert response(conn, 401) ==
               Jason.encode!(DashWeb.Plugs.Auth.unauthorized_auth_redirect_struct())
    end

    # if email on the conn and it's authorized, should do nothing to the conn
    test "should respond with 200 if user is on ApprovedEmailList and authorized", %{conn: conn} do
      stub_ret_get()
      expect_orch_post()
      subscribe_test_account(nil)

      email = get_test_email()

      ApprovedEmail.add(email)

      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/hubs")

      assert response(conn, 200)
    end

    test "should respond with 403, if user is not on ApprovedEmailList", %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/hubs")

      assert response(conn, 403) == Jason.encode!(%{error: "forbidden"}) && conn.halted
    end
  end
end
