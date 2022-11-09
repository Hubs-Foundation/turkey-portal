defmodule Dash.Repo.Migrations.AddEmailFieldToAccounts do
  use Ecto.Migration

  def change do
    alter table(:accounts) do
      add :email, :string
    end
  end
end
