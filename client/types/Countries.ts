import { PLAN_ID_EA } from 'config';

export enum CountriesE {
  GERMANY = 'DE',
}

export const ACCEPTED_REGION_CODES = [
  'DE',
  'IT',
  'ER',
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

const EURO = {
  abbrev: 'EUR',
  symbol: '€',
};

export const RegionCurrencys = {
  DE: EURO,
  IT: EURO,
  ER: EURO,
  NL: EURO,
  IE: EURO,
  FR: EURO,
  LU: EURO,
  BE: EURO,
  AU: EURO,
  US: {
    abbrev: 'USD',
    symbol: '$',
  },
  GB: {
    abbrev: 'GBP',
    symbol: '£',
  },
  CA: {
    abbrev: 'CAD',
    symbol: '$',
  },
  CH: {
    abbrev: 'CHF',
    symbol: 'CHF',
  },
  NZ: {
    abbrev: 'NZD',
    symbol: '$',
  },
  SG: {
    abbrev: 'SGD',
    symbol: '$',
  },
};

export const PlanMap = {
  DE: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  IT: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  ER: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  NL: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  IE: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  FR: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  LU: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  BE: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  AU: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  US: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  GB: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  CA: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  CH: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  NZ: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
  SG: {
    standard: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
    pro: {
      month: PLAN_ID_EA,
      year: PLAN_ID_EA,
    },
  },
};
