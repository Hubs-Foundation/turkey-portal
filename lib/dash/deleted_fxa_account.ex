defmodule Dash.DeletedFxaAccount do
  use Ecto.Schema

  schema "deleted_fxa_accounts" do
    field :fxa_uid, :string

    timestamps()
  end
end
