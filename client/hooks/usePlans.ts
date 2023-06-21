import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';

export const useIsStarter = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === 'starter';
};

export const useIsPersonal = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === 'personal';
};

export const useIsProfessional = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === 'professional';
};

export const useIsBusiness = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === 'business';
};

export const useIsProfessionalUp = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === 'personal' || account.planName === 'business';
};
