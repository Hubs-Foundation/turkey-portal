defmodule Prtl.Repo do
  use Ecto.Repo,
    otp_app: :prtl,
    adapter: Ecto.Adapters.Postgres
end
