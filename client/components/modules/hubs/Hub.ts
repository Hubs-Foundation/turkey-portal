import {
  TierT,
  FormattedTierT,
  FormattedTierMapT,
  HubT,
  StorageStateE,
} from 'types/General';

export default class Hub {
  tier: TierT;
  currentStorageMb: number;
  storageLimitMb: number;
  FormattedTierMap: Readonly<FormattedTierMapT> = {
    mvp: 'Mvp',
    premium: 'Premium',
    p0: 'Starter',
    p1: 'Early Access',
  };

  constructor({ tier, currentStorageMb, storageLimitMb }: HubT) {
    this.tier = tier;
    this.currentStorageMb = currentStorageMb;
    this.storageLimitMb = storageLimitMb;
  }

  /**
   * Get Formatted Tier
   * @returns FormattedTierT
   */
  formattedTier(): FormattedTierT {
    return this.FormattedTierMap[this.tier];
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
    let status = StorageStateE.DEFAULT;

    storagePercent > 75 && (status = StorageStateE.WARNING);
    storagePercent >= 100 && (status = StorageStateE.CRITICAL);

    return status;
  }
}
