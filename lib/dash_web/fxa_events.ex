defmodule DashWeb.FxaEvents do
  @moduledoc """
   Handles events sent from FxA via webhook
  """
  import Dash.Utils, only: [capability_string: 0]
  import Ecto.Query, only: [from: 2]
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
          "changeTime": 1565721242227
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
          "Error in #{__MODULE__} handle_password_change(), likely issue updating account in db."
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

  # TODO: Remove this clause after Subplat errors end (written 5/16/2023)
  def handle_subscription_changed_event(_fxa_uid, %{
        "capabilities" => ["fpn-browser"],
        "isActive" => _is_active,
        "changeTime" => _milliseconds
      }),
      do: :ok

  @spec handle_subscription_changed_event(String.t(), event_data) :: :ok | :error
  def handle_subscription_changed_event(fxa_uid, %{
        "capabilities" => capabilities,
        "isActive" => is_active,
        "changeTime" => milliseconds
      }) do
    if capabilities !== [capability_string()] do
      raise "unknown capabilities for subscription changed event: #{Enum.join(capabilities, ", ")}"
    end

    datetime = DateTime.from_unix!(milliseconds * 1_000, :microsecond)
    truncated_datetime = unix_to_utc_datetime(milliseconds)
    account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)

    if is_active do
      with {:error, reason} <- Dash.subscribe_to_standard_plan(account, datetime) do
        Logger.warning("could not subscribe to standard plan for reason: #{reason}")
      end
    else
      # nested if-else instead of cond only because this feature flag is meant
      # to be short-lived
      if Application.fetch_env!(:dash, :starter_plan_enabled?) do
        with {:error, reason} <- Dash.expire_plan_subscription(account, datetime) do
          Logger.warning("could not expire plan subscription for reason: #{reason}")
        end
      else
        Dash.delete_all_hubs_for_account(account)
        # This is a temporary solution to prevent Standard plan features from
        # remaining in effect after subscription expiration.  It can be replaced
        # when the “stop” FSM event is implemented.
        Dash.Repo.delete_all(from p in Dash.Plan, where: p.account_id == ^account.account_id)
      end
    end

    Dash.update_or_create_capability_for_changeset(%{
      fxa_uid: fxa_uid,
      capability: capability_string(),
      is_active: is_active,
      change_time: truncated_datetime
    })

    Dash.Account.set_auth_updated_at(fxa_uid, truncated_datetime)
    :ok
  end

  ## Helpers

  defp unix_to_utc_datetime(unix) when is_integer(unix),
    do:
      unix
      |> DateTime.from_unix!(:millisecond)
      |> DateTime.truncate(:second)
end
