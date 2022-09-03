import { useEffect, useCallback, ReactNode, useContext, useState } from 'react';
import initStoreData from 'store/storeInit';
import { LoggedOutComponentPages } from 'types/Routes';
import { ThemeContext } from 'contexts/ThemeProvider';
import MainNav from '@Navigation/MainNav/MainNav';
import styles from './LayoutWrapper.module.scss';

type LayoutWrapperProps = {
  children: ReactNode;
  componentName: string;
};

const LayoutWrapper = ({ children, componentName }: LayoutWrapperProps) => {
  // Check if a logged out route
  const showLoggedOutUi = componentName in LoggedOutComponentPages;
  const themeContext = useContext(ThemeContext);
  const toggleMobileNav = useCallback(() => {
    // Place holder - not sure if we need this: waiting on UX/UI
  }, []);

  useEffect(() => {
    // If on one of the "logged out pages" don't try to init store data
    if (!showLoggedOutUi) initStoreData();
  }, [showLoggedOutUi]);

  return (
    // <main data-theme={themeContext.theme}>
    <main data-theme="light">
      <div id="modal_portal" />
      {!showLoggedOutUi ? <MainNav /> : <MainNav showAccountSection={false} />}
      <div
        className={
          showLoggedOutUi
            ? styles.logged_out_page_wrapper
            : styles.logged_in_page_wrapper
        }
      >
        {children}
      </div>
    </main>
  );
};

export default LayoutWrapper;
