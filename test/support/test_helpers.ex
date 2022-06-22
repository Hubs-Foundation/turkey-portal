defmodule DashWeb.TestHelpers do
  import Phoenix.ConnTest
  require Logger

  @test_email "email@fake.com"
  @default_token_claims %{
    "sub" => "fake-uid",
    "fxa_email" => @test_email,
    "fxa_pic" => "https://fake.com/pic.jpg",
    "fxa_displayName" => "Faker McFakerson"
  }

  @default_token_opts [
    claims: %{},
    token_expiry: ~N[3000-01-01 00:00:00],
    unverified: false
  ]
  def get_test_email() do
    @test_email
  end

  def put_test_token(conn, opts \\ []) do
    opts = Keyword.merge(@default_token_opts, opts)

    private_key = JOSE.JWK.generate_key({:rsa, 512})

    {_meta, public_key_str} = private_key |> JOSE.JWK.to_public() |> JOSE.JWK.to_pem()
    Application.put_env(:dash, DashWeb.Plugs.Auth, %{auth_pub_key: public_key_str})

    claims = Map.merge(@default_token_claims, opts[:claims])
    token_expiry_timestamp = NaiveDateTime.diff(opts[:token_expiry], ~N[1970-01-01 00:00:00])
    jwt = JOSE.JWT.from(Map.merge(%{"exp" => token_expiry_timestamp}, claims))
    {_meta, signed_jwt} = JOSE.JWT.sign(private_key, %{"alg" => "RS256"}, jwt)

    signature = if opts[:unverified], do: "unverified", else: signed_jwt["signature"]
    jwt_str = "#{signed_jwt["protected"]}.#{signed_jwt["payload"]}.#{signature}"

    conn |> put_req_cookie("_turkeyauthtoken", jwt_str)
  end

  def create_test_account_and_hub() do
    account = Dash.Account.find_or_create_account_for_fxa_uid("fake-uid")

    hub =
      %Dash.Hub{}
      |> Dash.Hub.changeset(%{
        name: "test hub",
        ccu_limit: 20,
        storage_limit_mb: 100,
        tier: :mvp,
        subdomain: "test-subdomain-#{Dash.Utils.rand_string(10)}",
        status: :ready
      })
      |> Ecto.Changeset.put_assoc(:account, account)
      |> Dash.Repo.insert!()

    %{account: account, hub: hub}
  end

  def merge_module_config(app, key, configs) do
    current_config = Application.get_env(app, key, [])
    Application.put_env(app, key, Keyword.merge(current_config, configs))
  end

  def clear_auth_config() do
    Application.put_env(:dash, DashWeb.Plugs.Auth, %{})
  end

  def setup_mocks_for_hubs() do
    merge_module_config(:dash, Dash.Hub, http_client: Dash.HttpMock)
    merge_module_config(:dash, Dash.OrchClient, http_client: Dash.HttpMock)
  end

  def exit_mocks_for_hubs() do
    merge_module_config(:dash, Dash.Hub, http_client: nil)
    merge_module_config(:dash, Dash.OrchClient, http_client: nil)
  end

  # Required mocks for GET hubs requests
  def mock_hubs_get() do
    Dash.HttpMock
    |> Mox.expect(:get, 2, fn url, _headers, _options ->
      cond do
        url =~ ~r/presence$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{count: 3})}}

        url =~ ~r/storage$/ ->
          {:ok, %HTTPoison.Response{status_code: 200, body: Poison.encode!(%{storage_mb: 10})}}

        true ->
          Logger.warn(
            "Inside test, hit set up in mock_hubs_get/0, but GET request URL did not match either condition, did you mean to do that?"
          )
      end
    end)
  end

  def mock_orch_post() do
    Dash.HttpMock
    |> Mox.expect(:post, fn _url, _body, _opts ->
      {:ok, %HTTPoison.Response{status_code: 200}}
    end)
  end

  def stub_hubs_success_health_check() do
    Dash.HttpMock
    |> Mox.stub(:get, fn url, _headers ->
      cond do
        url =~ ~r/health$/ ->
          {:ok, %HTTPoison.Response{status_code: 200}}

        true ->
          Logger.warn(
            "Inside test, hit set up in stub_hubs_success_health_check/0, but GET request URL did not match /health, did you mean to do that?"
          )
      end
    end)
  end
end
