import { useCallback, ReactNode, useContext, useState } from 'react';
import { useTabletUp } from 'hooks/useMediaQuery';
import { ThemeContext } from 'contexts/ThemeProvider';
import MainNav from '@Navigation/MainNav/MainNav';
import Footer from '@Navigation/Footer/Footer';
import MobileSideNav from '@Navigation/MobileSideNav/MobileSideNav';

type LayoutWrapperProps = {
  children: ReactNode;
};

/**
Note: This component is used to abstract the layout logic from _app.tsx to keep that
file clean. This is a good place to managage global contexts, for example we are
watching the color theme below, Another example might be a mobile nav toggle.
**/
const LayoutWrapper = ({ children }: LayoutWrapperProps) => {
  const themeContext = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const tabletUp = useTabletUp();

  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuOpen((state) => !state);
  }, []);

  return (
    // Hard coding light for deving
    // <main data-theme={themeContext.theme}>
    <main data-theme="light">
      {/* <MainNav MobileMenuClick={toggleMobileNav} />
      {!tabletUp && (
        <MobileSideNav
          MobileMenuClick={toggleMobileNav}
          isOpen={isMobileMenuOpen}
        />
      )} */}
       <Footer />
      {children}
     
    </main>
  );
};

export default LayoutWrapper;
