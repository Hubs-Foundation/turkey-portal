defmodule Dash.Repo.Migrations.CreateDeletedFxaAccounts do
  use Ecto.Migration

  def change do
    create table(:deleted_fxa_accounts, primary_key: false) do
      add :fxa_uid, :string, primary_key: true

      timestamps()
    end

    create unique_index(:deleted_fxa_accounts, [:fxa_uid])
  end
end
