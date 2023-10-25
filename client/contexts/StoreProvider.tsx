import { createContext, ReactNode, useRef, useState } from 'react';
import {
  NewNotificationT,
  Notification,
  NotificationInterfaceT,
} from '@mozilla/lilypad-ui';
import styles from './StoreProvider.module.scss';

export type SubdomainRetryT = {
  subdomain: string;
  hubId: string;
};
type StoreProviderProps = {
  children?: ReactNode;
};
/**
 * Note: This is a top level data storage for global data that does not change
 * frequently and does not require the complexity of Redux.
 */
const initSubdomain: SubdomainRetryT = { subdomain: '', hubId: '' };

export const StoreContext = createContext({
  lastSubmittedSubdomain: initSubdomain,
  handleSubdomainChange: (value: SubdomainRetryT) => {},
  handleDispatchNotification: (value: NewNotificationT) => {},
});

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [subdomain, setSubdomain] = useState<SubdomainRetryT>(initSubdomain);
  const handleSubdomainChange = (value: SubdomainRetryT): void => {
    setSubdomain(value);
  };
  const notificationRef = useRef<NotificationInterfaceT>();

  const handleDispatchNotification = (notifcation: NewNotificationT) => {
    console.log('hi', notificationRef.current);
    notificationRef.current?.dispatchNotification(notifcation);
  };

  return (
    <StoreContext.Provider
      value={{
        lastSubmittedSubdomain: subdomain,
        handleSubdomainChange,
        handleDispatchNotification,
      }}
    >
      <Notification ref={notificationRef} classProp={styles.toast} />
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
