defmodule Mix.Tasks.Prtl.CreateAccount do
  @shortdoc "Creates an account"
  @moduledoc "mix prtl.create_account <fxa_uid>"
  @requirements ["app.start"]
  use Mix.Task

  def run([fxa_uid]) do
    %Prtl.Account{}
    |> Prtl.Account.changeset(%{fxa_uid: fxa_uid})
    |> Prtl.Repo.insert!()
    |> IO.inspect()
  end
end

defmodule Mix.Tasks.Prtl.ListHubs do
  @shortdoc "Lists hubs for a user"
  @moduledoc "mix prtl.list_hubs <fxa_uid>"
  @requirements ["app.start"]
  use Mix.Task
  import Ecto.Query

  def run([fxa_uid]) do
    account = Prtl.Account |> Prtl.Repo.get_by(fxa_uid: fxa_uid)

    from(h in Prtl.Hub, where: h.account_id == ^account.account_id)
    |> Prtl.Repo.all()
    |> IO.inspect()
  end
end

defmodule Mix.Tasks.Prtl.ChangeHub do
  @shortdoc "Changes a hub with values from a json object"
  @moduledoc "mix prtl.change_hub <subdomain> <json>"
  @requirements ["app.start"]
  use Mix.Task

  def run([subdomain, json]) do
    hub = Prtl.Hub |> Prtl.Repo.get_by(subdomain: subdomain)

    hub
    |> Prtl.Hub.changeset(Jason.decode!(json))
    |> Prtl.Repo.update!()
    |> IO.inspect()
  end
end

defmodule Mix.Tasks.Prtl.CreateHub do
  @shortdoc "Creates a hub"
  @moduledoc "mix prtl.create_hub <fxa_uid> <hub_name>"
  @requirements ["app.start"]
  use Mix.Task

  def run([fxa_uid, hub_name]) do
    account = Prtl.Account |> Prtl.Repo.get_by(fxa_uid: fxa_uid)

    %Prtl.Hub{}
    |> Prtl.Hub.changeset(%{
      instance_uuid: fake_uuid(),
      name: hub_name,
      subdomain: rand_string(10),
      tier: :free,
      ccu_limit: 5,
      storage_limit_mb: 100,
      status: :creating
    })
    |> Ecto.Changeset.put_assoc(:account, account)
    |> Prtl.Repo.insert!()
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

defmodule Mix.Tasks.Prtl.DeleteAll do
  @shortdoc "Deletes all hubs and accounts"
  @moduledoc "mix prtl.delete_all"
  @requirements ["app.start"]
  use Mix.Task

  def run(_) do
    Prtl.Hub |> Prtl.Repo.delete_all()
    Prtl.Account |> Prtl.Repo.delete_all()
  end
end

defmodule Mix.Tasks.Prtl do
  @shortdoc "Lists all prtl tasks"
  use Mix.Task

  def run(_) do
    Mix.Tasks.Help.run(["--search", "prtl."])
  end
end
