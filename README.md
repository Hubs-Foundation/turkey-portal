# Prtl

Dependencies:

Install and start PostgreSQL (https://www.postgresql.org/). In development, use "postgres" for the username and password

Install and use asdf to manage erlang and elixir dependencies: https://asdf-vm.com/

asdf will use the versions specified in the `.tool-versions` file. Just run `asdf install`.

Start the Phoenix server:

- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Paste the following in your browser console to login as a local user:

```
document.cookie='_turkeyauthtoken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMyNTAzNjgwMDAwLCJmeGFfZGlzcGxheU5hbWUiOiJEZXYgVXNlciIsImZ4YV9lbWFpbCI6ImRldi11c2VyQGRldi5sb2NhbCIsImZ4YV9waWMiOiIvaW1hZ2VzL2Rldi11c2VyLnN2ZyIsInN1YiI6ImRldi11c2VyLXVpZCJ9.bP24Jl6pvVMKseRnSVIAxYtkq0XDviMs0zI1JBc1GZ8N-t7INnuJp0i8fwushAJWQ0rBrk-_B7xjZKuUxF4aPw'
```

There are a bunch of dev utility tasks defined in `lib/mix/tasks/prtl_tasks.ex`, including a `generate_local_token` task, if you want to modify the contents of the token. Run `mix prtl` and `mix help prtl.<task_name>` for more info.

Create a hub with the `prtl.create_hub` task:

```
mix prtl.create_hub local-user-uid "test hub"
```
