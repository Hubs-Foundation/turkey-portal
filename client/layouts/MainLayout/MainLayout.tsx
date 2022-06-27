import { useState, useCallback } from 'react';
import { useTabletUp } from 'hooks/useMediaQuery';
import MainNav from '@Navigation/MainNav/MainNav';
import SideNav from '@Navigation/SideNav/SideNav';
import MobileSideNav from '@Navigation/MobileSideNav/MobileSideNav';
import styles from './MainLayout.module.scss';

type MainLayoutPropsT = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutPropsT) => {
  const tabletUp = useTabletUp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuOpen((state) => !state);
  }, []);

  return (
    // TODO: set theme ( dark / light ) from system and set context via service)
    <>
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
    </>
  );
};

export default MainLayout;
