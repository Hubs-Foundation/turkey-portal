import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import { PlansE } from 'types/General';

export const useIsP0 = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === PlansE.p0;
};

export const useIsP1 = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === PlansE.p1;
};

export const useIsP2 = (): boolean => {
  const account = useSelector(selectAccount);
  console.log('account', account);
  return account.planName === PlansE.p2;
};
