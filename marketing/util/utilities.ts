import { PlansE, BillingPeriodE } from 'types/General';
import {
  RegionCodeT,
  AcceptedRegionCodeT,
  ACCEPTED_REGION_CODES,
} from 'types/Countries';
import { PLAN_ID_MAP } from 'components/shared/Subscribe/plan.const';

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param regionCode RegionCodeT
 * @param plan names of paid plans
 * @param billingPeriod monthly or yearly payments
 * @returns URL to pricing page
 */
export const getPricePageData = (
  regionCode: RegionCodeT,
  plan: Exclude<PlansE, null | PlansE.STARTER>,
  billingPeriod: BillingPeriodE
) => {
  const BASE_URL =
    'https://subscriptions.firefox.com/checkout/prod_Mo4tS8uH9y3Mj5';
  let planUrl = `${BASE_URL}}?plan=${PLAN_ID_MAP.US[plan][billingPeriod].planId}`;
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
    planUrl = `${BASE_URL}?plan=${planId}`;
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
