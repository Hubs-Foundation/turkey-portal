export enum CountriesE {
  GERMANY = 'DE',
}

export type RegionsT = 'DE' | 'US' | null;

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
