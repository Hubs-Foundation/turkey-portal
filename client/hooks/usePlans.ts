import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import { PlansE } from 'types/General';

export const useIsStarter = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === PlansE.STATER;
};

export const useIsPersonal = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === PlansE.PERSONAL;
};

export const useIsProfessional = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === PlansE.PROFESSIONAL;
};

export const useIsBusiness = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === PlansE.BUSINESS;
};

export const useIsProfessionalUp = (): boolean => {
  const account = useSelector(selectAccount);
  return account.planName === 'personal' || account.planName === 'business';
};
