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
      instance_uuid: fake_uuid(),
      name: hub_name,
      subdomain: rand_string(10),
      tier: :free,
      ccu_limit: 5,
      storage_limit_mb: 100,
      status: :creating
    })
    |> Ecto.Changeset.put_assoc(:account, account)
    |> Dash.Repo.insert!()
    |> IO.inspect()
  end

  defp rand_string(len) do
    chars = "0123456789abcdef" |> String.graphemes()

    1..len
    |> Enum.map(fn _ -> chars |> Enum.take_random(1) end)
    |> Enum.join("")
  end

  defp fake_uuid() do
    [
      rand_string(8),
      rand_string(4),
      rand_string(4),
      rand_string(4),
      rand_string(12)
    ]
    |> Enum.join("-")
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

defmodule Mix.Tasks.Dash do
  @shortdoc "Lists all dash tasks"
  use Mix.Task

  def run(_) do
    Mix.Tasks.Help.run(["--search", "dash."])
  end
end
