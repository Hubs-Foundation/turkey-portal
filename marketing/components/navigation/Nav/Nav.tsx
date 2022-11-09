'use client';

import { useCallback, useState } from 'react';
import { useDesktopDown } from 'hooks/useMediaQuery';
import MainNav from '@Navigation/MainNav/MainNav';
import MobileSideNav from '@Navigation/MobileSideNav/MobileSideNav';

const Nav = ({}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isDesktopDown = useDesktopDown();

  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuOpen((state) => !state);
  }, []);

  return (
    <>
      <MainNav MobileMenuClick={toggleMobileNav} />
      {isDesktopDown && (
        <MobileSideNav
          MobileMenuClick={toggleMobileNav}
          isOpen={isMobileMenuOpen}
        />
      )}
    </>
  );
};

export default Nav;
