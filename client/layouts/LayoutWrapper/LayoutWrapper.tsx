import { useEffect, ReactNode, useContext } from 'react';
import initStoreData from 'store/storeInit';
import MainLayout from 'layouts/MainLayout/MainLayout';
import LoginLayout from 'layouts/LoginLayout/LoginLayout';
import { LoggedOutRoutsE } from 'types/Routes';
import { ThemeContext } from 'contexts/ThemeProvider';

type LayoutWrapperProps = {
  children: ReactNode;
  componentName: string;
};

const LayoutWrapper = ({ children, componentName }: LayoutWrapperProps) => {
  // Check if a logged out route
  const showLoggedOutUi = componentName in LoggedOutRoutsE;
  const themeContext = useContext(ThemeContext);
  const LoggedIn = <MainLayout>{children}</MainLayout>;
  const LoggedOut = <LoginLayout>{children}</LoginLayout>;

  useEffect(() => {
    // If On a "logged out page" don't try to init store data
    if (!showLoggedOutUi) initStoreData();
  }, [showLoggedOutUi]);

  return (
    <main data-theme={themeContext.theme}>
      {showLoggedOutUi ? LoggedOut : LoggedIn}
    </main>
  );
};

export default LayoutWrapper;
