defmodule Dash.OrchClient do
  @orch_host Application.get_env(:dash, Dash.OrchClient)[:orch_host]

  def create_hub(fxa_email, %Dash.Hub{} = hub) do
    orch_hub_create_params = %{
      useremail: fxa_email,
      # TODO Maybe the Orchestrator should generate this and send it back to us instead.
      hub_id: hub.instance_uuid,
      subdomain: hub.subdomain,
      tier: hub.tier,
      ccu_limit: hub.ccu_limit |> to_string(),
      storage_limit: (hub.storage_limit_mb / 1024) |> to_string()
    }

    resp =
      HTTPoison.post(
        "https://#{@orch_host}/hc_instance",
        Jason.encode!(orch_hub_create_params)
      )

    IO.inspect(resp)
    resp
  end
end