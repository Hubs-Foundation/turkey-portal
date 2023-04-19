import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import ThemeProvider from 'contexts/ThemeProvider';
import NotificationProvider from 'contexts/NotificationProvider';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
import favicon32 from '../public/favicon-32x32.png';
import favicon16 from '../public/favicon-16x16.png';
import appleTouch from '../public/apple-touch-icon.png';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <Head>
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

        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
