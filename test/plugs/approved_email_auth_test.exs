defmodule DashWeb.Plugs.ApprovedEmailAuthTest do
  use DashWeb.ConnCase
  import DashWeb.TestHelpers
  alias Dash.{ApprovedEmail, Repo}

  describe "Approved Email Auth Plugs Test" do
    setup do
      # Explicitly get a connection before each test
      :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
      clear_auth_config()
      Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: true)
      Application.put_env(:dash, DashWeb.Plugs.BasicAuth, enabled: false)
    end

    @valid_expiration token_expiry: ~N[3000-01-01 00:00:00]

    # Disabled test
    # Should not be enabled when disabled env
    test "ApprovedEmails should not be enabled when disabled", %{conn: conn} do
      Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: false)

      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 200)
    end

    # if no token/email on the conn, should do nothing to the conn
    test "should give 401 for unauthorized users by passing ApprovedEmailAuth and NOT a 403", %{
      conn: conn
    } do
      conn = get(conn, "/api/v1/account")

      # Passes through ApprovedEmailAuth without responding with a 403
      assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
    end

    # if email on the conn and it's authorized, should do nothing to the conn
    test "should respond with 200 if user is on ApprovedEmailList and authorized", %{conn: conn} do
      email = get_test_email()

      ApprovedEmail.add(email)

      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert json_response(conn, 200)["email"] === email
    end

    test "should respond with 403, if user is not on ApprovedEmailList", %{conn: conn} do
      conn =
        conn
        |> put_test_token(@valid_expiration)
        |> get("/api/v1/account")

      assert response(conn, 403) == Jason.encode!(%{error: "forbidden"}) && conn.halted
    end
  end
end
