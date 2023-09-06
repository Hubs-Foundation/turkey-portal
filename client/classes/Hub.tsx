import { TierT, HubT, StorageStateE, StatusE, LastErrorE } from 'types/General';
import {
  validateHubSubdomain as validateSubdomain,
  validationResponseT,
  updateHub,
} from 'services/hub.service';

export const loadingHub: HubT = {
  ccuLimit: 0,
  currentCcu: 0,
  currentStorageMb: 0,
  domain: '',
  hubId: '',
  name: 'Untitled Hub',
  status: StatusE.CREATING,
  lastError: null,
  storageLimitMb: 0,
  subdomain: '',
  tier: 'premium',
};

export default class Hub {
  ccuLimit: number;
  currentCcu: number | null;
  currentStorageMb: number | null;
  hubId: string;
  name: string;
  status: StatusE;
  lastError: LastErrorE | null;
  storageLimitMb: number;
  subdomain: string;
  domain: string;
  fullDomain: string;
  tier: TierT;

  constructor({
    ccuLimit,
    currentCcu,
    currentStorageMb,
    hubId,
    name,
    status,
    lastError,
    storageLimitMb,
    subdomain,
    domain,
    tier,
  }: HubT) {
    this.ccuLimit = ccuLimit;
    this.currentCcu = currentCcu;
    this.currentStorageMb = currentStorageMb;
    this.hubId = hubId;
    this.name = name;
    this.status = status;
    this.lastError = lastError;
    this.storageLimitMb = storageLimitMb;
    this.subdomain = subdomain;
    this.domain = domain;
    this.fullDomain = `https://${subdomain}.${domain}`;
    this.tier = tier;
  }

  /**
   * Round Storage MB
   * @returns string
   */
  roundedCurrentStorageMb(): string {
    if (this.currentStorageMb == null) return 'Configuring';
    // TODO - In the future, I guess we'd use i18n routing and useRouter to get the current
    // locale, but for now default to "en-US".
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
    }).format(this.currentStorageMb);
  }

  /**
   * Storage Percentage
   * @returns number
   */
  getStoragePercent(): number {
    if (this.currentStorageMb === 0 || this.currentStorageMb === null) return 0;
    return Math.min(100, this.currentStorageMb / this.storageLimitMb) * 100;
  }

  /**
   * Storage State
   * @returns StorageStateE
   */
  getStorageState(): StorageStateE {
    const storagePercent = this.getStoragePercent();
    const warningThreshold = 75;
    const criticalThreshold = 100;
    let status = StorageStateE.DEFAULT;

    storagePercent > warningThreshold && (status = StorageStateE.WARNING);
    storagePercent >= criticalThreshold && (status = StorageStateE.CRITICAL);

    return status;
  }

  /**
   * Validate subdomain for bad words or already in use
   * @param value
   * @returns Promise<validationResponseT>
   */
  async validateHubSubdomain(value: string): Promise<validationResponseT> {
    return await validateSubdomain(this.hubId, value);
  }

  /**
   * Update Hub Subdomain
   * @param value
   * @returns response status
   */
  async updateSubdomain(
    value: string
  ): Promise<{ status: number | undefined }> {
    const response = await updateHub(this.hubId, {
      ...this,
      subdomain: value,
    });

    return {
      status: response?.status,
    };
  }
}
