defmodule DashWeb.Plugs.ApprovedEmailAuth do
  @moduledoc """
  An auth plug for checking if an authenticated user's email address is on the approved list.
  """
  import Plug.Conn
  import Phoenix.Controller

  def init(default), do: default

  def call(conn, _options) do
    # Default to enabled, unless the config is explicitly set to false.
    approved_email_auth_enabled = Application.get_env(:dash, __MODULE__)[:enabled] !== false

    if approved_email_auth_enabled do
      check_if_approved_email(conn)
    else
      conn
    end
  end

  defp check_if_approved_email(conn) do
    email = conn.assigns[:fxa_account_info].fxa_email

    if(!ApprovedEmail.has_email(email)) do
      conn
      |> put_root_layout({DashWeb.LayoutView, :root})
      |> put_layout({DashWeb.LayoutView, :app})
      |> put_view(DashWeb.PageView)
      |> render("401_unapproved_email.html")
      |> halt()
    else
      conn
    end
  end
end
