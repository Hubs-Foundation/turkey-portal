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
// If being redirected to auth server, we need to run mix dash.generate_local_token to refresh the cookie

document.cookie='_turkeyauthtoken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMyNTAzNjgwMDAwLCJmeGFfY2FuY2VsX2F0X3BlcmlvZF9lbmQiOmZhbHNlLCJmeGFfY3VycmVudF9wZXJpb2RfZW5kIjoxNjc0NzYwMTkwLCJmeGFfZGlzcGxheU5hbWUiOiJMb2NhbCBVc2VyIiwiZnhhX2VtYWlsIjoibG9jYWwtdXNlckB0dXJrZXkubG9jYWwiLCJmeGFfcGljIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2ltYWdlcy9sb2NhbC11c2VyLnN2ZyIsImZ4YV9wbGFuX2lkIjoicHJpY2VfMTIzIiwiZnhhX3N1YnNjcmlwdGlvbnMiOlsibWFuYWdlZC1odWJzIl0sImlhdCI6MTY2NDY1OTAwMywic3ViIjoibG9jYWwtdXNlci11aWQifQ.LH_TOuHCVi3pM6z08CB_gCBdtEjMYoPTctoG72SOnYU_isrbYgCDwbk2VafRrpLMFUT-3zldFlTD7e3ho2OTrQ;path=/;max-age=34560000'

```

### Token is NOT subscribed to Subscription Platform hubs product

```
// SUBSCRIPTIONS IS NULL:

document.cookie='_turkeyauthtoken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjMyNTAzNjgwMDAwLCJmeGFfY2FuY2VsX2F0X3BlcmlvZF9lbmQiOmZhbHNlLCJmeGFfY3VycmVudF9wZXJpb2RfZW5kIjowLCJmeGFfZGlzcGxheU5hbWUiOiJMb2NhbCBVc2VyIiwiZnhhX2VtYWlsIjoibG9jYWwtdXNlckB0dXJrZXkubG9jYWwiLCJmeGFfcGljIjoiaHR0cDovL2xvY2FsaG9zdDo0MDAwL2ltYWdlcy9sb2NhbC11c2VyLnN2ZyIsImZ4YV9wbGFuX2lkIjoiIiwiZnhhX3N1YnNjcmlwdGlvbnMiOm51bGwsImlhdCI6MTY2NDY1OTAwMywic3ViIjoibG9jYWwtdXNlci11aWQifQ.st0ALbXyEU34g_Boc7QZ6NLslAs51uIjNoBAXn1HEO5c6xgFofiXmQhsyEbUIUWp9FvhKJosc6BrI9gvRcp0SA;path=/;max-age=34560000'

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
- FXA_JWK_STRING - Used to verify token in FxA webhook, the payload from the Subplat/FxA endpoint with the live public keys is stringified by Jason.encode!()
- PLANS - Used in getting currency and amount, MUST BE IN THIS FORMAT: "plan_id1,USD,10;plan_id2,EURO,20"
