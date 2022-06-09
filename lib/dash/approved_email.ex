defmodule Dash.ApprovedEmail do
  use Ecto.Schema
  import Ecto.{Changeset, Query}
  require Logger

  alias Dash.{ApprovedEmail, Repo}

  schema "approved_emails" do
    field :email_hash, :string

    timestamps()
  end

  @doc false
  def changeset(approved_email, attrs) do
    approved_email
    |> cast(attrs, [:email_hash])
    |> validate_required([:email_hash])
    |> unique_constraint(:email_hash)
  end

  def add(list_of_emails) when is_list(list_of_emails), do: Enum.each(list_of_emails, &add/1)

  def add(email) when is_binary(email) do
    new_approved_email_params = %{
      email_hash: hash_email(email)
    }

    approved_email_tuple =
      %ApprovedEmail{}
      |> ApprovedEmail.changeset(new_approved_email_params)
      |> Repo.insert()

    case approved_email_tuple do
      {:ok, _approved_email} ->
        Logger.info("Added email")

      {:error, error} ->
        Logger.error("ERROR: Could not add email.")
        # Return tuple for tests
        {:error, error}
    end
  end

  def delete(list_of_emails) when is_list(list_of_emails),
    do: Enum.each(list_of_emails, &delete/1)

  def delete(email) when is_binary(email) do
    hashed_email_to_delete = hash_email(email)

    email_to_delete =
      ApprovedEmail
      |> Repo.get_by(email_hash: hashed_email_to_delete)

    case email_to_delete do
      %ApprovedEmail{} ->
        Repo.delete!(email_to_delete)
        Logger.info("Deleted email")

      nil ->
        Logger.error("ERROR: couldn't find email to delete")
    end
  end

  def is_forbidden(email) do
    is_enabled() and !has_email(email)
  end

  def has_email(email) when is_binary(email) do
    hashed_email = hash_email(email)
    Repo.exists?(from e in ApprovedEmail, where: e.email_hash == ^hashed_email)
  end

  def hash_email(email) do
    email |> String.downcase() |> hash()
  end

  def is_enabled() do
    # Default to enabled, unless the config is explicitly set to false.
    Application.get_env(:dash, __MODULE__)[:enabled] !== false
  end

  defp hash(plaintext, key \\ default_secret_key()) do
    :crypto.hash(:sha256, plaintext <> :crypto.hash(:sha256, plaintext <> key))
    |> :base64.encode()
  end

  defp default_secret_key(), do: Application.get_env(:dash, DashWeb.Endpoint)[:secret_key_base]
end
