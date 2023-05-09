import { createContext, ReactNode, useRef } from 'react';
import {
  NewNotificationT,
  Notification,
  NotificationInterfaceT,
} from '@mozilla/lilypad-ui';

type NotificationProviderProps = {
  children?: ReactNode;
};

export const NotificationContext = createContext({
  handleDispatchNotification: (value: NewNotificationT) => {},
});

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const notificationRef = useRef<NotificationInterfaceT>();

  const handleDispatchNotification = (notifcation: NewNotificationT) => {
    notificationRef.current?.dispatchNotification(notifcation);
  };

  return (
    <NotificationContext.Provider
      value={{
        handleDispatchNotification,
      }}
    >
      <Notification ref={notificationRef} />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
