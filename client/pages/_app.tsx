import { useEffect } from 'react'
import store from 'store/store'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { LoggedOutRoutsE } from 'types/Routes'
import initStoreData from 'store/storeInit'
import Head from 'next/head'
import MainLayout from 'layouts/MainLayout/MainLayout'
import LoginLayout from 'layouts/LoginLayout/LoginLayout'
import '../styles/globals.scss'

const MyApp = ({ Component, pageProps }: AppProps) => {

  // Check if a logged out route
  const showLoggedOutUi = Component.name in LoggedOutRoutsE

  const LoggedIn = (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )

  const LoggedOut = (
    <LoginLayout>
      <Component {...pageProps} />
    </LoginLayout>
  )

  useEffect(() => {
    // If On a "logged out page" don't try to init store data
    if (!showLoggedOutUi) initStoreData()

  }, [showLoggedOutUi])


  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>
      {showLoggedOutUi ? LoggedOut : LoggedIn}
    </Provider>
  )
}

export default MyApp
