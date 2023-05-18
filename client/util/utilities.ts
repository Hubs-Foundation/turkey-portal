import { FXA_PAYMENT_URL, PRODUCT_ID } from 'config';
import getConfig from 'next/config';
import { RegionCurrency, RegionsT } from 'types/Countries';
import { SubscriptionCodeT } from 'types/General';

const { publicRuntimeConfig } = getConfig();

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
 * Plan env name MUST follow PLAN_ID_[subscriptionCode]_[region]
 * @param subscriptionCode EA / P0 / P1
 * @param region any region
 * @returns URL to pricing page
 */
export const getRegionPricePageUrl = (
  subscriptionCode: SubscriptionCodeT,
  region: RegionsT
) => {
  const regionUpperCase = region?.toUpperCase();
  const subscriptionCodeUpperCase = subscriptionCode.toUpperCase();

  // Generates the proper reference to the Plan ID in the config publicRuntimeConfig
  // Plan env name in publicRuntimeConfig MUST follow:
  // PLAN_ID_[subscriptionCode]_[region]
  //
  // Ex - Germany subscriptionCode='EA' region='DE' = 'PLAN_ID_EA_DE'
  const regionEnvMapping: string = `PLAN_ID_${subscriptionCodeUpperCase}_${regionUpperCase}`;
  const regionPlanId: string | undefined =
    publicRuntimeConfig[regionEnvMapping];
  // Default to 'US', if region not found
  const defaultEnvMapping: string = `PLAN_ID_${subscriptionCodeUpperCase}`;

  const planId: string = !regionPlanId
    ? publicRuntimeConfig[defaultEnvMapping]
    : regionPlanId;

  // Error if no planId at all
  if (!planId)
    console.error(
      `Error in getRegionPricePageURL(), could not get PLAN_ID from env variables and default did not work. (subscriptionCode: ${subscriptionCode}, region: ${region})`
    );

  return `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${planId}`;
};
