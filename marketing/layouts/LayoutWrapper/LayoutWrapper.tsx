import { useCallback, ReactNode, useContext } from 'react';
import { ThemeContext } from 'contexts/ThemeProvider';
import MainNav from '@Navigation/MainNav/MainNav';
import Footer from '@Navigation/Footer/Footer'

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
  const toggleMobileNav = useCallback(() => {
    // Place holder - not sure if we need this: waiting on UX/UI
  }, []);

  return (
    // Hard coding light for deving 
    // <main data-theme={themeContext.theme}>
    <main data-theme="light">
      <MainNav MobileMenuClick={toggleMobileNav} /> 
      {children}
      <Footer/>
    </main>
  );
};

export default LayoutWrapper;
