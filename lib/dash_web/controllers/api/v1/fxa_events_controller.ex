defmodule DashWeb.Api.V1.FxaEventsController do
  @moduledoc """
  The webhook endpoint for FxA
  """
  use DashWeb, :controller

  alias DashWeb.FxaEvents
  require Logger

  @password_change "/password-change"
  @delete_user "/delete-user"
  @profile_change "/profile-change"
  @subscription_changed "/subscription-state-change"

  def create(conn, _) do
    fxa_event = conn.assigns.fxa_event
    %{"events" => events, "sub" => fxa_uid} = fxa_event
    [{event, event_data}] = Map.to_list(events)
    Logger.warning("Testing event_data #{event} and FULL fxa_event is: #{inspect(fxa_event)}")
    Logger.warning("Passing in event_data #{inspect(event_data)}")

    result =
      cond do
        event =~ @password_change ->
          FxaEvents.handle_password_change(fxa_uid, event_data)

        event =~ @delete_user ->
          FxaEvents.handle_account_deletion_event(fxa_uid)

        event =~ @profile_change ->
          FxaEvents.handle_profile_change(fxa_uid, event_data)

        event =~ @subscription_changed ->
          FxaEvents.handle_subscription_changed_event(fxa_uid, event_data)

        true ->
          Logger.warning(
            "FxaEventsController create: No events matched for the given FxA event. Event is #{event} #{inspect(event_data)}"
          )

          # TODO EA make this error before launch
          :error
      end

    case result do
      :ok ->
        conn
        |> send_resp(200, [])

      _ ->
        # Webhook event handlers errored
        # If response other than 200 is returned, FxA will retry
        Logger.warning("FxaEventsController hit random error: FxA will retry")

        conn
        |> send_resp(500, "Internal Server Error")
    end
  end
end
