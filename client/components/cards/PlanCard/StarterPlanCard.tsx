import {
  Button,
  CategoryE,
  NewNotificationT,
  NotificationLocationE,
  NotificationTypesE,
} from '@mozilla/lilypad-ui';
import { StarterPlanInfoCopy } from './PlanInfoCopy';
import { Price, BasePlanCard } from './BasePlanCard';
import { postStarterPlan } from 'services/plan.service';
import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { StoreContext } from 'contexts/StoreProvider';

export const StarterPlanCard = () => {
  const { push } = useRouter();
  const storeContext = useContext(StoreContext);

  const onError = useCallback(() => {
    storeContext.handleDispatchNotification({
      title: 'Error',
      description: 'Failed to create Starter Hub, please try again.',
      duration: 8000,
      type: NotificationTypesE.ERROR,
      location: NotificationLocationE.TOP_RIGHT,
      pauseOnHover: true,
      autoClose: true,
      hasIcon: true,
      category: CategoryE.TOAST,
    } as NewNotificationT);
  }, [storeContext]);

  const startStarterPlan = async () => {
    try {
      // TODO Add a waiting state so the user isn't just sitting here
      await postStarterPlan();
      push('/dashboard');
    } catch (e) {
      onError();
      console.error(e);
    }
  };

  return (
    <BasePlanCard
      title="Starter"
      price={<Price region={null} price="Free" />}
      infoCopyList={StarterPlanInfoCopy}
      confirmButton={
        <Button
          label="Create free hub"
          text="Create free hub"
          onClick={startStarterPlan}
        />
      }
    />
  );
};
