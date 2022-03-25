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

defmodule Mix.Tasks.Prtl.CreateHub do
  @shortdoc "Creates a hub"
  @moduledoc "mix prtl.createhub <fxa_uid> <hub_name>"
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
  @moduledoc "mix prtl.deleteall"
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
