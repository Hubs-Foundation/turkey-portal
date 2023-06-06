export enum CountriesE {
  GERMANY = 'DE',
}

export const ACCEPTED_REGION_CODES = ['DE', 'US'] as const;
export type AcceptedRegionCodeT = typeof ACCEPTED_REGION_CODES[number];
export type RegionCodeT = AcceptedRegionCodeT | string | null;
export type CurrencyAbbrev = 'EUR' | 'USD';

export type RegionT = {
  regionCode: RegionCodeT;
};

export const RegionCurrency = {
  DE: {
    abbrev: 'EUR',
    symbol: '€',
  },
  US: {
    abbrev: 'USD',
    symbol: '$',
  },
};
