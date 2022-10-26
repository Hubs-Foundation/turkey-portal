defmodule Dash.Capability do
  use Ecto.Schema

  import Ecto.Changeset
  import Ecto.Query
  alias Dash.Repo

  schema "capabilities" do
    field :capability, :string
    field :change_time, :utc_datetime
    field :is_active, :boolean, default: false
    belongs_to :account, Dash.Account, references: :account_id

    timestamps()
  end

  def changeset(capability, params) do
    capability
    |> cast(params, [:capability, :is_active, :change_time, :account_id])
    |> validate_required([:capability, :is_active, :change_time, :account_id])
    |> unique_constraint([:capability, :account_id])
  end

  def update_or_create_capability_for_changeset(
        %{
          fxa_uid: fxa_uid,
          capability: capability,
          is_active: is_active,
          change_time: change_time
        } = new_capability_info
      ) do
    account = Dash.Account.find_or_create_account_for_fxa_uid(fxa_uid)
    old_capability = get_one_capability(account, capability: capability)

    case old_capability do
      nil ->
        # no sub => create sub with information
        new_capability_changeset = new_capability_info |> Map.delete(:fxa_uid)
        create_capability(account, new_capability_changeset)

      %Dash.Capability{} ->
        # yes sub => check change_time if current change_time is later than current update sub with is_active
        maybe_update_capability(old_capability, is_active: is_active, change_time: change_time)
    end
  end

  # Update capability only if is_active changed AND change_time is later than the old change_time
  # If old_capability change_time is later than new_capability_info.change_time disregard update
  # Always change if change time is later
  def maybe_update_capability(%Dash.Capability{} = old_capability,
        is_active: is_active,
        change_time: change_time
      ) do
    change_time_is_later? = DateTime.compare(old_capability.change_time, change_time) != :gt
    changed_is_active? = old_capability.is_active != is_active

    if change_time_is_later? || (change_time_is_later? && changed_is_active?),
      do: update_capability(old_capability, is_active: is_active, change_time: change_time)
  end

  # Throws error if changeset is invalid
  @spec update_capability(%Dash.Capability{}, [
          {:change_time, any} | {:is_active, any}
        ]) :: %Dash.Capability{}
  def update_capability(%Dash.Capability{} = capability,
        is_active: is_active,
        change_time: change_time
      ) do
    capability
    |> Ecto.Changeset.change(
      is_active: is_active,
      change_time: change_time
    )
    |> Dash.Repo.update!()
  end

  @spec get_one_capability(%Dash.Account{}, capability: String.t()) ::
          %Dash.Capability{} | nil
  def get_one_capability(%Dash.Account{} = account, capability: capability) do
    Dash.Capability |> Repo.get_by(capability: capability, account_id: account.account_id)
  end

  @spec get_all_capabilities_for_account(%Dash.Account{}) ::
          [%Dash.Capability{}] | []
  def get_all_capabilities_for_account(%Dash.Account{} = account) do
    Dash.Capability |> Repo.all(account_id: account.account_id)
  end

  # Or raises if changeset is invalid
  @spec create_capability(%Dash.Account{}, %{
          :capability => String.t(),
          :change_time => %DateTime{},
          :is_active => boolean()
        }) :: %Dash.Capability{}
  def create_capability(
        %Dash.Account{} = account,
        %{
          capability: _capability,
          is_active: _is_active,
          change_time: _change_time
        } = capability
      ) do
    new_capability = Map.merge(%{account_id: account.account_id}, capability)

    %Dash.Capability{}
    |> Dash.Capability.changeset(new_capability)
    |> Ecto.Changeset.put_assoc(:account, account)
    |> Repo.insert!()
  end

  def delete_all_capabilities_for_account(%Dash.Account{} = account) do
    Repo.delete_all(
      from(s in Dash.Capability,
        where: s.account_id == ^account.account_id
      )
    )
  end
end
