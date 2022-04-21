defmodule Prtl.OrchClient do
  def create_hub(fxa_email, %Prtl.Hub{} = hub) do
    orch_host = Application.get_env(:prtl, Prtl.OrchClient)[:orch_host]

    orch_hub_create_params = %{
      useremail: fxa_email,
      # TODO Maybe the Orchestrator should generate this and send it back to us instead.
      hub_id: hub.instance_uuid,
      subdomain: hub.subdomain,
      tier: hub.tier,
      ccu_limit: hub.ccu_limit,
      storage_limit: hub.storage_limit_mb / 1024
    }

    HTTPoison.post(
      "https://#{orch_host}/hc_instance",
      Jason.encode!(orch_hub_create_params)
    )
  end
end
