defmodule Dash.ApprovedEmail do
  use Ecto.Schema
  import Ecto.Changeset

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
      %Dash.ApprovedEmail{}
      |> Dash.ApprovedEmail.changeset(new_approved_email_params)
      |> Dash.Repo.insert!()

    case new_approved_email do
      %Dash.ApprovedEmail{} = new_approved_email -> IO.puts("Added #{email}")
      _ -> IO.puts("ERROR: could not add #{email}")
    end
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
