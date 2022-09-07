import { IconT } from '@mozilla/lilypad';

export type SubscriptionInfoCopyT = {
  label: string;
  description: string;
  icon: IconT;
};

const SubscriptionInfoCopy: SubscriptionInfoCopyT[] = [
  {
    label: 'Unlimited spaces',
    description: 'With customizable environment and themes',
    icon: 'spaces',
  },
  {
    label: '25 Online guest capacity',
    description: 'Applies to the entire hub',
    icon: 'capacity',
  },
  {
    label: '5GB Asset storage',
    description: 'For avatars and scenes',
    icon: 'space',
  },
  {
    label: 'Custom myhubs.net web address',
    description: '',
    icon: 'address',
  },
];
export default SubscriptionInfoCopy;
