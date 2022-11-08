defmodule Dash.Repo.Migrations.AddEmailFieldToAccounts do
  use Ecto.Migration

  def change do
    alter table(:accounts) do
      add :email, :varchar
    end
  end
end
