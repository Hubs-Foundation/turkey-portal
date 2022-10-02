defmodule Dash.FxaEvents do
  # Handles events sent from FxA via webhook
  require Logger

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
  # Handles password change event
  def handle_password_change(fxa_uid, event_data) do
    %{"changeTime" => fxa_timestamp} = event_data

    utc_datetime = fxa_timestamp_str_to_utc_datetime(fxa_timestamp)

    case Dash.Account.set_auth_updated_at(fxa_uid, utc_datetime) do
      {:ok, _changeset} ->
        {:ok}

      nil ->
        {:ok}

      {:error, _changeset} ->
        Logger.error(
          "Error in Dash.FxaEvents handle_password_change(), likely issue updating account in db."
        )

        {:ok}

      err ->
        Logger.error("Unknown error in Dash.FxaEvents handle_password_change(), #{inspect(err)}")
        {:ok}
    end
  end

  def fxa_timestamp_str_to_utc_datetime(fxa_timestamp_str) when is_binary(fxa_timestamp_str) do
    {timestamp, _} = Integer.parse(fxa_timestamp_str)
    DateTime.from_unix!(timestamp, :millisecond) |> DateTime.truncate(:second)
  end

  def fxa_timestamp_str_to_utc_datetime(fxa_timestamp) when is_integer(fxa_timestamp) do
    DateTime.from_unix!(fxa_timestamp, :millisecond) |> DateTime.truncate(:second)
  end
end