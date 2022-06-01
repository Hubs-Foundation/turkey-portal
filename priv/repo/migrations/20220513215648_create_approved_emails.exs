defmodule Dash.Repo.Migrations.CreateApprovedEmails do
  use Ecto.Migration

  def change do
    create table(:approved_emails) do
      add :email_hash, :string

      timestamps()
    end

    create unique_index(:approved_emails, [:email_hash])
  end
end
