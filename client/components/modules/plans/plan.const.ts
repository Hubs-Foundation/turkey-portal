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
    label: '25 Online guest capacity',
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
   * Finland
   */
  FI: {
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
  AU: {
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
   * Malaysia
   */
  MY: {
    abbrev: 'MYR',
    symbol: 'RM',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVx0JNcmPzuWtRxTKTtFVp',
        price: 7.0,
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
   * Sweden
   */
  SE: {
    abbrev: 'SEK',
    symbol: 'kr',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVw1JNcmPzuWtRh8SWab0h',
        price: 7.0,
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
   * United States
   */
  US: {
    abbrev: 'USD',
    symbol: '$',
    taxDescription: ' + tax',
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
   * United Kingdom
   */
  GB: {
    abbrev: 'USD',
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
   * Swiss Franc
   */
  CH: {
    abbrev: 'CHF',
    symbol: 'CHF',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
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
   * New Zealand
   */
  NZ: {
    abbrev: 'NZD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'price_1NLVvMJNcmPzuWtRX1QBGKSV',
        price: 7.0,
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
   * Singapore
   */
  SG: {
    abbrev: 'SGD',
    symbol: '$',
    taxDescription: '',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.22,
      },
      yearly: {
        planId: 'PLAN_ID_EA',
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
};
