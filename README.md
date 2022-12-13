# Dash

## Setup

This codebase can be run locally using either containers or bare metal.

### Containers

#### Initial Setup

1. [Install Docker Compose](https://docs.docker.com/compose/install)
2. [Install Mutagen Compose](https://github.com/mutagen-io/mutagen-compose#system-requirements)
3. Create `./client/.npmrc` and `./marketing/.npmrc` with the following contents, replacing
   `{AUTH_TOKEN}` with a GitHub
   [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token):
   ```
    registry=https://registry.npmjs.org/
    @github:registry=https://npm.pkg.github.com/
    //npm.pkg.github.com/:_authToken={AUTH_TOKEN}
   ```
4. Initialize the services with `bin/init`

#### Orchestration

- Start containers with `bin/up`
- Stop containers `bin/down`
- Observe running containers with `bin/observe`[^1]
- Remove all orchestration artifacts with `bin/clean`

[^1]: Requires `tmux` and `watch` program files in the user’s path

#### Command Execution

Common commands can be easily executed inside a running container from your
shell using the scripts inside the given service’s `bin/` directory. For
example, calling `bin/mix deps.get` from `./` will download the dependencies
for the server. Calling `bin/npx prettier --write .` from `./client/` will
format the client files using Prettier.

When executing the `mix` tasks referenced in this README, use `bin/mix`.

### Bare Metal

#### Initial Setup

1. Install and start [PostgreSQL](https://www.postgresql.org/). In development,
   use "postgres" for the username and password.
2. Install and use [asdf](https://asdf-vm.com/) to manage Erlang and Elixir dependencies
3. Run `asdf install` to install the language versions in the `.tool-versions` file

#### Running

1. Install server dependencies with `mix deps.get`
2. Create and migrate your database with `mix ecto.setup`
3. Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

## User Creation

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

### Use this to send a subscription changed event to the api via a CURL - Is Subscribed

```
curl -X POST "http://localhost:4000/api/v1/events/fxa" -H "authorization: Bearer {\"iss\":\"https://accounts.firefox.com/\",\"sub\":\"local-user-uid\",\"aud\":\"REMOTE_SYSTEM\",\"iat\":12345,\"jti\":\"e19ed6c5-4816-4171-aa43-56ffe80dbda1\",\"events\":{\"https://schemas.accounts.firefox.com/event/subscription-state-change\":{\"changeTime\":1663196637000,\"capabilities\":[\"managed-hubs\"],\"isActive\":true}}}"
```

### Use this to send a subscription changed event to the api via a CURL - Is Not Subscribed

```
curl -X POST "http://localhost:4000/api/v1/events/fxa" -H "authorization: Bearer {\"iss\":\"https://accounts.firefox.com/\",\"sub\":\"local-user-uid\",\"aud\":\"REMOTE_SYSTEM\",\"iat\":12345,\"jti\":\"e19ed6c5-4816-4171-aa43-56ffe80dbda1\",\"events\":{\"https://schemas.accounts.firefox.com/event/subscription-state-change\":{\"changeTime\":1663196637000,\"capabilities\":[\"managed-hubs\"],\"isActive\":false}}}"
```

## Utilities

There are a bunch of dev utility tasks defined in `lib/mix/tasks/dash_tasks.ex`, including a `generate_local_token` task, if you want to modify the contents of the token.
Run `mix dash` and `mix help dash.<task_name>` for more info.

## Production environment variables

- AUTH_PUBLIC_KEY - Public key for JWT auth provided by auth server. Used in authentication.
- AUTH_SERVER - Server used for login links. e.g. "auth.myhubs.net"
- BASIC_AUTH_USERNAME - Username for site-wide basic auth.
- BASIC_AUTH_PASSWORD - Password for site-wide basic auth.
- CORS_ORIGINS - Comma separated list of origins to allow CORS requests.
- DASHBOARD_ACCESS_KEY - Access key for communicating with reticulum. Should be a strong secret that is shared with reticulum.
- FXA_JWK_STRING - Used to verify token in FxA webhook, the payload from the Subplat/FxA endpoint with the live public keys is stringified by Jason.encode!()
- FXA_SERVER - Firefox Accounts server used for account management links. e.g. "accounts.firefox.com"
- SECRET_KEY_BASE - Base secret key. This should be a strong cryptographcially generated secret.
- PLANS - Used in getting currency and amount, MUST BE IN THIS FORMAT: "plan_id1,USD,10;plan_id2,EUR,20"
