defmodule Dash.FxaEvents do
  @moduledoc """
   Handles events sent from FxA via webhook
  """
  require Logger

  @type event_data :: %{String.t() => String.t() | [String.t(), ...]}
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
          "changeTime": "1565721242227"
      }
    }
  }
  """

  # Handles password change event
  def handle_password_change(fxa_uid, %{"changeTime" => fxa_timestamp} = _event_data) do
    utc_datetime = unix_to_utc_datetime(fxa_timestamp)

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
    account = Dash.Account.account_for_fxa_uid(fxa_uid)

    case account do
      nil ->
        Logger.warn("FxA account deletion error: No account for fxa_uid to delete")

        Dash.fxa_uid_to_deleted_list!(fxa_uid)
        :ok

      %Dash.Account{} ->
        Dash.Account.delete_account_and_hubs(account)
        Dash.fxa_uid_to_deleted_list!(fxa_uid)
    end
  end

  @spec handle_profile_change(String.t(), event_data) :: :ok
  def handle_profile_change(fxa_uid, %{"email" => new_email}) do
    account = Dash.Account.account_for_fxa_uid(fxa_uid)

    with :error <- Dash.change_email(account, new_email) do
      Logger.error("FxA profile event error: Could not update the accounts email with new email")
      :ok
    end
  end

  # Not an email changed event, other profile data changed, no action
  def handle_profile_change(_fxa_uid, _event_data), do: :ok

  @spec handle_subscription_changed_event(String.t(), event_data) :: :ok | :error
  def handle_subscription_changed_event(
        fxa_uid,
        %{"capabilities" => capabilities, "isActive" => is_active, "changeTime" => change_time} =
          _event_data
      ) do
    change_time_dt = unix_to_utc_datetime(change_time)

    for capability <- capabilities do
      Dash.update_or_create_capability_for_changeset(%{
        fxa_uid: fxa_uid,
        capability: capability,
        is_active: is_active,
        change_time: change_time_dt
      })

      if not is_active and capability == DashWeb.Plugs.Auth.capability_string() do
        account = Dash.Account.account_for_fxa_uid(fxa_uid)
        Dash.delete_all_hubs_for_account(account)
      end
    end

    Dash.Account.set_auth_updated_at(fxa_uid, change_time_dt)

    :ok
  end

  def unix_to_utc_datetime(fxa_timestamp_str) when is_binary(fxa_timestamp_str) do
    {timestamp, _} = Integer.parse(fxa_timestamp_str)

    timestamp
    |> DateTime.from_unix!(:millisecond)
    |> DateTime.truncate(:second)
  end

  def unix_to_utc_datetime(fxa_timestamp) when is_integer(fxa_timestamp) do
    fxa_timestamp
    |> DateTime.from_unix!(:millisecond)
    |> DateTime.truncate(:second)
  end
end
