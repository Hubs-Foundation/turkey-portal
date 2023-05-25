import { RegionCodeT } from 'types/Countries';
import getEnvVariable from 'config';

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
 * @returns RegionCurrency[country code]
 */
export const getCurrencyMeta = (region: RegionCodeT) => {
  return region && RegionCurrency[region]
    ? RegionCurrency[region]
    : RegionCurrency.US;
};

export const enabledStarterPlan = (): boolean => {
  return getEnvVariable('ENABLE_STARTER_PLAN') === 'enabled';
};
