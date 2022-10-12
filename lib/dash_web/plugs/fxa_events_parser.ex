defmodule DashWeb.Plugs.FxaEventsParser do
  @moduledoc """
  Parse the FxA Event tokens from the authorization header
  """
  # TODO EA set up JWT token parsing
  import Plug.Conn

  def init(default), do: default

  def call(conn, _options) do
    verify_authorization_header(conn)
  end

  def verify_authorization_header(conn) do
    [header_value] = conn |> get_req_header("authorization")

    IO.inspect(["fxa_events_parser", header_value])

    with [maybe_bearer, value] <- String.split(header_value),
         true <- matches_bearer_pattern(maybe_bearer),
         parsed_token <- parse_token(value) do
      conn |> assign(:fxa_event, parsed_token)
    else
      _ ->
        conn
        |> send_resp(
          401,
          "unauthorized"
        )
        |> halt()
    end
  end

  defp parse_token(value) do
    # TODO will do JWT authentication here
    # TODO verify the correct FxA event fields and values
    # For now just take the stringified JSON into an elixir readable struct
    Jason.decode!(value)
  end

  @regex_bearer ~r"^Bearer$"
  defp matches_bearer_pattern(value) do
    Regex.match?(@regex_bearer, value)
  end
end
