defmodule Dash.Capability do
  use Ecto.Schema

  import Ecto.Changeset

  schema "capabilities" do
    field :capability, :string
    field :change_time, :utc_datetime
    field :is_active, :boolean, default: false
    belongs_to :account, Dash.Account, references: :account_id

    timestamps()
  end

  def changeset(capability, params) do
    capability
    |> cast(params, [:capability, :is_active, :change_time, :account_id])
    |> validate_required([:capability, :is_active, :change_time, :account_id])
    |> unique_constraint([:capability, :account_id])
  end
end
