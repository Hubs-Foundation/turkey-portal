defmodule Dash.Subscription do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query
  alias Dash.{Repo}
  require Logger

  schema "subscriptions" do
    field :capability, :string
    field :change_time, :utc_datetime
    field :is_active, :boolean, default: false
    belongs_to :account, Dash.Account, references: :account_id

    timestamps()
  end

  @doc false
  def changeset(subscription, attrs) do
    subscription
    |> cast(attrs, [:capability, :is_active, :change_time, :account_id])
    |> validate_required([:capability, :is_active, :change_time, :account_id])
    |> validate_unique_capability_to_account()
  end

  # Check that per account each capability is unique
  # Account can not have 2x rows of same capability string
  defp validate_unique_capability_to_account(changeset) do
    account_id = get_field(changeset, :account_id)
    capability = get_field(changeset, :capability)

    result =
      from(s in Dash.Subscription,
        where: s.account_id == ^account_id and s.capability == ^capability
      )
      |> Repo.exists?()

    case result do
      true ->
        add_error(
          changeset,
          :capability,
          "Duplicate capability for account_id, for each account, should only have unique capabilities"
        )

      _ ->
        changeset
    end
  end

  def update_or_create_subscription_for_changeset(
        %{
          fxa_uid: fxa_uid,
          capability: capability,
          is_active: is_active,
          change_time: change_time
        } = new_subscription_info
      ) do
    # return subscripiton, if sub => not active, delete hubs? in fxa_event stuffs

    # get account or create
    account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
    # get subscription
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
    from(s in Dash.Subscription,
      where: s.account_id == ^account.account_id
    )
    |> Repo.delete_all()
  end

  # Creates the latest subscription list
  # If iat is latest use the cookie subscriptions
  # If created_at is latest, use the subscription information
  @spec process_latest_fxa_subscription(%Dash.Account{}, %{
          :fxa_subscriptions => list(),
          :iat_utc_dt => %DateTime{}
        }) :: list()
  def process_latest_fxa_subscription(
        %Dash.Account{} = account,
        %{
          iat_utc_dt: _,
          fxa_subscriptions: _
        } = fxa_cookie_info
      ) do
    subscriptions = get_all_subscriptions_for_account(account)

    # TODO EA expect this to be only 1 subscription
    subscription_or_nil = subscriptions |> List.first()

    compare_latest_fxa_subscription(subscription_or_nil, fxa_cookie_info)
  end

  defp compare_latest_fxa_subscription(nil, %{
         iat_utc_dt: _,
         fxa_subscriptions: fxa_subscriptions
       }) do
    capability = capability_string()

    if capability in fxa_subscriptions do
      # ISSUE we did NOT get a webhook event to add an active subscription
      Logger.warn(
        "WEBHOOK ISSUE: maybe issue with fxa webhook. Cookie says account has subscription, our db has no record"
      )

      # Trust cookie is correct
      fxa_subscriptions
    else
      []
    end
  end

  defp compare_latest_fxa_subscription(%Dash.Subscription{} = subscription, %{
         iat_utc_dt: iat_utc_dt,
         fxa_subscriptions: fxa_subscriptions
       }) do
    # TODO EA expect this to be only 1 subscription
    capability = capability_string()
    matches? = capability in fxa_subscriptions == subscription.is_active
    iat_is_later? = iat_later_than_change_time?(iat_utc_dt, subscription.change_time)

    cond do
      matches? ->
        # both records match, return array of subscriptions
        fxa_subscriptions

      not matches? and iat_is_later? ->
        # ISSUE we did NOT get a webhook event to match the cookie
        # Trust the cookie is correct because it is later
        Logger.warn("WEBHOOK ISSUE: maybe issue with fxa webhook. Cookie doesn't match our db.")
        fxa_subscriptions

      not matches? and !iat_is_later? ->
        # Happy path, user was authenticated via cookie, then subscription cancelled OR started,
        # and user is still authenticated but has outdated subscription information in cookie

        # TODO EA expect this to be only 1 subscription
        if subscription.is_active, do: [capability], else: []
    end
  end

  defp iat_later_than_change_time?(iat_utc_dt, change_time) do
    DateTime.compare(iat_utc_dt, change_time) == :gt
  end

  def capability_string, do: Application.get_env(:dash, __MODULE__)[:subscription_capability]
end
