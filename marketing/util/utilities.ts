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
 * @param regionCode
 * @returns RegionCurrency[country code]
 */
export const getCurrencyMeta = (regionCode: RegionCodeT) => {
  return regionCode && RegionCurrency[regionCode]
    ? RegionCurrency[regionCode]
    : RegionCurrency.US;
};

export const enabledStarterPlan = (): boolean => {
  return getEnvVariable('ENABLE_STARTER_PLAN') === 'enabled';
};
