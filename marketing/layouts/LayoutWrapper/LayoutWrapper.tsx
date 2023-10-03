import { ReactNode, useContext } from 'react';
import { ThemeContext } from 'contexts/ThemeProvider';
import Nav from '@Navigation/Nav/Nav';
import Footer from '@Navigation/Footer/Footer';
import { NavigationT } from 'types';
import Head from 'next/head';
import { GA_TRACKING_ID } from 'services/analytics.service';

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
    <>
      <Head>
        {/* Google Analytics script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag() {
                dataLayer.push(arguments);
              }
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </Head>
      <main data-theme="light">
        <div id="LP_modal_portal" />
        <Nav navData={navData} />
        {children}
        <Footer />
      </main>
    </>
  );
};

export default LayoutWrapper;
