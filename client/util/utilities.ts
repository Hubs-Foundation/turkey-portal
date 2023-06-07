import { FXA_PAYMENT_URL, PLAN_ID_EA, PLAN_ID_EA_DE, PRODUCT_ID } from 'config';
import {
  RegionCurrencys,
  RegionCodeT,
  CurrencyAbbrev,
  AcceptedRegionCodeT,
  ACCEPTED_REGION_CODES,
  PlanMap,
} from 'types/Countries';

/**
 * Convert abbrev to symbol from subscription
 * @param currency
 * @returns
 */
export const convertCurrency = (currency: CurrencyAbbrev) => {
  let symbol = '$';
  for (const key in RegionCurrencys) {
    const RegionCurrency = RegionCurrencys[key as AcceptedRegionCodeT];
    if (RegionCurrency.abbrev === currency) {
      symbol = RegionCurrency.symbol;
    }
  }
  return symbol;
};

/**
 * Get meta data about a region
 * @param region
 * @returns RegionCurrency
 */
export const getCurrencyMeta = (regionCode: string) => {
  if (!ACCEPTED_REGION_CODES.includes(regionCode as AcceptedRegionCodeT)) {
    return RegionCurrencys.US;
  }

  return RegionCurrencys[regionCode as AcceptedRegionCodeT];
};

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param code RegionCodeT
 * @param plan names of paid plans
 * @param duration monthly or yearly payments
 * @returns URL to pricing page
 */
export const getPricePageUrl = (
  regionCode: RegionCodeT,
  plan: 'standard' | 'pro',
  duration: 'month' | 'year'
) => {
  // If not accepted region or no region set to US plan
  if (
    !ACCEPTED_REGION_CODES.includes(regionCode as AcceptedRegionCodeT) ||
    !regionCode
  ) {
    return `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${PLAN_ID_EA}`;
  }

  const planId = PlanMap[regionCode as AcceptedRegionCodeT][plan][duration];
  return `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${planId}`;
};
