defmodule DashWeb.Api.V1.AccountController do
  # Handles events from the fxa webhook
  # Example password change event
  # {
  #   "iss": "https://accounts.firefox.com/",
  #   "sub": "FXA_USER_ID",
  #   "aud": "REMOTE_SYSTEM",
  #   "iat": 1565720808,
  #   "jti": "e19ed6c5-4816-4171-aa43-56ffe80dbda1",
  #   "events": {
  #     "https://schemas.accounts.firefox.com/event/password-change": {
  #         "changeTime": 1565721242227
  #     }
  #   }
  # }
  use DashWeb, :controller


  @password_change "/password-change"
  def index(conn, decoded_body) do
    %{
      "sub" => fxa_uid,
      "events" => {
        event => event_data
      }
    } = claims

    result = case event do
      event =~ @password_change ->
        Dash.FxaEvents.handle_password_change(fxa_uid, event_data)
    end

    case result do
      {:ok} ->
        conn
        |> send_resp(200, [])
      _ ->
        # Webhook event handlers errored
        # If response other than 200 is returned, FxA will retry
        conn
        |> send_resp(500, "Internal Server Error")
    end
  end
end
