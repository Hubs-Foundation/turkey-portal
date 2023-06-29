export const ACCEPTED_REGION_CODES = [
  'GB',
  'CA',
  'US',
  'DE',
  'FR',
  'LU',
  'BE',
  'AU',
  'CH',
  'IT',
  'ES',
  'NL',
  'IE',
  'NZ',
  'FI',
  'SE',
  'MY',
  'SG',
  'PL',
  'RO',
  'PT',
  'DK',
  'CZ',
  'HU',
  'BG',
  'HR',
  'SK',
  'LT',
  'SI',
  'LV',
  'EE',
  'CY',
  'MT',
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
