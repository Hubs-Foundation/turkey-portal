defmodule Dash.FeatureFlags do
  def enabled?(flag) when is_atom(flag) do
    !!get_flags()[flag]
  end

  def actions_for_flags(always: always_enabled_actions, flags: flagged_actions) do
    enabled_actions =
      flagged_actions
      |> Enum.filter(fn {flag, _action} -> enabled?(flag) end)
      |> Enum.map(fn {_flag, action} -> action end)

    [only: always_enabled_actions ++ enabled_actions]
  end

  def to_json() do
    get_flags()
    |> Enum.map(fn {flag, is_enabled} -> {flag |> to_string |> snake_to_camel, is_enabled} end)
    |> Map.new()
    |> Jason.encode!()
  end

  defp get_flags() do
    Application.get_env(:dash, Dash.FeatureFlags, %{})
  end

  defp snake_to_camel(str) do
    str |> String.replace(~r/_./, fn s -> s |> String.slice(1, 1) |> String.upcase() end)
  end
end
