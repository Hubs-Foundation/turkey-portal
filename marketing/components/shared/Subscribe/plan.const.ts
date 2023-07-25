import { HubIconT } from '@mozilla/lilypad-ui';

export type PlanInfoCopyT = {
  label: string;
  description: string;
  icon: HubIconT | null;
};

export const STARTER_COPY: PlanInfoCopyT[] = [
  {
    label: '10 guest capacity',
    description: 'Free for guests to join',
    icon: null,
  },
  {
    label: '500MB Asset storage',
    description: 'For avatars and scenes',
    icon: null,
  },
];

export const PERSONAL_COPY: PlanInfoCopyT[] = [
  {
    label: '20 guest capacity',
    description: 'Free for guests to join',
    icon: null,
  },
  {
    label: '2GB Asset storage',
    description: 'For avatars and scenes',
    icon: null,
  },
  {
    label: 'Customize your Hub’s subdomain',
    description: '',
    icon: null,
  },
  {
    label: 'Add your own logos',
    description: '',
    icon: null,
  },
  {
    label: 'Customize the color scheme of your tools and loading screens',
    description: '',
    icon: null,
  },
];

export const PROFESSIONAL_COPY: PlanInfoCopyT[] = [
  {
    label: '50 guest capacity',
    description: 'Free for guests to join',
    icon: null,
  },
  {
    label: '25GB Asset storage',
    description: 'For avatars and scenes',
    icon: null,
  },
  {
    label: 'Connect a custom domain to your Hub',
    description: '',
    icon: null,
  },
  {
    label: 'Add your own logos',
    description: '',
    icon: null,
  },
  {
    label: 'Customize the color scheme of your tools and loading screens',
    description: '',
    icon: null,
  },
  {
    label: 'Fully control your Hub with access to Mozilla’s codebase',
    description: '',
    icon: null,
  },
];

export const PLAN_ID_MAP = {
  /**
   * United Kingdom
   */
  GB: {
    abbrev: 'GBP',
    symbol: '£',
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
        planId: 'price_1NTzZpJNcmPzuWtRgFsq4SRb',
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
        planId: 'price_1NTzZpJNcmPzuWtRp0sSbSOI',
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
        planId: 'price_1NTzZpJNcmPzuWtR7WbVcB5D',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtR1sN9KUmj',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtRbNkTOvMc',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtRUgo0y9N4',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtR4MSyjrBN',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtRGcrkZqg9',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        price: 7.0,
      },
      yearly: {
        planId: 'price_1NMGTPJNcmPzuWtRkQnPTHqQ',
        price: 100.22,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRpJR0Gjoe',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtRRe3x0hrF',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtRB0mLplBP',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZpJNcmPzuWtR25jMlfmP',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRNX9R1xj4',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRDKEXn7H6',
        price: 124.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRMSiE5Xpf',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRN4D8ISTO',
        price: 809.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
  },

  /**
   * Malaysia
   */
  MY: {
    abbrev: 'MYR',
    symbol: 'MYR ',
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
        planId: 'price_1NTzZqJNcmPzuWtRiTkt1BJY',
        price: 357.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
  },

  /**
   * Singapore
   */
  SG: {
    abbrev: 'SGD',
    symbol: 'SGD ',
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
        planId: 'price_1NTzZqJNcmPzuWtRWwZuKkyM',
        price: 104.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRmYIGpOhk',
        price: 313.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRsDesS7fO',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRamhH5qb5',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRI8Ue4z1Y',
        price: 524.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRScwftSfi',
        price: 1670.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZqJNcmPzuWtRrPSq24gg',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtR05xKBSME',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtRA3DdowrS',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtRGvn9ow0a',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtRyCCgDfIh',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtR3tnqBB26',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtRvCWCu6L2',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtRxaHT1eQ1',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtRt7BBV8Sb',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
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
        planId: 'price_1NTzZrJNcmPzuWtR2qD5KvO6',
        price: 79.0,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      yearly: {
        planId: 'TODO',
        price: 5000.22,
      },
    },
  },
};
