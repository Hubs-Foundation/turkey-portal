import { IconT } from 'types/General';

export type SubscriptionInfoCopyT = {
  label: string;
  description: string;
  icon: IconT;
};


// TODO UPDATE ICON ASSETS 
const SubscriptionInfoCopy: SubscriptionInfoCopyT[] = [
  {
    label: 'Unlimited spaces',
    description: 'With customizable environment and themes',
    icon: 'alert-circle',
  },
  {
    label: '25 Online guest capacity',
    description: 'Applies to the entire hub',
    icon: 'alert-circle',
  },
  {
    label: '5GB Asset storage',
    description: 'For avatars and scenes',
    icon: 'alert-circle',
  },
  {
    label: 'Custom myhubs.net web address',
    description: '',
    icon: 'alert-circle',
  },
];export default SubscriptionInfoCopy;

