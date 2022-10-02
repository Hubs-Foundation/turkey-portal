defmodule DashWeb.Api.V1.FxaEventsController do
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
  require Logger

  @password_change "/password-change"
  def index(conn, _) do
    fxa_event = conn.assigns[:fxa_event]

    %{
      "sub" => fxa_uid,
      "events" => events
    } = fxa_event

    # Only one event each time
    {event, event_data} = List.first(get_key_value_array(events))

    result =
      cond do
        event =~ @password_change ->
          Dash.FxaEvents.handle_password_change(fxa_uid, event_data)

        true ->
          Logger.warn(
            "FxaEventsController index: No events matched for the given FxA event. Event is #{event} #{inspect(event_data)}"
          )

          {:ok}
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

  defp get_key_value_array(obj) do
    Enum.map(obj, fn {k, v} -> {k, v} end)
  end
end
