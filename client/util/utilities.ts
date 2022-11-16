import { RegionCurrency, RegionsT } from 'types/Countries';

/**
 * Convert abbrev to symbol
 * @param currency
 * @returns
 */
export const convertCurrency = (currency: string | null) => {
  const { US, DE } = RegionCurrency;
  if (!currency) return;
  switch (currency.toUpperCase()) {
    case DE.abbrev:
      return DE.symbol;
    case US.abbrev:
      return US.symbol;
    default:
      return US.symbol;
  }
};

/**
 * Get meta data about a region
 * @param region
 * @returns RegionCurrency[country code]
 */
export const getCurrencyMeta = (region: RegionsT) => {
  if (!region) return RegionCurrency.US;

  return RegionCurrency[region];
};
