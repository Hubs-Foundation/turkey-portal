# Dash

## Dependencies

Install and start PostgreSQL (https://www.postgresql.org/). In development, use "postgres" for the username and password

Install and use asdf to manage erlang and elixir dependencies: https://asdf-vm.com/

asdf will use the versions specified in the `.tool-versions` file. Just run `asdf install`.

## Start the Phoenix server

- Install server dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Paste the following in your browser console to login as a local user (email: "local-user@turkey.local"):

```
document.cookie='_turkeyauthtoken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMyNTAzNjgwMDAwLCJmeGFfZGlzcGxheU5hbWUiOiJMb2NhbCBVc2VyIiwiZnhhX2VtYWlsIjoibG9jYWwtdXNlckB0dXJrZXkubG9jYWwiLCJmeGFfcGljIjoiL2ltYWdlcy9sb2NhbC11c2VyLnN2ZyIsInN1YiI6ImxvY2FsLXVzZXItdWlkIn0.irWtfeGimpmNkwlSmz3bgJdjZYXgdtoigPlbE4U9s3iO9Cpx12jIhmqUe8WmJpqDK7mlLeBIRvTJir1rgGz7Rw;path=/;max-age=31536000'
```

## Utilities

There are a bunch of dev utility tasks defined in `lib/mix/tasks/dash_tasks.ex`, including a `generate_local_token` task, if you want to modify the contents of the token. Run `mix dash` and `mix help dash.<task_name>` for more info.

Create a hub with the `dash.create_hub` task:

```
mix dash.create_hub local-user-uid "test hub"
```

## Production environment variables

- DASHBOARD_ACCESS_KEY - Access key for communicating with reticulum. Should be a strong secret that is shared with reticulum.
- CORS_ORIGINS - Comma separated list of origins to allow CORS requests.
- SECRET_KEY_BASE - Base secret key. This should be a strong cryptographcially generated secret.
- BASIC_AUTH_USERNAME - Username for site-wide basic auth.
- BASIC_AUTH_PASSWORD - Password for site-wide basic auth.
