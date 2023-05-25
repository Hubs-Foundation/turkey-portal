export enum CountriesE {
  GERMANY = 'DE',
}

export type RegionCodeT = 'DE' | 'US' | null;

export type RegionT = {
  code: RegionCodeT;
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
