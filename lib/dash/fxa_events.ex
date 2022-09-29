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
    %{"changeTime" => time} = event_data

    case Dash.Account.set_auth_updated_at(fxa_uid, event_data) do
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
end
