import getEnvVariable from 'config';
import { ACCEPTED_REGION_CODES, AcceptedRegionCodeT } from 'types/Countries';

const RegionCurrency = {
  DE: {
    abbrev: 'EUR',
    symbol: '€',
  },
  US: {
    abbrev: 'USD',
    symbol: '$',
  },
};

/**
 * Get meta data about a region
 * @param region
 * @returns RegionCurrency
 */
export const getCurrencyMeta = (region: string) => {
  if (!ACCEPTED_REGION_CODES.includes(region as AcceptedRegionCodeT)) {
    return RegionCurrency.US;
  }

  switch (region as AcceptedRegionCodeT) {
    case 'DE':
      return RegionCurrency.DE;
    case 'US':
      return RegionCurrency.US;
    default:
      return RegionCurrency.US;
  }
};

export const enabledStarterPlan = (): boolean => {
  return getEnvVariable('ENABLE_STARTER_PLAN') === 'enabled';
};
