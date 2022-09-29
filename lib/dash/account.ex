defmodule Dash.Account do
  use Ecto.Schema
  import Ecto.Changeset
  alias Dash.Repo

  @primary_key {:account_id, :id, autogenerate: true}

  schema "accounts" do
    field :fxa_uid, :string
    field :auth_updated_at, :utc_datetime

    timestamps()
  end

  def changeset(account, attrs) do
    account
    |> cast(attrs, [:fxa_uid])
    |> validate_required([:fxa_uid])
    |> unique_constraint(:fxa_uid)
  end

  def account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    Repo.get_by(Dash.Account, fxa_uid: fxa_uid)
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

  defp create_account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    %Dash.Account{}
    |> Dash.Account.changeset(%{fxa_uid: fxa_uid})
    |> Dash.Repo.insert!()
  end

  def set_auth_updated_at(fxa_uid, time) when is_binary(fxa_uid) do
    case account_for_fxa_uid(fxa_uid) do
      %Dash.Account{} = account ->
        # TODO may need to convert this time
        account |> change(auth_updated_at: time) |> Dash.Repo.update!()

      nil ->
        # It's possible a person subscribed to Hubs never logged in but we still get this auth changed event
        nil
    end
  end
end
