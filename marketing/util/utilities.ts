import getEnvVariable from 'config';
import { PlansT } from 'types';
import {
  RegionCodeT,
  AcceptedRegionCodeT,
  ACCEPTED_REGION_CODES,
  PLAN_ID_MAP,
  BillingPeriod,
} from 'types/Countries';

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param code RegionCodeT
 * @param plan names of paid plans
 * @param duration monthly or yearly payments
 * @returns URL to pricing page
 */
export const getPricePageData = (
  regionCode: RegionCodeT,
  plan: Exclude<PlansT, null | 'starter'>,
  billingPeriod: BillingPeriod
) => {
  const FXA_PAYMENT_URL = getEnvVariable('FXA_PAYMENT_URL');
  const PRODUCT_ID = getEnvVariable('PRODUCT_ID');
  // If not accepted region or no region default to US plan
  let planUrl = `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${PLAN_ID_MAP.US[plan][billingPeriod].planId}`;
  let planPrice = PLAN_ID_MAP.US[plan][billingPeriod].price;
  let taxDescription = PLAN_ID_MAP.US.taxDescription;
  let currencySymbol = PLAN_ID_MAP.US.symbol;
  let currencyAbbrev = PLAN_ID_MAP.US.abbrev;

  if (
    regionCode &&
    ACCEPTED_REGION_CODES.includes(regionCode as AcceptedRegionCodeT)
  ) {
    const planObj = PLAN_ID_MAP[regionCode as AcceptedRegionCodeT];
    const { planId, price } = planObj[plan][billingPeriod];
    planUrl = `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${planId}`;
    planPrice = price;
    taxDescription = planObj.taxDescription;
    currencySymbol = planObj.symbol;
    currencyAbbrev = planObj.abbrev;
  }

  return {
    planUrl,
    planPrice,
    taxDescription,
    currencySymbol,
    currencyAbbrev,
  };
};
