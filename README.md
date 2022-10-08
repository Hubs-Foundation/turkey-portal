# Dash

## Dependencies

Install and start PostgreSQL (https://www.postgresql.org/). In development, use "postgres" for the username and password

Install and use asdf to manage erlang and elixir dependencies: https://asdf-vm.com/

asdf will use the versions specified in the `.tool-versions` file. Just run `asdf install`.

## Start the Phoenix server

- Install server dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

## Create a local user

Run the following commands to create a local user and a test hub:

```
mix dash.create_account local-user-uid
mix dash.create_hub local-user-uid "Dev Hub"
```

Go to [`http://localhost:3000/subscribe?redirect=false`](http://localhost:3000/subscribe?redirect=false) and paste the following in your browser console to login as a local user.

The email associated with this token is "local-user@turkey.local".

### Token IS subscribed to Subscription Platform hubs product

```
document.cookie='_turkeyauthtoken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMyNTAzNjgwMDAwLCJmeGFfZGlzcGxheU5hbWUiOiJMb2NhbCBVc2VyIiwiZnhhX2VtYWlsIjoibG9jYWwtdXNlckB0dXJrZXkubG9jYWwiLCJmeGFfcGljIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2ltYWdlcy9sb2NhbC11c2VyLnN2ZyIsImZ4YV9zdWJzY3JpcHRpb25zIjpbIm1hbmFnZWQtaHVicyJdLCJpYXQiOjE2NjQ2NTkwMDMsInN1YiI6ImxvY2FsLXVzZXItdWlkIn0.LdBgsDoGWdcBQ2SaAJ74DicTJKLLe4XjhesThbUMgUFF4NpmmLBkA9CIqi9yRylwTdNq_DIZ7uIyXL8lGp2-EA;path=/;max-age=34560000'

```

### Token is NOT subscribed to Subscription Platform hubs product

```
document.cookie='_turkeyauthtoken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMyNTAzNjgwMDAwLCJmeGFfZGlzcGxheU5hbWUiOiJMb2NhbCBVc2VyIiwiZnhhX2VtYWlsIjoibG9jYWwtdXNlckB0dXJrZXkubG9jYWwiLCJmeGFfcGljIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2ltYWdlcy9sb2NhbC11c2VyLnN2ZyIsImZ4YV9zdWJzY3JpcHRpb25zIjpbXSwiaWF0IjoxNjY0NjU5MDAzLCJzdWIiOiJsb2NhbC11c2VyLXVpZCJ9.sl8UKlX9-zFIaj2kelnLot_rI7xIIsItjSR4wiQIzeKgignY9hnghlWbN4lrvs3tBI4N_2QxIAkDxz4s_-7V8Q;path=/;max-age=34560000'
```

## Utilities

There are a bunch of dev utility tasks defined in `lib/mix/tasks/dash_tasks.ex`, including a `generate_local_token` task, if you want to modify the contents of the token.
Run `mix dash` and `mix help dash.<task_name>` for more info.

## Production environment variables

- DASHBOARD_ACCESS_KEY - Access key for communicating with reticulum. Should be a strong secret that is shared with reticulum.
- CORS_ORIGINS - Comma separated list of origins to allow CORS requests.
- SECRET_KEY_BASE - Base secret key. This should be a strong cryptographcially generated secret.
- BASIC_AUTH_USERNAME - Username for site-wide basic auth.
- BASIC_AUTH_PASSWORD - Password for site-wide basic auth.
- AUTH_PUBLIC_KEY - Public key for JWT auth provided by auth server. Used in authentication.
- AUTH_SERVER - Server used for login links. e.g. "auth.myhubs.net"
- FXA_SERVER - Firefox Accounts server used for account management links. e.g. "accounts.firefox.com"
