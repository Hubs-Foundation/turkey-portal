import { FXA_PAYMENT_URL, PLAN_ID_EA, PLAN_ID_EA_DE, PRODUCT_ID } from 'config';
import { RegionCurrency, RegionCodeT } from 'types/Countries';

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
export const getCurrencyMeta = (region: RegionCodeT) => {
  return region && RegionCurrency[region]
    ? RegionCurrency[region]
    : RegionCurrency.US;
};

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param code RegionCodeT
 * @returns URL to pricing page
 */
export const getRegionPricePageUrl = (code: RegionCodeT) => {
  let planId;

  switch (code) {
    case 'US':
      planId = PLAN_ID_EA;
      break;

    case 'DE':
      planId = PLAN_ID_EA_DE;
      break;

    default:
      planId = PLAN_ID_EA;
      break;
  }

  return `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${planId}`;
};
