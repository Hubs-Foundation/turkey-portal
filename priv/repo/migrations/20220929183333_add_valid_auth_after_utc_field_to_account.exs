defmodule Dash.Repo.Migrations.AddAuthUpdatedAtFieldToAccount do
  use Ecto.Migration

  def change do
    alter table(:accounts) do
      add :auth_updated_at, :utc_datetime
    end
  end
end
