export type TierT = 'p0' | 'p1' | 'b0';

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
  domain: string;
  hubId: string;
  name: string;
  status: StatusE;
  lastError: LastErrorE | null;
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
  lastError: LastErrorE | null;
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
  planName: PlansE | null;
};

// The order of this Plan enum matters, do not
// change the order from least to most permissions.
export enum PlansE {
  STARTER = 'starter',
  LEGACY = 'standard',
  PERSONAL = 'personal',
  PROFESSIONAL = 'professional',
  BUSINESS = 'business',
}

export enum BillingPeriodE {
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum StorageStateE {
  DEFAULT = 'default',
  WARNING = 'warning',
  CRITICAL = 'critical',
}
