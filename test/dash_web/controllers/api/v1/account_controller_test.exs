defmodule DashWeb.Api.V1.AccountControllerTest do
  use DashWeb.ConnCase

  describe "Account API" do
    setup [:clear_auth_config]

    test "should error for unauthorized users", %{conn: conn} do
      conn = get(conn, "/api/v1/account")
      assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
    end

    test "should error for unverified tokens", %{conn: conn} do
      conn =
        conn
        |> put_test_token(
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
        |> put_test_token(
          %{},
          token_expiry: ~N[2000-01-01 00:00:00]
        )
        |> get("/api/v1/account")

      assert response(conn, 401) == Jason.encode!(%{error: "unauthorized"})
    end

    test "should return account info for authorized users", %{conn: conn} do
      conn =
        conn
        |> put_test_token(
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

  defp put_test_token(conn, fields, opts \\ []) do
    private_key = JOSE.JWK.generate_key({:rsa, 512})

    {_meta, public_key_str} = private_key |> JOSE.JWK.to_public() |> JOSE.JWK.to_pem()
    Application.put_env(:dash, DashWeb.Plugs.Auth, %{auth_pub_key: public_key_str})

    token_expiry_timestamp = NaiveDateTime.diff(opts[:token_expiry], ~N[1970-01-01 00:00:00])
    jwt = JOSE.JWT.from(Map.merge(%{"exp" => token_expiry_timestamp}, fields))
    {_meta, signed_jwt} = JOSE.JWT.sign(private_key, %{"alg" => "RS256"}, jwt)
    signature = if opts[:unverified], do: "unverified", else: signed_jwt["signature"]
    jwt_str = "#{signed_jwt["protected"]}.#{signed_jwt["payload"]}.#{signature}"

    conn |> put_req_cookie("_turkeyauthtoken", jwt_str)
  end

  defp clear_auth_config(_) do
    Application.put_env(:dash, DashWeb.Plugs.Auth, %{})
  end
end
