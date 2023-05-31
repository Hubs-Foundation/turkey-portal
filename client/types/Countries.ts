export enum CountriesE {
  GERMANY = 'DE',
}

export type RegionCodeT = AcceptedRegionCodeT | string | null;
export type CurrencyAbbrev = 'EUR' | 'USD';
export type AcceptedRegionCodeT = 'DE' | 'US';
export const ACCEPTED_REGION_CODES = ['DE', 'US'];

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
