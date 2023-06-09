import { FXA_PAYMENT_URL, PRODUCT_ID } from 'config';
import {
  RegionCodeT,
  AcceptedRegionCodeT,
  ACCEPTED_REGION_CODES,
  productionPlansIdMap,
  devPLansIdMap,
} from 'types/Countries';
import { localFeature, devFeature } from 'util/featureFlag';

/**
 * Get plan map depending on Env
 * @returns Plan map
 */
export const getPlanMap = () => {
  if (localFeature() || devFeature()) {
    return devPLansIdMap;
  }

  // Default to production vars
  return devPLansIdMap;
};

/**
 * Get the pricing page URL for a region, return default (US) pricing page if region not found
 * @param code RegionCodeT
 * @param plan names of paid plans
 * @param duration monthly or yearly payments
 * @returns URL to pricing page
 */
export const getPricePageData = (
  regionCode: RegionCodeT,
  plan: 'standard' | 'pro',
  billingPeriod: 'monthly' | 'yearly'
) => {
  const planData = getPlanMap();
  // If not accepted region or no region default to US plan
  let planUrl = `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${planData.US[plan][billingPeriod].planId}`;
  let planPrice = planData.US[plan][billingPeriod].price;
  let taxDescription = planData.US.taxDescription;
  let currencySymbol = planData.US.symbol;
  let currencyAbbrev = planData.US.abbrev;

  if (
    regionCode &&
    ACCEPTED_REGION_CODES.includes(regionCode as AcceptedRegionCodeT)
  ) {
    const planObj = planData[regionCode as AcceptedRegionCodeT];
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
