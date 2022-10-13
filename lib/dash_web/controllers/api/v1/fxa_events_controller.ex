defmodule DashWeb.Api.V1.FxaEventsController do
  @moduledoc """
  The webhook endpoint for FxA
  """
  use DashWeb, :controller

  require Logger

  @password_change "/password-change"
  @delete_user "/delete-user"
  def index(conn, _) do
    fxa_event = conn.assigns[:fxa_event]

    %{
      "sub" => fxa_uid,
      "events" => events
    } = fxa_event

    # Only one event each time
    {event, event_data} =
      events
      |> Map.to_list()
      |> List.first()

    result =
      cond do
        event =~ @password_change ->
          Dash.FxaEvents.handle_password_change(fxa_uid, event_data)

        event =~ @delete_user ->
          Dash.FxaEvents.handle_account_deletion_event(fxa_uid)

        true ->
          Logger.warn(
            "FxaEventsController index: No events matched for the given FxA event. Event is #{event} #{inspect(event_data)}"
          )

          :error
      end

    case result do
      :ok ->
        conn
        |> send_resp(200, [])

      _ ->
        # Webhook event handlers errored
        # If response other than 200 is returned, FxA will retry
        Logger.warn("FxaEventsController hit random error: FxA will retry")

        conn
        |> send_resp(500, "Internal Server Error")
    end
  end
end
