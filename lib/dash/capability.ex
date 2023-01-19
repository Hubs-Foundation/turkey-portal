defmodule Dash.Capability do
  use Ecto.Schema

  schema "capabilities" do
    field :capability, :string
    field :change_time, :utc_datetime
    field :is_active, :boolean, default: false
    belongs_to :account, Dash.Account, references: :account_id

    timestamps()
  end
end
