import { ReactNode, useContext } from 'react';
import { ThemeContext } from 'contexts/ThemeProvider';
import Nav from '@Navigation/Nav/Nav';
import Footer from '@Navigation/Footer/Footer';
import { NavigationT } from 'types';

type LayoutWrapperPropsT = {
  navData?: NavigationT;
  children: ReactNode;
};

/**
Note: This component is used to abstract the layout logic to keep files clean. 
This is a good place to managage global contexts, for example we are
watching the color theme below, Another example might be a mobile nav toggle.
**/
const LayoutWrapper = ({ navData, children }: LayoutWrapperPropsT) => {
  const themeContext = useContext(ThemeContext);

  return (
    // Hard coding light while dark theme is being designed
    // <main data-theme={themeContext.theme}>
    <main data-theme="light">
      <div id="LP_modal_portal" />
      <Nav navData={navData} />
      {children}
      <Footer />
    </main>
  );
};

export default LayoutWrapper;
