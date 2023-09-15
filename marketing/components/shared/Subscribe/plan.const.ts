import { HubIconT } from '@mozilla/lilypad-ui';

export type ValueProp = {
  label: string;
  description: string;
  icon: HubIconT | null;
};

export type FeaturesT = {
  title: string;
  values: string[];
};

export type PlanInfoCopyT = {
  title: string;
  subtitle: string;
  valueProps: ValueProp[];
  features: FeaturesT | null;
  status: string;
};

export const STARTER_COPY: PlanInfoCopyT = {
  title: 'Starter',
  subtitle:
    'Kickstart your XR journey with a personal, private Hub — perfect for newcomers.',
  valueProps: [
    {
      label: '10 guest capacity',
      description: 'Free for guests to join',
      icon: 'capacity',
    },
    {
      label: '500 MB asset storage',
      description: 'For avatars and scenes',
      icon: 'space',
    },
  ],
  features: null,
  status: 'Sleep after 12 hours of inactivity',
};

export const PERSONAL_COPY: PlanInfoCopyT = {
  title: 'Personal',
  subtitle:
    'Design a personal, private Hub — ideal for creatives and tinkering innovators.',
  valueProps: [
    {
      label: '20 guest capacity',
      description: 'Free for guests to join',
      icon: 'capacity',
    },
    {
      label: '2 GB asset storage',
      description: 'For avatars and scenes',
      icon: 'space',
    },
  ],
  features: {
    title: '',
    values: [
      'Add your own logos',
      'Customize the color scheme of your tools and loading screens',
      `Customize your Hub's subdomain`,
    ],
  },
  status: 'Sleep after 72 hours of inactivity',
};

export const PROFESSIONAL_COPY: PlanInfoCopyT = {
  title: 'Professional',
  subtitle:
    'Advanced customization for educators and teams who want increased engagement.',
  valueProps: [
    {
      label: '50 guest capacity',
      description: 'Free for guests to join',
      icon: 'capacity',
    },
    {
      label: '25 GB asset storage',
      description: 'For avatars and scenes',
      icon: 'space',
    },
  ],
  features: {
    title: 'Everything in Personal, plus:',
    values: [
      'Connect a custom domain to your Hub',
      'Fully control your Hub by adding custom code',
    ],
  },
  status: 'Always on — no sleeping',
};

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
      annual: {
        planId: 'price_1NMDh3JNcmPzuWtRpywDcgFi',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRgFsq4SRb',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRt6JG6pxY',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 479.0,
      },
      annual: {
        planId: 'TODO',
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
      annual: {
        planId: 'price_1NMDphJNcmPzuWtRCiO8800B',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRp0sSbSOI',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRsrI1aBCo',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 479.0,
      },
      annual: {
        planId: 'TODO',
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
      annual: {
        planId: 'price_1NME7QJNcmPzuWtRQPW94lst',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtR7WbVcB5D',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtR7Tz0aZwd',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NME89JNcmPzuWtR31reWxf2',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtR1sN9KUmj',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRsJlYMDvy',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NME8WJNcmPzuWtR12KKiKhe',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRbNkTOvMc',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtREpgZ00je',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NME8rJNcmPzuWtRn5pbmvk5',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRUgo0y9N4',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRDH59IOEe',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMENGJNcmPzuWtRoOKokb28',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtR4MSyjrBN',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtR1keWp00J',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMENsJNcmPzuWtRhX5vmYsX',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRGcrkZqg9',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRkTbP7JZD',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGTPJNcmPzuWtRkQnPTHqQ',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRpJR0Gjoe',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRSZyUNqBj',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGW7JNcmPzuWtRLHbN4JM0',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRRe3x0hrF',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRwG9IqEyU',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGb7JNcmPzuWtReyQ2iDN0',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtRB0mLplBP',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZpJNcmPzuWtRbuToqgDp',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGlgJNcmPzuWtRRV5GSeIH',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZpJNcmPzuWtR25jMlfmP',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRDZWeRzql',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGm1JNcmPzuWtRWHcxMH0F',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRNX9R1xj4',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRh6iijnSx',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGneJNcmPzuWtRTCcwxSwT',
        price: 144.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRDKEXn7H6',
        price: 124.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtR66ZV7hbN',
        price: 1488.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGo1JNcmPzuWtROgccHcUi',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRMSiE5Xpf',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRsrm6v0Ql',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGomJNcmPzuWtRxbvlH3pV',
        price: 900.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRN4D8ISTO',
        price: 809.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtR1t3PUJAW',
        price: 9708.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGpJJNcmPzuWtR1X4dN8T3',
        price: 396.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRiTkt1BJY',
        price: 357.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRvqT9Gw6o',
        price: 4284.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGpfJNcmPzuWtRUHrCxkCq',
        price: 120.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRWwZuKkyM',
        price: 104.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRe3wSHa4B',
        price: 1248.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGqMJNcmPzuWtRLlnGy5yt',
        price: 348.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRmYIGpOhk',
        price: 313.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRXuOsZ1sT',
        price: 3756.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGqlJNcmPzuWtRtlYKYylo',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRsDesS7fO',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRPnSp0irT',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGr5JNcmPzuWtRVgBsNrxa',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRamhH5qb5',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRnGeVfFBK',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGraJNcmPzuWtRcbw8vz70',
        price: 576.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRI8Ue4z1Y',
        price: 524.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtR06DLrxK5',
        price: 6288.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGs3JNcmPzuWtR6gq6sqyJ',
        price: 1812.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRScwftSfi',
        price: 1670.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtRDQYnSE0R',
        price: 20040.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGsjJNcmPzuWtRPCvbczTj',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZqJNcmPzuWtRrPSq24gg',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZqJNcmPzuWtR4DnwfzK7',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGt3JNcmPzuWtRXGSpnJ6o',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtR05xKBSME',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtRCbNEI4eh',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGtMJNcmPzuWtRaF5iC0Rv',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtRA3DdowrS',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtRn8M6jp2t',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGtlJNcmPzuWtRXV31IBM0',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtRGvn9ow0a',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtRnYdZ5bgu',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGwsJNcmPzuWtRoLh8UYHP',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtRyCCgDfIh',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtRGjncjvQD',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGxSJNcmPzuWtRmEigHPZV',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtR3tnqBB26',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtRPULWJLH6',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGyDJNcmPzuWtRZUufcT5v',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtRvCWCu6L2',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtRHlBsAPbd',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGyUJNcmPzuWtRqV4h7EPb',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtRxaHT1eQ1',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtR5JghaMpt',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGymJNcmPzuWtRZf8TONUg',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtRt7BBV8Sb',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtR5KXkD726',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
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
      annual: {
        planId: 'price_1NMGz3JNcmPzuWtR63iLNcOO',
        price: 84.0,
      },
    },
    professional: {
      monthly: {
        planId: 'price_1NTzZrJNcmPzuWtR2qD5KvO6',
        price: 79.0,
      },
      annual: {
        planId: 'price_1NTzZrJNcmPzuWtRGIMXq50n',
        price: 948.0,
      },
    },
    business: {
      monthly: {
        planId: 'TODO',
        price: 400.22,
      },
      annual: {
        planId: 'TODO',
        price: 948.0,
      },
    },
  },
};
