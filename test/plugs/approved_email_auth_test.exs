defmodule DashWeb.Plugs.ApprovedEmailAuthTest do
  use DashWeb.ConnCase
  alias Dash.{ApprovedEmail, Repo, TokenTestHelper}

  describe "Approved Email Auth Plugs Test" do
    setup do
      # Explicitly get a connection before each test
      :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
      TokenTestHelper.clear_auth_config()
      Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: true)
      Application.put_env(:dash, DashWeb.Plugs.BasicAuth, enabled: false)
    end

    @email1 "email1@email.com"
    @email1_test_token %{
      "sub" => "fake-uid",
      "fxa_email" => @email1,
      "fxa_pic" => "https://fake.com/pic.jpg",
      "fxa_displayName" => "Faker McFakerson"
    }
    @valid_expiration token_expiry: ~N[3000-01-01 00:00:00]

    # Disabled test
    # Should not be enabled when disabled env
    test "ApprovedEmails should not be enabled when disabled", %{conn: conn} do
      Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: false)

      conn =
        conn
        |> TokenTestHelper.put_test_token(
          @email1_test_token,
          @valid_expiration
        )
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
      ApprovedEmail.add(@email1)

      conn =
        conn
        |> TokenTestHelper.put_test_token(
          @email1_test_token,
          @valid_expiration
        )
        |> get("/api/v1/account")

      assert json_response(conn, 200)["email"] === @email1
    end

    test "should respond with 403, if user is not on ApprovedEmailList", %{conn: conn} do
      conn =
        conn
        |> TokenTestHelper.put_test_token(
          @email1_test_token,
          @valid_expiration
        )
        |> get("/api/v1/account")

      assert response(conn, 403) == Jason.encode!(%{error: "forbidden"}) && conn.halted
    end
  end
end
