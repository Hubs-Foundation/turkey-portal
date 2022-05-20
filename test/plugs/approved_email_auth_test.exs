defmodule DashWeb.Plugs.ApprovedEmailAuthTest do
  use DashWeb.ConnCase
  alias Dash.{ApprovedEmail, Repo, TokenTestHelper}

  describe "Approved Email Auth Plugs Test" do
    setup do
      # Explicitly get a connection before each test
      :ok = Ecto.Adapters.SQL.Sandbox.checkout(Repo)
    end

    @email1 "email1@email.com"

    defp enableApprovedEmailAuth() do
      Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: true)
    end

    defp disableApprovedEmailAuth() do
      Application.put_env(:dash, DashWeb.Plugs.ApprovedEmailAuth, enabled: false)
    end

    # Disabled test
    # Should not be enabled when disabled env
    test "ApprovedEmails should not be enabled when disabled", %{conn: conn} do
      disableApprovedEmailAuth()
      Application.put_env(:dash, DashWeb.Plugs.BasicAuth, enabled: false)

      TokenTestHelper.put_test_token(
        conn,
        %{
          "sub" => "fake-uid",
          "fxa_email" => @email1,
          "fxa_pic" => "https://fake.com/pic.jpg",
          "fxa_displayName" => "Faker McFakerson"
        },
        token_expiry: ~N[3000-01-01 00:00:00]
      )

      conn = get(conn, "/api/v1/account")
      assert ApprovedEmail.has_email(@email1) === false && response(conn, 200)
    end

    # # if no email on the conn, should do nothing to the conn
    # test "should not give a 403 for unauthorized users", %{conn: conn} do
    #   conn = get(conn, "/api/v1/account")
    #   assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
    # end

    # # if email on the conn and it's authorized, should do nothing to the conn

    # # if email is not authorized, should give a 403 and halt conn
    # test "should respond with 403 if user is not on approved email list" do
    #   conn = get(conn, "/api/v1/account")
    #   assert conn.halted && response(conn, 403) == Jason.encode!(%{error: "forbidden"})
    # end
  end

  # describe "Account API" do
  #   setup [:clear_auth_config]

  #   test "should error for unauthorized users", %{conn: conn} do
  #     conn = get(conn, "/api/v1/account")
  #     assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
  #   end

  #   test "should error for unverified tokens", %{conn: conn} do
  #     conn =
  #       conn
  #       |> put_test_token(
  #         %{},
  #         token_expiry: ~N[3000-01-01 00:00:00],
  #         unverified: true
  #       )
  #       |> get("/api/v1/account")

  #     assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
  #   end

  #   test "should error for expired tokens", %{conn: conn} do
  #     conn =
  #       conn
  #       |> put_test_token(
  #         %{},
  #         token_expiry: ~N[2000-01-01 00:00:00]
  #       )
  #       |> get("/api/v1/account")

  #     assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
  #   end

  #   test "should return account info for authorized users", %{conn: conn} do
  #     conn =
  #       conn
  #       |> put_test_token(
  #         %{
  #           "sub" => "fake-uid",
  #           "fxa_email" => "email@fake.com",
  #           "fxa_pic" => "https://fake.com/pic.jpg",
  #           "fxa_displayName" => "Faker McFakerson"
  #         },
  #         token_expiry: ~N[3000-01-01 00:00:00]
  #       )
  #       |> get("/api/v1/account")

  #     assert json_response(conn, 200)["email"] === "email@fake.com"
  #   end
  # end

  # defp put_test_token(conn, fields, opts \\ []) do
  #   private_key = JOSE.JWK.generate_key({:rsa, 512})

  #   {_meta, public_key_str} = private_key |> JOSE.JWK.to_public() |> JOSE.JWK.to_pem()
  #   Application.put_env(:dash, DashWeb.Plugs.Auth, %{auth_pub_key: public_key_str})

  #   token_expiry_timestamp = NaiveDateTime.diff(opts[:token_expiry], ~N[1970-01-01 00:00:00])
  #   jwt = JOSE.JWT.from(Map.merge(%{"exp" => token_expiry_timestamp}, fields))
  #   {_meta, signed_jwt} = JOSE.JWT.sign(private_key, %{"alg" => "RS256"}, jwt)
  #   signature = if opts[:unverified], do: "unverified", else: signed_jwt["signature"]
  #   jwt_str = "#{signed_jwt["protected"]}.#{signed_jwt["payload"]}.#{signature}"

  #   conn |> put_req_cookie("_turkeyauthtoken", jwt_str)
  # end

  # defp clear_auth_config(_) do
  #   Application.put_env(:dash, DashWeb.Plugs.Auth, %{})
  # end
end
