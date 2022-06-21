import React, { useState, useCallback, useContext } from 'react';
import { useTabletUp } from 'hooks/useMediaQuery';
import MainNav from '@Navigation/MainNav/MainNav';
import SideNav from '@Navigation/SideNav/SideNav';
import MobileSideNav from '@Navigation/MobileSideNav/MobileSideNav';
import styles from './MainLayout.module.scss';
import { ThemeContext } from 'contexts/ThemeProvider';

type MainLayoutPropsT = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutPropsT) => {
  const tabletUp = useTabletUp();
  const themeContext = useContext(ThemeContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuOpen((state) => !state);
  }, []);

  return (
    <main data-theme={themeContext.theme}>
      <MainNav MobileMenuClick={toggleMobileNav} />
      <section className={styles.page_wrapper}>
        {tabletUp ? (
          <SideNav />
        ) : (
          <MobileSideNav
            MobileMenuClick={toggleMobileNav}
            isOpen={isMobileMenuOpen}
          />
        )}
        {children}
      </section>
    </main>
  );
};

export default MainLayout;
