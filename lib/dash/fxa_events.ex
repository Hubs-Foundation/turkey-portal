defmodule Dash.FxaEvents do
  @moduledoc """
   Handles events sent from FxA via webhook
  """
  require Logger

  @doc """
  Example password change event
  {
    "iss": "https://accounts.firefox.com/",
    "sub": "FXA_USER_ID",
    "aud": "REMOTE_SYSTEM",
    "iat": 1565720808,
    "jti": "e19ed6c5-4816-4171-aa43-56ffe80dbda1",
    "events": {
      "https://schemas.accounts.firefox.com/event/password-change": {
          "changeTime": 1565721242227
      }
    }
  }
  """

  # Handles password change event
  def handle_password_change(fxa_uid, %{"changeTime" => fxa_timestamp} = _event_data) do
    utc_datetime = fxa_timestamp_str_to_utc_datetime(fxa_timestamp)

    case Dash.Account.set_auth_updated_at(fxa_uid, utc_datetime) do
      {:ok, _changeset} ->
        :ok

      nil ->
        :ok

      {:error, _changeset} ->
        Logger.error(
          "Error in Dash.FxaEvents handle_password_change(), likely issue updating account in db."
        )

        :ok
    end
  end

  def handle_account_deletion_event(fxa_uid) do
    case Dash.Account.delete_account_and_hubs(fxa_uid) do
      :ok ->
        :ok

      :error ->
        Logger.error("Error in handle_account_deletion_event.")
    end
  end

  def fxa_timestamp_str_to_utc_datetime(fxa_timestamp_str) when is_binary(fxa_timestamp_str) do
    {timestamp, _} = Integer.parse(fxa_timestamp_str)

    timestamp
    |> DateTime.from_unix!(:millisecond)
    |> DateTime.truncate(:second)
  end

  def fxa_timestamp_str_to_utc_datetime(fxa_timestamp) when is_integer(fxa_timestamp) do
    fxa_timestamp
    |> DateTime.from_unix!(:millisecond)
    |> DateTime.truncate(:second)
  end
end
