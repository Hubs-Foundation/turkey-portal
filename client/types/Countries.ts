export const ACCEPTED_REGION_CODES = [
  'DE',
  'IT',
  'ES',
  'NL',
  'IE',
  'FR',
  'LU',
  'BE',
  'AU',
  'US',
  'GB',
  'CA',
  'CH',
  'NZ',
  'SG',
] as const;
export type AcceptedRegionCodeT = typeof ACCEPTED_REGION_CODES[number];
export type RegionCodeT = AcceptedRegionCodeT | string | null;
export type CurrencyAbbrev =
  | 'EUR'
  | 'USD'
  | 'GBP'
  | 'CAD'
  | 'CHF'
  | 'NZD'
  | 'SGD';

export type RegionT = {
  regionCode: RegionCodeT;
};

export enum CurrencySymbolMap {
  USD = '$',
  EUR = '€',
  CHF = 'CHF',
  SGD = '$',
  NZD = '$',
  GBP = '£',
  CAD = '$',
}
