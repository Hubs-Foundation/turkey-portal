import { PlansE, BillingPeriodE, pricePageDataT } from 'types/General';
import {
  RegionCodeT,
  AcceptedRegionCodeT,
  ACCEPTED_REGION_CODES,
} from 'types/Countries';
import { getPlanData } from '../services/plan.service';

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param code RegionCodeT
 * @param plan names of paid plans
 * @param duration monthly or yearly payments
 * @returns URL to pricing page
 */
export const getPricePageData = async (
  regionCode: RegionCodeT,
  plan: Exclude<PlansE, null | PlansE.STARTER | PlansE.LEGACY>,
  billingPeriod: BillingPeriodE
) => {
  const PersonalProdId = 'prod_Mo4tS8uH9y3Mj5';
  const ProfessionalProdId = 'prod_OGWdlewqBfGPy0';
  const prodID = plan === PlansE.PERSONAL ? PersonalProdId : ProfessionalProdId;
  const BASE_URL = `https://subscriptions.firefox.com/checkout/${prodID}`;

  if (
    regionCode &&
    ACCEPTED_REGION_CODES.includes(regionCode as AcceptedRegionCodeT)
  ) {
    const PLAN_ID_MAP = await getPlanData(regionCode as AcceptedRegionCodeT);
    const { planId, price } = PLAN_ID_MAP[plan][billingPeriod];

    return {
      planUrl: `${BASE_URL}?plan=${planId}`,
      planPrice: price,
      taxDescription: PLAN_ID_MAP.taxDescription,
      currencySymbol: PLAN_ID_MAP.symbol,
      currencyAbbrev: PLAN_ID_MAP.abbrev,
    };
  } else {
    // If not accepted region or no region default to US plan
    const PLAN_ID_MAP = await getPlanData('US');
    const { planId, price } = PLAN_ID_MAP[plan][billingPeriod];

    return {
      planUrl: `${BASE_URL}?plan=${planId}`,
      planPrice: price,
      taxDescription: PLAN_ID_MAP.taxDescription,
      currencySymbol: PLAN_ID_MAP.symbol,
      currencyAbbrev: PLAN_ID_MAP.abbrev,
    };
  }
};

/**
 * Check if Plan is less than current one
 * @param current
 * @param compare
 * @returns
 */
export const isPlanLessThan = (
  current: PlansE,
  compare: Exclude<PlansE, PlansE.LEGACY>
): boolean => {
  // Handle Legacy Personal plan
  const currentPlan = current === PlansE.LEGACY ? PlansE.PERSONAL : current;
  const keys = Object.keys(PlansE);
  const currentIndex = keys.indexOf(currentPlan.toUpperCase());
  const compareIndex = keys.indexOf(compare.toUpperCase());

  return currentIndex > compareIndex;
};
