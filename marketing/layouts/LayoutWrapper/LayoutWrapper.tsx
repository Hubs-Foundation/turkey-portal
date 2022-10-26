import {
  useCallback,
  ReactNode,
  useContext,
  useState,
  UIEventHandler,
} from 'react';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { ThemeContext } from 'contexts/ThemeProvider';
import MainNav from '@Navigation/MainNav/MainNav';
import Footer from '@Navigation/Footer/Footer';
import MobileSideNav from '@Navigation/MobileSideNav/MobileSideNav';
import Banner from '@Navigation/Banner/Banner';

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
  const isDesktopDown = useDesktopDown();

  const toggleMobileNav = useCallback(() => {
    setIsMobileMenuOpen((state) => !state);
  }, []);

  const handleScroll: UIEventHandler<HTMLElement> = (event) => {
    console.log('scrollTop: ', event.currentTarget.scrollTop);
    console.log('offsetHeight: ', event.currentTarget.offsetHeight);
  };

  return (
    // Hard coding light for deving
    // <main data-theme={themeContext.theme}>
    <main
      data-theme="light"
      onScroll={handleScroll}
      style={{ height: '100vh' }}
    >
      <Banner />
      {/* <MainNav MobileMenuClick={toggleMobileNav} /> */}
      {isDesktopDown && (
        <MobileSideNav
          MobileMenuClick={toggleMobileNav}
          isOpen={isMobileMenuOpen}
        />
      )}
      {children}
      <Footer />
    </main>
  );
};

export default LayoutWrapper;
