import { RegionsT } from 'types';

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
export const getCurrencyMeta = (region: RegionsT) => {
  return region && RegionCurrency[region]
    ? RegionCurrency[region]
    : RegionCurrency.US;
};
