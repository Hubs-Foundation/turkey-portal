import store from 'store/store';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import LayoutWrapper from 'layouts/LayoutWrapper/LayoutWrapper';
import '../styles/globals.scss';
import ThemeProvider from 'contexts/ThemeProvider';
import StoreProvider from 'contexts/StoreProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <StoreProvider>
        <ThemeProvider>
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
          </Head>
          <LayoutWrapper componentName={Component.name}>
            <Component {...pageProps} />
          </LayoutWrapper>
        </ThemeProvider>
      </StoreProvider>
    </Provider>
  );
};

export default MyApp;
