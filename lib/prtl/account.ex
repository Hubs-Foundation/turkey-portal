defmodule Prtl.Account do
  use Ecto.Schema
  import Ecto.Changeset
  alias Prtl.Repo

  @primary_key {:account_id, :id, autogenerate: true}

  schema "accounts" do
    field :fxa_uid, :string

    timestamps()
  end

  def changeset(account, attrs) do
    account
    |> cast(attrs, [:fxa_uid])
    |> validate_required([:fxa_uid])
    |> unique_constraint(:fxa_uid)
  end

  def account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    Repo.get_by(Prtl.Account, fxa_uid: fxa_uid)
  end

  def find_or_create_account_for_fxa_uid(fxa_uid, email) when is_binary(fxa_uid) do
    account = account_for_fxa_uid(fxa_uid)

    case account do
      %Prtl.Account{} ->
        account

      nil ->
        create_account_for_fxa_uid_and_make_default_hub(fxa_uid, email)
    end
  end

  defp create_account_for_fxa_uid_and_make_default_hub(fxa_uid, email) when is_binary(fxa_uid) do
    new_account =
      %Prtl.Account{}
      |> Prtl.Account.changeset(%{fxa_uid: fxa_uid})
      |> Prtl.Repo.insert!()

    new_account
    |> Prtl.Hub.create_default_free_hub(email)

    new_account
  end
end
