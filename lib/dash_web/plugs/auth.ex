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
    "fxa_subscriptions": [
       "managed-hubs"
    ] OR nil
  }
  """
  use DashWeb, :controller

  import Plug.Conn
  require Logger

  @cookie_name "_turkeyauthtoken"
  @algo "RS256"
  @subscription_string "managed-hubs"

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
      "fxa_subscriptions" => fxa_subscriptions_nil_or_list,
      "fxa_cancel_at_period_end" => fxa_cancel_at_period_end,
      "fxa_current_period_end" => fxa_current_period_end,
      "fxa_plan_id" => fxa_plan_id
    } = claims

    # Ensure fxa_subscriptions is type [] and not nil
    fxa_subscriptions =
      if is_nil(fxa_subscriptions_nil_or_list), do: [], else: fxa_subscriptions_nil_or_list

    account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
    now = DateTime.to_unix(DateTime.utc_now())

    cond do
      !is_nil(account.auth_updated_at) and
          DateTime.compare(timestamp_s_to_datetime(issued_at), account.auth_updated_at) == :lt ->
        # If token issued before an Authorization change in the account, invalidate token and login again
        process_jwt(conn, %{is_valid: false, claims: claims})

      fxa_current_period_end != 0 and fxa_current_period_end < now ->
        # Current subscription period ended, get next period information
        process_jwt(conn, %{is_valid: false, claims: claims})

      true ->
        # Successfully authenticated
        conn
        |> assign(:account, account)
        |> assign(:fxa_account_info, %Dash.FxaAccountInfo{
          fxa_pic: fxa_pic,
          fxa_display_name: fxa_display_name,
          fxa_email: fxa_email,
          has_subscription?: @subscription_string in fxa_subscriptions
        })
        |> assign(:fxa_subscription, %Dash.FxaSubscription{
          fxa_cancel_at_period_end: fxa_cancel_at_period_end,
          fxa_current_period_end: fxa_current_period_end,
          fxa_plan_id: fxa_plan_id
        })
    end
  end

  # Not authorized or empty jwt
  defp process_jwt(conn, %{is_valid: false, claims: _claims}) do
    conn
    |> clear_cookie()
    |> send_resp(
      401,
      Jason.encode!(unauthorized_auth_redirect_struct())
    )
    |> halt()
  end

  # Returns true if pem verifies the jwt, false if not
  defp process_and_verify_jwt(nil), do: %{is_valid: false, claims: %{}}
  defp process_and_verify_jwt(""), do: %{is_valid: false, claims: %{}}

  defp process_and_verify_jwt(jwt) do
    jwk = JOSE.JWK.from_pem(Application.get_env(:dash, __MODULE__)[:auth_pub_key])

    case JOSE.JWT.verify_strict(jwk, [@algo], jwt) do
      {is_verified, jwt_struct, _} ->
        %JOSE.JWT{fields: %{"exp" => exp} = claims} = jwt_struct
        exp_converted = NaiveDateTime.add(~N[1970-01-01 00:00:00], exp)

        is_valid =
          case NaiveDateTime.compare(exp_converted, NaiveDateTime.utc_now()) do
            :lt -> false
            _ -> is_verified
          end

        %{is_valid: is_valid, claims: claims}

      _ ->
        # Could not be verified so must be something other than a jwt token
        %{is_valid: false, claims: nil}
    end
  end

  def get_cookie_name(), do: @cookie_name

  def unauthorized_auth_redirect_struct, do: %{error: "unauthorized", redirect: "auth"}

  def get_subscription_string() do
    @subscription_string
  end

  def timestamp_s_to_datetime(timestamp_s) do
    DateTime.from_unix!(timestamp_s, :second)
  end

  def clear_cookie(conn) do
    cookie_secure = Application.get_env(:dash, __MODULE__)[:cookie_secure]

    put_resp_cookie(
      conn,
      @cookie_name,
      "",
      path: "/",
      domain: DashWeb.LogoutController.cluster_domain(conn),
      http_only: true,
      secure: cookie_secure,
      max_age: 0
    )
  end
end
