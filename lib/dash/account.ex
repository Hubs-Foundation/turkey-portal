defmodule Dash.Account do
  use Ecto.Schema
  import Ecto.Changeset
  alias Dash.Repo

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
    Repo.get_by(Dash.Account, fxa_uid: fxa_uid)
  end

  def find_or_create_account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    account = account_for_fxa_uid(fxa_uid)

    case account do
      %Dash.Account{} ->
        account

      nil ->
        create_account_for_fxa_uid(fxa_uid)
        # TODO send createHub request to orchestrator, get the email from the cookie
    end
  end

  defp create_account_for_fxa_uid(fxa_uid) when is_binary(fxa_uid) do
    %Dash.Account{}
    |> Dash.Account.changeset(%{fxa_uid: fxa_uid})
    |> Dash.Repo.insert!()
  end
end