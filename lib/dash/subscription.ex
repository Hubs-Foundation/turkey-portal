defmodule Dash.Subscription do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query
  alias Dash.Repo

  schema "subscriptions" do
    field :capability, :string
    field :change_time, :utc_datetime
    field :is_active, :boolean, default: false
    belongs_to :account, Dash.Account, references: :account_id

    timestamps()
  end

  def changeset(subscription, params) do
    subscription
    |> cast(params, [:capability, :is_active, :change_time, :account_id])
    |> validate_required([:capability, :is_active, :change_time, :account_id])
    |> unique_constraint([:capability, :account_id])
  end

  def update_or_create_subscription_for_changeset(
        %{
          fxa_uid: fxa_uid,
          capability: capability,
          is_active: is_active,
          change_time: change_time
        } = new_subscription_info
      ) do
    account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
    old_subscription = get_one_subscription(account, capability: capability)

    case old_subscription do
      nil ->
        # no sub => create sub with information
        new_subscription_changeset = new_subscription_info |> Map.delete(:fxa_uid)
        create_subscription(account, new_subscription_changeset)

      %Dash.Subscription{} ->
        # yes sub => check change_time if current change_time is later than current update sub with is_active
        maybe_update_subscription(old_subscription, is_active: is_active, change_time: change_time)
    end
  end

  # Update subscription only if is_active changed AND change_time is later than the old change_time
  # If old_subscription change_time is later than new_subscription_info.change_time disregard update
  # Always change if change time is later
  def maybe_update_subscription(%Dash.Subscription{} = old_subscription,
        is_active: is_active,
        change_time: change_time
      ) do
    change_time_is_later? = DateTime.compare(old_subscription.change_time, change_time) != :gt
    changed_is_active? = old_subscription.is_active != is_active

    if change_time_is_later? || (change_time_is_later? && changed_is_active?),
      do: update_subscription(old_subscription, is_active: is_active, change_time: change_time)
  end

  # Throws error if changeset is invalid
  @spec update_subscription(%Dash.Subscription{}, [
          {:change_time, any} | {:is_active, any}
        ]) :: %Dash.Subscription{}
  def update_subscription(%Dash.Subscription{} = subscription,
        is_active: is_active,
        change_time: change_time
      ) do
    subscription
    |> Ecto.Changeset.change(
      is_active: is_active,
      change_time: change_time
    )
    |> Dash.Repo.update!()
  end

  @spec get_one_subscription(%Dash.Account{}, capability: String.t()) ::
          %Dash.Subscription{} | nil
  def get_one_subscription(%Dash.Account{} = account, capability: capability) do
    Dash.Subscription |> Repo.get_by(capability: capability, account_id: account.account_id)
  end

  @spec get_all_subscriptions_for_account(%Dash.Account{}) ::
          [%Dash.Subscription{}] | []
  def get_all_subscriptions_for_account(%Dash.Account{} = account) do
    Dash.Subscription |> Repo.all(account_id: account.account_id)
  end

  # Or raises if changeset is invalid
  @spec create_subscription(%Dash.Account{}, %{
          :capability => String.t(),
          :change_time => %DateTime{},
          :is_active => boolean()
        }) :: %Dash.Subscription{}
  def create_subscription(
        %Dash.Account{} = account,
        %{
          capability: _capability,
          is_active: _is_active,
          change_time: _change_time
        } = subscription
      ) do
    new_subscription = Map.merge(%{account_id: account.account_id}, subscription)

    %Dash.Subscription{}
    |> Dash.Subscription.changeset(new_subscription)
    |> Ecto.Changeset.put_assoc(:account, account)
    |> Repo.insert!()
  end

  def delete_all_subscriptions_for_account(%Dash.Account{} = account) do
    Repo.delete_all(
      from(s in Dash.Subscription,
        where: s.account_id == ^account.account_id
      )
    )
  end
end
