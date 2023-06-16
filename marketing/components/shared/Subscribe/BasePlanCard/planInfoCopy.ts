import { HubIconT } from '@mozilla/lilypad-ui';

export type PlanInfoCopyT = {
  label: string;
  description: string;
  icon: HubIconT;
};

export const starterPlanInfoCopy: PlanInfoCopyT[] = [
  {
    label: 'Unlimited spaces',
    description: 'Customizable environment and themes',
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

export const PersonalPlanInfoCopy: PlanInfoCopyT[] = [
  {
    label: 'Unlimited spaces',
    description: 'Customizable environment and themes',
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
