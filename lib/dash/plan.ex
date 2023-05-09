defmodule Dash.Plan do
  @moduledoc """
  A Plan struct.

  The Plan gives a user their own hub.
  """
  use Ecto.Schema

  alias Dash.Account

  @type id :: pos_integer
  @type t :: %__MODULE__{
          account_id: Account.id(),
          inserted_at: NaiveDateTime.t(),
          plan_id: id,
          name: String.t(),
          subscription?: boolean,
          updated_at: NaiveDateTime.t()
        }

  @primary_key {:plan_id, :id, autogenerate: true}
  schema "plans" do
    field :account_id, :id
    field :name, :string, virtual: true
    field :subscription?, :boolean, default: false, virtual: true

    timestamps()
  end
end
