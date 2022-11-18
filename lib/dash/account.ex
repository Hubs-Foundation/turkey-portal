defmodule Dash.Account do
  use Ecto.Schema

  import Ecto.Changeset
  require Logger
  alias Dash.Repo

  @primary_key {:account_id, :id, autogenerate: true}

  schema "accounts" do
    field :fxa_uid, :string
    field :auth_updated_at, :utc_datetime
    field :email, :string

    timestamps()
  end

  def changeset(account, attrs) do
    account
    |> cast(attrs, [:fxa_uid, :email])
    |> validate_required([:fxa_uid])
    |> unique_constraint(:fxa_uid)
  end

  def account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    Repo.get_by(Dash.Account, fxa_uid: fxa_uid)
  end

  def find_or_create_account_for_fxa_uid(fxa_uid, email)
      when is_binary(fxa_uid) and is_binary(email) do
    account = account_for_fxa_uid(fxa_uid)

    case account do
      %Dash.Account{} ->
        if is_nil(account.email), do: Dash.add_email_to_account(account, email), else: account

      nil ->
        create_account_for_fxa_uid(fxa_uid, email)
    end
  end

  def find_or_create_account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    account = account_for_fxa_uid(fxa_uid)

    case account do
      %Dash.Account{} ->
        account

      nil ->
        create_account_for_fxa_uid(fxa_uid)
    end
  end

  defp create_account_for_fxa_uid(fxa_uid, email) when is_binary(fxa_uid) do
    Repo.insert!(%Dash.Account{fxa_uid: fxa_uid, email: email})
  end

  defp create_account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    %Dash.Account{}
    |> Dash.Account.changeset(%{fxa_uid: fxa_uid})
    |> Dash.Repo.insert!()
  end

  @spec delete_account_and_hubs(%Dash.Account{}) :: :error | :ok
  def delete_account_and_hubs(%Dash.Account{} = account) do
    Dash.delete_all_hubs_for_account(account)

    Dash.delete_all_capabilities_for_account(account)

    case Repo.delete(account) do
      {:ok, _} ->
        :ok

      {:error, changeset} ->
        Logger.error("Failed to delete account #{inspect(changeset)}")
        :error
    end
  end

  @spec set_auth_updated_at(binary, DateTime.t()) ::
          {:ok, %Dash.Account{}} | {:error, %Ecto.Changeset{}} | nil
  def set_auth_updated_at(fxa_uid, %DateTime{} = time) when is_binary(fxa_uid) do
    case account_for_fxa_uid(fxa_uid) do
      %Dash.Account{} = account ->
        account
        |> change(auth_updated_at: time)
        |> Dash.Repo.update()

      nil ->
        # It's possible a person subscribed to Hubs never logged in but we still get this auth changed event
        nil
    end
  end
end
