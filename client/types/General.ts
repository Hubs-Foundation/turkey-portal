export type TierT = 'mvp' | 'premium' | 'p0' | 'p1';
export type FormattedTierT = 'Mvp' | 'Starter' | 'Early Access' | 'Premium';

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
  currentStorageMb: number | null;
  hubId: string;
  name: string;
  status: StatusE;
  lastError: LastErrorE | '';
  storageLimitMb: number;
  subdomain: string;
  tier: TierT;
};

// TODO Do we still need this?
export type UpdateHubT = {
  name: string;
  ccuLimit: number;
  storageLimitMb: number;
  tier: TierT;
  subdomain: string;
  status: StatusE;
  lastError: LastErrorE | '';
};

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

type PlansT = 'starter' | 'personal' | 'professional' | 'business' | null;

export enum StorageStateE {
  DEFAULT = 'default',
  WARNING = 'warning',
  CRITICAL = 'critical',
}
