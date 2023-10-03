import '@mozilla/lilypad-ui/dist/styles/theme.scss';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ThemeProvider from 'contexts/ThemeProvider';
import NotificationProvider from 'contexts/NotificationProvider';
import favicon32 from '../public/favicon-32x32.png';
import favicon16 from '../public/favicon-16x16.png';
import appleTouch from '../public/apple-touch-icon.png';
import { pageview } from 'services/analytics.service';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getEnvVariable from 'config';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const root = getEnvVariable('DASH_ROOT_DOMAIN');
    pageview(root + router.route);

    const handleRouteChange = (url: string) => {
      pageview(root + url);
    };

    // Listen for route changes and call the handler
    router.events.on('routeChangeComplete', handleRouteChange);

    // Remove the event listener on unmount
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider>
      <NotificationProvider>
        <Head>
          {/* VERSION Pro Plan Launch */}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href={appleTouch.src} />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={favicon32.src}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={favicon16.src}
          />
        </Head>
        <Component {...pageProps} />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
