defmodule PrtlWeb.Plugs.Auth do
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
    %{"fxa_email" => fxa_email, "sub" => fxa_uid} = claims
    # TODO check expiration?

    account = Prtl.Account.find_or_create_account_for_fxa_uid(fxa_uid)
    # free hub create as well

    conn
    |> assign(:account, account)
    |> assign(:fxa_email, fxa_email)
  end

  # Not authorized or empty jwt
  # TODO add redirect to get authenticated to auth server
  defp process_jwt(conn, %{is_valid: false, claims: _claims}) do
    send_resp(conn, 401, "unauthorized")
    # TODO send redirect header to login page here
    |> halt()
  end

  # Returns true if pem verifies the jwt, false if not
  defp process_and_verify_jwt(nil), do: false
  defp process_and_verify_jwt(""), do: false

  defp process_and_verify_jwt(jwt) do
    jwk = JOSE.JWK.from_pem(Application.get_env(:prtl, PrtlWeb.Plugs.Auth)[:auth_pub_key])
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
