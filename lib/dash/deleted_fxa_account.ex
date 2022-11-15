defmodule Dash.DeletedFxaAccount do
  use Ecto.Schema
  import Ecto.Changeset

  # @primary_key {:fxa_uid, :id}

  schema "deleted_fxa_accounts" do
    field :fxa_uid, :string

    timestamps()
  end

  @doc false
  def changeset(deleted_fxa_account, attrs) do
    deleted_fxa_account
    |> cast(attrs, [:fxa_uid])
    |> validate_required([:fxa_uid])
    |> unique_constraint(:fxa_uid)
  end
end
