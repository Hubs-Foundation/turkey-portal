defmodule Dash.Utils do
  def capability_string, do: "managed-hubs"

  def rand_string(len) do
    chars = "0123456789abcdef" |> String.graphemes()

    1..len
    |> Enum.map(fn _ -> chars |> Enum.take_random(1) end)
    |> Enum.join("")
  end
end
