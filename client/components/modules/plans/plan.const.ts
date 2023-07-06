import { HubIconT } from '@mozilla/lilypad-ui';

export type PlanInfoCopyT = {
  label: string;
  description: string;
  icon: HubIconT;
};

export const STARTER_COPY: PlanInfoCopyT[] = [
  {
    label: 'Unlimited spaces',
    description: 'With customizable environment and themes',
    icon: 'spaces',
  },
  {
    label: '10 Online guest capacity',
    description: 'Free for guests to join',
    icon: 'capacity',
  },
  {
    label: '500MB Asset storage',
    description: 'For avatars and scenes',
    icon: 'space',
  },
];

export const PERSONAL_COPY: PlanInfoCopyT[] = [
  {
    label: 'Unlimited spaces',
    description: 'With customizable environment and themes',
    icon: 'spaces',
  },
  {
    label: '20 Online guest capacity',
    description: 'Free for guests to join',
    icon: 'capacity',
  },
  {
    label: '2GB Asset storage',
    description: 'For avatars and scenes',
    icon: 'space',
  },
  {
    label: 'Custom myhubs.net web address',
    description: '',
    icon: 'address',
  },
];

export const PLAN_ID_MAP = {
  /**
   * United Kingdom
   */
  GB: {
    abbrev: 'GBP',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVoxJNcmPzuWtRGm6H9IfS',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMDh3JNcmPzuWtRpywDcgFi',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NMDi9JNcmPzuWtRE3kWUvDS',
        price: 79.0,
      },
      yearly: {
        planId: 'price_1NMDiXJNcmPzuWtRmTaukmmQ',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'price_1NMDjKJNcmPzuWtR6fRWNH6A',
        price: 479.0,
      },
      yearly: {
        planId: 'price_1NMDjuJNcmPzuWtRkGqRNg0e',
        price: 5748.0,
      },
    },
  },

  /**
   * Canada
   */
  CA: {
    abbrev: 'CAD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVpDJNcmPzuWtRw9eEAjYR',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMDphJNcmPzuWtRCiO8800B',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NME4jJNcmPzuWtRBkA6Oikz',
        price: 79.0,
      },
      yearly: {
        planId: 'price_1NME58JNcmPzuWtRr3tJJNJ9',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'price_1NME5XJNcmPzuWtRpnVLPt1A',
        price: 479.0,
      },
      yearly: {
        planId: 'price_1NME60JNcmPzuWtR2jjTY7pD',
        price: 5748.0,
      },
    },
  },

  /**
   * United States
   */
  US: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVoQJNcmPzuWtR0OYLCGAp',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NME7QJNcmPzuWtRQPW94lst',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Germany
   */
  DE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVpVJNcmPzuWtRfKxTiDOS',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NME89JNcmPzuWtR31reWxf2',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * France
   */
  FR: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVpmJNcmPzuWtRnBoCQoyk',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NME8WJNcmPzuWtR12KKiKhe',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Luxembourg
   */
  LU: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1N6cvgJNcmPzuWtRxxY3M8oE',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NME8rJNcmPzuWtRn5pbmvk5',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Belgium
   */
  BE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1N6cyIJNcmPzuWtRquNgkUAJ',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMENGJNcmPzuWtRoOKokb28',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Austria
   */
  AT: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVqGJNcmPzuWtRcjgAr4jp',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMENsJNcmPzuWtRhX5vmYsX',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Swiss Franc
   */
  CH: {
    abbrev: 'CHF',
    symbol: 'CHF ',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVqoJNcmPzuWtRZYpDKeLw',
        price: 22.22,
      },
      yearly: {
        planId: 'price_1NMGTPJNcmPzuWtRkQnPTHqQ',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Italy
   */
  IT: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVuFJNcmPzuWtRb0C1X22W',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGW7JNcmPzuWtRLHbN4JM0',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   *  * Spain
   */
  ES: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVuXJNcmPzuWtRaqLszCnA',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGb7JNcmPzuWtReyQ2iDN0',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Netherlands
   */
  NL: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVunJNcmPzuWtRTWPcYJag',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGlgJNcmPzuWtRRV5GSeIH',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Ireland
   */
  IE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVv3JNcmPzuWtRdczg6amm',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGm1JNcmPzuWtRWHcxMH0F',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * New Zealand
   */

  NZ: {
    abbrev: 'NZD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVvMJNcmPzuWtRX1QBGKSV',
        price: 12.0,
      },
      yearly: {
        planId: 'price_1NMGneJNcmPzuWtRTCcwxSwT',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Finland
   */
  FI: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVvgJNcmPzuWtRcS75a1Af',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGo1JNcmPzuWtROgccHcUi',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Sweden
   */
  SE: {
    abbrev: 'SEK',
    symbol: 'SEK ',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVw1JNcmPzuWtRh8SWab0h',
        price: 75.0,
      },
      yearly: {
        planId: 'price_1NMGomJNcmPzuWtRxbvlH3pV',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Malaysia
   */
  MY: {
    abbrev: 'MYR',
    symbol: 'RM ',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVx0JNcmPzuWtRxTKTtFVp',
        price: 33.0,
      },
      yearly: {
        planId: 'price_1NMGpJJNcmPzuWtR1X4dN8T3',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Singapore
   */
  SG: {
    abbrev: 'SGD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVyqJNcmPzuWtRpdz9tU6W',
        price: 10.0,
      },
      yearly: {
        planId: 'price_1NMGpfJNcmPzuWtRUHrCxkCq',
        price: 7,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Poland
   */
  PL: {
    abbrev: 'PLN',
    symbol: 'PLN ',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVzHJNcmPzuWtRlZccvg2A',
        price: 29.0,
      },
      yearly: {
        planId: 'price_1NMGqMJNcmPzuWtRLlnGy5yt',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Romania
   */
  RO: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NMCvqJNcmPzuWtRKj6k5prj',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGqlJNcmPzuWtRtlYKYylo',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Portugal
   */
  PT: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLW3nJNcmPzuWtRTBVhf6Wa',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGr5JNcmPzuWtRVgBsNrxa',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Denmark
   */
  DK: {
    abbrev: 'DKK',
    symbol: 'DKK ',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLW4OJNcmPzuWtRAINJv8QW',
        price: 48.0,
      },
      yearly: {
        planId: 'price_1NMGraJNcmPzuWtRcbw8vz70',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Czech Republic
   */
  CZ: {
    abbrev: 'CZK',
    symbol: 'CZK ',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLW6dJNcmPzuWtRg1dky1H7',
        price: 151.0,
      },
      yearly: {
        planId: 'price_1NMGs3JNcmPzuWtR6gq6sqyJ',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Hungary
   */
  HU: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NMCxEJNcmPzuWtRASKgkJcc',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGsjJNcmPzuWtRPCvbczTj',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Bulgaria
   */
  BG: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NMCxdJNcmPzuWtRiHdqrKcv',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGt3JNcmPzuWtRXGSpnJ6o',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Croatia
   */
  HR: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLW7jJNcmPzuWtRGv5eWRoC',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGtMJNcmPzuWtRaF5iC0Rv',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Slovakia
   */
  SK: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLW8FJNcmPzuWtRXqa95N1d',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGtlJNcmPzuWtRXV31IBM0',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Lithuania
   */
  LT: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLW8dJNcmPzuWtRglsV1UmU',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGwsJNcmPzuWtRoLh8UYHP',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Slovenia
   */
  SI: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLW9tJNcmPzuWtRRaiW9LxH',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGxSJNcmPzuWtRmEigHPZV',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Latvia
   */
  LV: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLWAKJNcmPzuWtRXmN16pHT',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGyDJNcmPzuWtRZUufcT5v',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Estonia
   */
  EE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLWB6JNcmPzuWtR7jmNiKm8',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGyUJNcmPzuWtRqV4h7EPb',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Cyprus
   */
  CY: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLWBSJNcmPzuWtR0s4h2w5z',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGymJNcmPzuWtRZf8TONUg',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },

  /**
   * Malta
   */
  MT: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLWBmJNcmPzuWtRr5DkXNAJ',
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGz3JNcmPzuWtR63iLNcOO',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 400.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
        price: 5000.22,
      },
    },
  },
};
