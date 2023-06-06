export type TierT = 'mvp' | 'premium' | 'p0' | 'p1';
export type FormattedTierT = 'Mvp' | 'Starter' | 'Early Access' | 'Premium';

export enum PlansE {
  p0 = 'starter',
  p1 = 'standard',
}

export type FormattedTierMapT = {
  [key in TierT]: FormattedTierT;
};

export enum StatusE {
  CREATING = 'creating',
  UPDATING = 'updating',
  READY = 'ready',
  ERROR = 'error',
}

export enum LastErrorE {
  SUBDOMAIN_ERROR = 'subdomainError',
  SUBDOMAIN_REVERTED = 'subdomainReverted',
  CREATING_ERROR = 'creatingError',
  ERROR = 'error',
}

export type HubT = {
  ccuLimit: number;
  currentCcu: number | null;
  currentStorageMb: number;
  hubId: string;
  name: string;
  status: StatusE;
  lastError: LastErrorE | null;
  storageLimitMb: number;
  subdomain: string;
  tier: TierT;
};

export type UpdateHubT = Pick<HubT, 'name' | 'subdomain'>;

export type AccountT = {
  displayName: string;
  email: string;
  profilePic: string;
  isLoggedIn?: boolean;
  hasHubs?: boolean;
  hasSubscription: boolean;
  hasCreatingHubs: boolean;
  isInitialized: boolean;
  hasPlan: boolean;
  planName: PlansT;
};

type PlansT = PlansE.p0 | PlansE.p1 | null;

export enum StorageStateE {
  DEFAULT = 'default',
  WARNING = 'warning',
  CRITICAL = 'critical',
}
