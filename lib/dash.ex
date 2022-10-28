defmodule Dash do
  @moduledoc """
  Dash keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def currency_and_amount_for_plan(""), do: %{currency: nil, amount: nil}

  def currency_and_amount_for_plan(plan_id) when is_binary(plan_id) do
    plans_array = String.split(plan_currency_amount(), ";")

    case Enum.find(plans_array, fn plan_info -> plan_info =~ plan_id end) do
      nil ->
        %{
          currency: nil,
          amount: nil
        }

      plan_info ->
        [_plan_id, currency_with_whitespace, amount_with_whitespace] =
          String.split(plan_info, ",")

        %{
          currency: String.trim(currency_with_whitespace),
          amount: String.trim(amount_with_whitespace)
        }
    end
  end

  @doc """
  String that follows this format "plan_id_123,USD,20;plan_id_234,EUR,20;plan_id_345,RMB,20"
  """
  def plan_currency_amount(), do: Application.get_env(:dash, __MODULE__)[:plans]
end
