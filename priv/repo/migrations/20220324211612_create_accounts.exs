defmodule Prtl.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:accounts, primary_key: false) do
      add :account_id, :bigint, default: fragment("next_id()"), primary_key: true
      add :fxa_uid, :string

      timestamps()
    end

    create unique_index(:accounts, [:fxa_uid])
  end
end
