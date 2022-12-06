defmodule Dash.Repo.Migrations.RemoveInstanceUuidFromHubs do
  use Ecto.Migration

  def change do
    alter table(:hubs) do
      remove :instance_uuid
    end
  end
end
