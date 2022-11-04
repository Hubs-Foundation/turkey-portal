defmodule Dash do
  @moduledoc """
  Dash keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def currency_and_amount_for_plan(""), do: {nil, nil}

  def currency_and_amount_for_plan(plan_id) when is_binary(plan_id) do
    plans_array = String.split(plan_currency_amount(), ";", trim: true)

    case Enum.find(plans_array, fn plan_info -> String.starts_with?(plan_info, plan_id) end) do
      nil ->
        {nil, nil}

      plan_info ->
        [_plan_id, currency, amount] = String.split(plan_info, ",", trim: true)

        {currency, amount}
    end
  end

  @doc """
  String that follows this format "plan_id_123,USD,20;plan_id_234,EUR,20;plan_id_345,RMB,20"
  """
  def plan_currency_amount(),
    do:
      :dash
      |> Application.fetch_env!(__MODULE__)
      |> Keyword.fetch!(:plans)
end
