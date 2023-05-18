import { FXA_PAYMENT_URL, PLAN_ID_EA, PLAN_ID_EA_DE, PRODUCT_ID } from 'config';
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
  return region && RegionCurrency[region]
    ? RegionCurrency[region]
    : RegionCurrency.US;
};

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param region any region
 * @returns URL to pricing page
 */
export const getRegionPricePageUrl = (region: RegionsT) => {
  const regionUpperCase = region?.toUpperCase();

  const planId = regionUpperCase === 'DE' ? PLAN_ID_EA_DE : PLAN_ID_EA;

  return `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${planId}`;
};
