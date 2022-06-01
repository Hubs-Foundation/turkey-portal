import { useEffect } from 'react'
import '../styles/globals.scss'
import store from 'store/store'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { LoggedOutRoutsE } from 'types/Routes'
import initStoreData from 'store/storeInit'
import Head from 'next/head'
import MainLayout from 'layouts/MainLayout/MainLayout'
import LoginLayout from 'layouts/LoginLayout/LoginLayout'

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
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      </Head>

      {showLoggedOutUi ? LoggedOut : LoggedIn}
    </Provider>
  )
}

export default MyApp
