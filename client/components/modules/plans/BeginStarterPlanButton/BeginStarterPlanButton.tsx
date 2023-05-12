import {
  Button,
  CategoryE,
  NewNotificationT,
  NotificationLocationE,
  NotificationTypesE,
} from '@mozilla/lilypad-ui';
import { StoreContext } from 'contexts/StoreProvider';
import { useRouter } from 'next/router';
import { useCallback, useContext, useState } from 'react';
import { postStarterPlan } from 'services/plan.service';
import { RoutesE } from 'types/Routes';

type BeginStarterPlanButtonPropsT = {
  text: string;
  classProp?: string;
};

const BeginStarterPlanButton = ({
  text,
  classProp,
}: BeginStarterPlanButtonPropsT) => {
  const { push } = useRouter();
  const storeContext = useContext(StoreContext);
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      await postStarterPlan();
      setLoading(false);
      push(RoutesE.DASHBOARD);
    } catch (e) {
      setLoading(false);
      onError();
      console.error(e);
    }
  };

  return (
    <Button
      label={text}
      text={loading ? 'Creating...' : text}
      onClick={startStarterPlan}
      classProp={classProp}
    />
  );
};

export default BeginStarterPlanButton;
