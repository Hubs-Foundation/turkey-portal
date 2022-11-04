defmodule Mix.Tasks.Dash.CreateAccount do
  @shortdoc "Creates an account"
  @moduledoc "mix dash.create_account <fxa_uid>"
  @requirements ["app.start"]
  use Mix.Task

  def run([fxa_uid]) do
    %Dash.Account{}
    |> Dash.Account.changeset(%{fxa_uid: fxa_uid})
    |> Dash.Repo.insert!()
    |> IO.inspect()
  end
end

defmodule Mix.Tasks.Dash.ListHubs do
  @shortdoc "Lists hubs for a user"
  @moduledoc "mix dash.list_hubs <fxa_uid>"
  @requirements ["app.start"]
  use Mix.Task
  import Ecto.Query

  def run([fxa_uid]) do
    account = Dash.Account |> Dash.Repo.get_by(fxa_uid: fxa_uid)

    from(h in Dash.Hub, where: h.account_id == ^account.account_id)
    |> Dash.Repo.all()
    |> IO.inspect()
  end
end

defmodule Mix.Tasks.Dash.ChangeHub do
  @shortdoc "Changes a hub with values from a json object"
  @moduledoc "mix dash.change_hub <subdomain> <json>"
  @requirements ["app.start"]
  use Mix.Task

  def run([subdomain, json]) do
    hub = Dash.Hub |> Dash.Repo.get_by(subdomain: subdomain)

    hub
    |> Dash.Hub.changeset(Jason.decode!(json))
    |> Dash.Repo.update!()
    |> IO.inspect()
  end
end

defmodule Mix.Tasks.Dash.CreateHub do
  @shortdoc "Creates a hub"
  @moduledoc "mix dash.create_hub <fxa_uid> <hub_name>"
  @requirements ["app.start"]
  use Mix.Task

  def run([fxa_uid, hub_name]) do
    account = Dash.Account |> Dash.Repo.get_by(fxa_uid: fxa_uid)

    %Dash.Hub{}
    |> Dash.Hub.changeset(%{
      name: hub_name,
      subdomain: Dash.Utils.rand_string(10),
      tier: :mvp,
      ccu_limit: 5,
      storage_limit_mb: 100,
      status: :ready
    })
    |> Ecto.Changeset.put_assoc(:account, account)
    |> Dash.Repo.insert!()
    |> IO.inspect()
  end
end

defmodule Mix.Tasks.Dash.DeleteAll do
  @shortdoc "Deletes all hubs and accounts"
  @moduledoc "mix dash.delete_all"
  @requirements ["app.start"]
  use Mix.Task

  def run(_) do
    Dash.Hub |> Dash.Repo.delete_all()
    Dash.Account |> Dash.Repo.delete_all()
  end
end

defmodule Mix.Tasks.Dash.GenerateLocalToken do
  @shortdoc "Generates a JWT token for use in local development. Takes an optional json with claims."
  @moduledoc """
  mix dash.generate_local_token
  mix dash.generate_local_token [claims_json]
  mix dash.generate_local_token "{\"fxa_subscriptions\" : null, \"fxa_cancel_at_period_end\" : false, \"fxa_current_period_end\" : 0, \"fxa_plan_id\" : \"\"}"
  """
  use Mix.Task

  def run(args) when length(args) == 0 do
    run([%{}])
  end

  def run([json_str]) when is_binary(json_str) do
    run([Jason.decode!(json_str)])
  end

  def run([%{} = claims_json]) do
    # This private key is used for local development only, and was generated by
    # calling JOSE.JWK.generate_key({:rsa, 512}) |> JOSE.JWK.to_pem()
    local_private_key =
      JOSE.JWK.from_pem(
        "-----BEGIN PRIVATE KEY-----\n" <>
          "MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAvgEp3oro2mT2uJb5\n" <>
          "sHDXrEqdaL68gkIE/EEyAMGuKJ4/6v8p+bbBMgX6ddRO601WFTv12C/ldGMZCNuy\n" <>
          "hxkZgwIDAQABAkEAtw7d7Pf+UfN2NO/YTqLZV7hnobQqYIEE1phleY8goSX1S2Uz\n" <>
          "3IzqE90V33SWGo57kDsUcq0tgZRwDeAyqy24mQIhANy3TTAo/4Oxb5J6VgNe+LC/\n" <>
          "Ht3CH3el/qjC7MSsIMZVAiEA3GECahluw9WMFKVMcZs9jB56+bYjXtSG4uok8q7B\n" <>
          "SHcCIQCspNjExhzvpxgtzHGBW4VNw4FiVtkEXxxuZ2KKiFVurQIgGLO/A4mKQuVC\n" <>
          "6GWG5g0SnwwjmK3z1QNZg0HfllxESg0CIDmrdHsM8adCuMsiGyy162UAiyA0Xnqc\n" <>
          "+dTDeML6hSZo\n" <>
          "-----END PRIVATE KEY-----\n"
      )

    # If needed, here's how you'd generate a public key for this private key.
    # {_meta, public_key} =
    #   local_private_key |> JOSE.JWK.to_public() |> JOSE.JWK.to_pem()

    token_expiry_timestamp = NaiveDateTime.diff(~N[3000-01-01 00:00:00], ~N[1970-01-01 00:00:00])

    in_approx_three_months =
      DateTime.utc_now()
      |> DateTime.add(3 * 30 * 24 * 60 * 60)
      |> DateTime.to_unix()

    claims =
      Map.merge(
        %{
          "exp" => token_expiry_timestamp,
          "sub" => "local-user-uid",
          "fxa_email" => "local-user@turkey.local",
          "fxa_pic" => "http://localhost:4000/images/local-user.svg",
          "fxa_displayName" => "Local User",
          "iat" => 1_664_659_003,
          "fxa_subscriptions" => [
            "managed-hubs"
          ],
          "fxa_current_period_end" => in_approx_three_months,
          "fxa_cancel_at_period_end" => false,
          "fxa_plan_id" => "price_123"
        },
        claims_json
      )

    IO.puts("Using claims:\n#{Jason.encode!(claims, pretty: true)}")

    jwt = JOSE.JWT.from(claims)

    {_meta, signed_jwt} = JOSE.JWT.sign(local_private_key, %{"alg" => "RS256"}, jwt)

    jwt_str = "#{signed_jwt["protected"]}.#{signed_jwt["payload"]}.#{signed_jwt["signature"]}"

    IO.puts(
      "\n" <>
        "Run this in your browser console:\n" <>
        "document.cookie='_turkeyauthtoken=#{jwt_str}'" <>
        "\n"
    )
  end
end

defmodule Mix.Tasks.Dash do
  @shortdoc "Lists all dash tasks"
  use Mix.Task

  def run(_) do
    Mix.Tasks.Help.run(["--search", "dash."])
  end
end
