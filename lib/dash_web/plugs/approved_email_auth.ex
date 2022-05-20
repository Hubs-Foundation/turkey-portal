defmodule DashWeb.Plugs.ApprovedEmailAuth do
  @moduledoc """
  An auth plug for checking if an authenticated user's email address is on the approved list.
  """
  import Plug.Conn
  import Phoenix.Controller

  alias Dash.ApprovedEmail

  def init(default), do: default

  def call(conn, _options) do
    # Default to enabled, unless the config is explicitly set to false.
    approved_email_auth_enabled = Application.get_env(:dash, __MODULE__)[:enabled] !== false

    if approved_email_auth_enabled do
      check_if_approved_email(conn, conn.assigns[:fxa_account_info])
    else
      conn
    end
  end

  defp check_if_approved_email(conn, fxa_account_info) when is_map(fxa_account_info) do
    email = fxa_account_info.fxa_email

    if(!ApprovedEmail.has_email(email)) do
      conn
      |> DashWeb.LogoutController.remove_cookies()
      |> send_resp(403, Jason.encode!(%{error: :user_not_found}))
      |> halt()
    else
      conn
    end
  end

  defp check_if_approved_email(conn, _), do: conn
end
