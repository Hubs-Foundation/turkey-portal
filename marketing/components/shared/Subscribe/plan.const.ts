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
  DE: {
    abbrev: 'EUR',
    symbol: '€',
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
  IT: {
    abbrev: 'EUR',
    symbol: '€',
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
  ER: {
    abbrev: 'EUR',
    symbol: '€',
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
  NL: {
    abbrev: 'EUR',
    symbol: '€',
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
  IE: {
    abbrev: 'EUR',
    symbol: '€',
    taxDescription: ' i love taxes',
    personal: {
      monthly: {
        planId: 'PLAN_ID_EA',
        price: 22.49,
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
  FR: {
    abbrev: 'EUR',
    symbol: '€',
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
  LU: {
    abbrev: 'EUR',
    symbol: '€',
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
  BE: {
    abbrev: 'EUR',
    symbol: '€',
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
  AU: {
    abbrev: 'EUR',
    symbol: '€',
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
  GB: {
    abbrev: 'USD',
    symbol: '$',
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
  CA: {
    abbrev: 'USD',
    symbol: '$',
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
  NZ: {
    abbrev: 'NZD',
    symbol: '$',
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
};
