import { RegionCurrency, RegionsT } from 'types/Countries';

/**
 * Get meta data about a region
 * @param region
 * @returns RegionCurrency[country code]
 */
export const getCurrencyMeta = (region: RegionsT) => {
  if (!region) return RegionCurrency.US;

  return RegionCurrency[region];
};
