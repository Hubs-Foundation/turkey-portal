defmodule Dash.Repo.Migrations.AddDomainAndRegionColumnsToHubs do
  use Ecto.Migration

  def up do
    execute("""
      DO $$ 
      BEGIN
          IF NOT EXISTS(
            SELECT * FROM information_schema.columns
              WHERE table_name = 'hubs' AND column_name = 'domain'
          ) THEN
              ALTER TABLE hubs ADD COLUMN domain VARCHAR(255);
          END IF;
      END
      $$;
    """)
    execute("""
      DO $$ 
      BEGIN
          IF NOT EXISTS(
            SELECT * FROM information_schema.columns
              WHERE table_name = 'hubs' AND column_name = 'region'
          ) THEN
              ALTER TABLE hubs ADD COLUMN region VARCHAR(255);
          END IF;
      END
      $$;
    """)
  end

  def down do
    execute("ALTER TABLE hubs DROP COLUMN IF EXISTS domain")
    execute("ALTER TABLE hubs DROP COLUMN IF EXISTS region")
  end

end
