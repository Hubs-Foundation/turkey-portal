defmodule Dash.Repo.Migrations.AddMaxCcuAndDateFieldHubStats do
  use Ecto.Migration

  def change do
    alter table(:hub_stats) do
      add :max_ccu, :integer
      add :max_ccu_utc_date, :date
    end
  end
end
