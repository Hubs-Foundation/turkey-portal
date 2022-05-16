defmodule Dash.ApprovedEmail do
  use Ecto.Schema
  import Ecto.{Changeset, Query}

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

    new_approved_email =
      %ApprovedEmail{}
      |> ApprovedEmail.changeset(new_approved_email_params)
      |> Repo.insert!()

    case new_approved_email do
      %ApprovedEmail{} = _new_approved_email -> IO.puts("Added #{email}")
      _ -> IO.puts("ERROR: could not add #{email}")
    end
  end

  def delete(list_of_emails) when is_list(list_of_emails),
    do: Enum.each(list_of_emails, &delete/1)

  def delete(email) when is_binary(email) do
    hashed_email_to_delete = hash_email(email)

    email_to_delete =
      ApprovedEmail
      |> Repo.get_by(from e in ApprovedEmail, where: e.email_hash == ^hashed_email_to_delete)

    case email_to_delete do
      %ApprovedEmail{} ->
        Repo.delete!(email_to_delete)
        IO.puts("deleted email: #{email}")

      nil ->
        nil
        IO.puts("ERROR: couldn't find email to delete: #{email}")
    end
  end

  def has_email(email) when is_binary(email) do
    hashed_email = hash_email(email)
    Repo.exists?(from e in ApprovedEmail, where: e.email_hash == ^hashed_email)
  end

  def hash_email(email) do
    email |> String.downcase() |> hash()
  end

  defp hash(plaintext, key \\ default_secret_key()) do
    :crypto.hash(:sha256, plaintext <> :crypto.hash(:sha256, plaintext <> key))
    |> :base64.encode()
  end

  defp default_secret_key(), do: Application.get_env(:dash, DashWeb.Endpoint)[:secret_key_base]
end
