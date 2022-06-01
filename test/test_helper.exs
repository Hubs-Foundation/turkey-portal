ExUnit.start()
Ecto.Adapters.SQL.Sandbox.mode(Dash.Repo, :manual)

Mox.defmock(Dash.HttpMock, for: HTTPoison.Base)
