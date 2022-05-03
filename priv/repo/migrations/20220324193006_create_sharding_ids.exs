defmodule Dash.Repo.Migrations.CreateShardingIds do
  use Ecto.Migration

  def up do
    execute("create sequence table_id_seq")

    execute("""
    CREATE OR REPLACE FUNCTION next_id(OUT result bigint) AS $$
    DECLARE
    our_epoch bigint := 1648150338000;
    seq_id bigint;
    now_millis bigint;
    shard_id int := 0;
    BEGIN
    SELECT nextval('table_id_seq') % 1024 INTO seq_id;

    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id << 10);
    result := result | (seq_id);
    END;
    $$ LANGUAGE PLPGSQL;
    """)
  end
end
