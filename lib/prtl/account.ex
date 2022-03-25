defmodule Prtl.Account do
  use Ecto.Schema
  import Ecto.Changeset
  alias Prtl.Repo

  @primary_key {:account_id, :id, autogenerate: true}

  schema "accounts" do
    field :fxa_uid, :string

    timestamps()
  end

  @doc false
  def changeset(account, attrs) do
    account
    |> cast(attrs, [:fxa_uid])
    |> validate_required([:fxa_uid])
    |> unique_constraint(:fxa_uid)
  end

  def account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    Repo.get_by(Prtl.Account, fxa_uid: fxa_uid)
  end

end
