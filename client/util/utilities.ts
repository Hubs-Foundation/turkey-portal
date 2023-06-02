import { FXA_PAYMENT_URL, PLAN_ID_EA, PLAN_ID_EA_DE, PRODUCT_ID } from 'config';
import {
  RegionCurrency,
  RegionCodeT,
  CurrencyAbbrev,
  AcceptedRegionCodeT,
  ACCEPTED_REGION_CODES,
} from 'types/Countries';

/**
 * Convert abbrev to symbol from subscription
 * @param currency
 * @returns
 */
export const convertCurrency = (currency: CurrencyAbbrev) => {
  const { US, DE } = RegionCurrency;

  switch (currency) {
    case 'EUR':
      return '€';
    case 'USD':
      return '$';
    default:
      return '$';
  }
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

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param code RegionCodeT
 * @returns URL to pricing page
 */
export const getRegionPricePageUrl = (regionCode: RegionCodeT) => {
  let planId;

  switch (regionCode) {
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
