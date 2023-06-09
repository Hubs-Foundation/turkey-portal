import { PLAN_ID_EA } from 'config';

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

export enum CurrencySymbolMap {
  USD = '$',
  EUR = '€',
  CHF = 'CHF',
  SGD = '$',
  NZD = '$',
  GBP = '£',
  CAD = '$',
}

export const productionPlansIdMap = {
  DE: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  IT: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  ER: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  NL: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  IE: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  FR: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  LU: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  BE: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  AU: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  US: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  GB: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  CA: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  CH: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  NZ: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
  SG: {
    standard: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
    pro: {
      monthly: PLAN_ID_EA,
      yearly: PLAN_ID_EA,
    },
  },
};

export const devPLansIdMap = {
  DE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  IT: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  ER: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  NL: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  IE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  FR: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  LU: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  BE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  AU: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  US: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: ' + tax',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 20.0,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  GB: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  CA: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  CH: {
    abbrev: 'CHF',
    symbol: 'CHF',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  NZ: {
    abbrev: 'NZD',
    symbol: '$',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
  SG: {
    abbrev: 'SGD',
    symbol: '$',
    taxDescription: '',
    standard: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 22.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 100.22,
      },
    },
    pro: {
      monthly: {
        planId: PLAN_ID_EA,
        price: 400.22,
      },
      yearly: {
        planId: PLAN_ID_EA,
        price: 5000.22,
      },
    },
  },
};
