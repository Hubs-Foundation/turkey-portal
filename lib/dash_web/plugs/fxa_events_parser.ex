defmodule DashWeb.Plugs.FxaEventsParser do
  @moduledoc """
  Parse the FxA Event tokens from the authorization header
  """
  import Plug.Conn
  require Logger

  def init(default), do: default

  def call(conn, _options) do
    verify_authorization_header(conn)
  end

  def verify_authorization_header(conn) do
    [header_token] = conn |> get_req_header("authorization")
    jwks_string = Application.get_env(:dash, __MODULE__)[:fxa_jwk_string]

    with [maybe_bearer, token] <- String.split(header_token),
         true <- matches_bearer_pattern(maybe_bearer),
         {:ok, claims} <- parse_token(token, jwks_string) do
      conn |> assign(:fxa_event, claims)
    else
      _ ->
        Logger.warn(
          "Warn: FxaEventsParser issue parsing authorization header in verify_authorization_header/1"
        )

        conn
        |> send_resp(
          401,
          "unauthorized"
        )
        |> halt()
    end
  end

  # TODO add a JWK parsing flow for dev and test environments
  def parse_token(token, "dev-hdwEqn1cHs69TT3"), do: {:ok, Jason.decode!(token)}

  def parse_token(token, "test-aC2KtiGDxtqvNmv") do
    {:ok, Jason.decode!(token)}
  end

  def parse_token(token, fxa_key_string) do
    # TODO fetch FXA_JWK_STRING on startup and put into environment variable

    fxa_jwks = Jason.decode!(fxa_key_string)
    [jwk | _] = JOSE.JWK.from_map(fxa_jwks["keys"])

    case JOSE.JWT.verify_strict(jwk, ["RS256"], token) do
      {true, jwt_struct, _} ->
        %JOSE.JWT{fields: claims} = jwt_struct
        {:ok, claims}

      _ ->
        Logger.warn("Warn: FxaEventsParser issue verifying token in parse_token/2")
        :error
    end
  end

  @regex_bearer ~r"^Bearer$"
  defp matches_bearer_pattern(value) do
    Regex.match?(@regex_bearer, value)
  end
end
