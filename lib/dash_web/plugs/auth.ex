defmodule DashWeb.Plugs.Auth do
  @moduledoc """
  Authenticates a user via JWT cookie supplied by our auth server

  jwt claims format
  {
    "exp": 123,
    "fxa_2fa": false,
    "fxa_email": "email@email.email",
    "fxa_pic": "https://profile.stage.mozaws.net/v1/avatar/z",
    "iat": 123,
    "iss": "",
    "sub": "123abc",
    "fxa_displayName": "Name"
  }
  """
  import Plug.Conn

  @cookie_name "_turkeyauthtoken"
  @algo "RS256"

  def init(default), do: default

  def call(conn, _options) do
    results = conn |> get_auth_cookie() |> process_and_verify_jwt()

    conn |> process_jwt(results)
  end

  defp get_auth_cookie(conn) do
    conn.req_cookies[@cookie_name]
  end

  # Authorized
  defp process_jwt(conn, %{is_valid: true, claims: claims}) do
    %{
      "fxa_email" => fxa_email,
      "sub" => fxa_uid,
      "fxa_pic" => fxa_pic,
      "fxa_displayName" => fxa_display_name,
      "iat" => issued_at,
      "exp" => expiration_at
    } = claims

    account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)

    conn
    |> assign(:account, account)
    |> assign(:fxa_account_info, %Dash.FxaAccountInfo{
      fxa_pic: fxa_pic,
      fxa_display_name: fxa_display_name,
      fxa_email: fxa_email
    })
  end

  # Not authorized or empty jwt
  defp process_jwt(conn, %{is_valid: false, claims: _claims}) do
    conn
    |> send_resp(401, Jason.encode!(%{error: "unauthorized"}))
    |> halt()
  end

  # Returns true if pem verifies the jwt, false if not
  defp process_and_verify_jwt(nil), do: %{is_valid: false, claims: %{}}
  defp process_and_verify_jwt(""), do: %{is_valid: false, claims: %{}}

  defp process_and_verify_jwt(jwt) do
    jwk = JOSE.JWK.from_pem(Application.get_env(:dash, DashWeb.Plugs.Auth)[:auth_pub_key])
    {is_verified, jwt_struct, _} = JOSE.JWT.verify_strict(jwk, [@algo], jwt)
    %JOSE.JWT{fields: %{"exp" => exp} = claims} = jwt_struct

    exp_converted = NaiveDateTime.add(~N[1970-01-01 00:00:00], exp)

    is_valid =
      case NaiveDateTime.compare(exp_converted, NaiveDateTime.utc_now()) do
        :lt -> false
        _ -> is_verified
      end

    %{is_valid: is_valid, claims: claims}
  end

  def get_cookie_name(), do: @cookie_name
end
