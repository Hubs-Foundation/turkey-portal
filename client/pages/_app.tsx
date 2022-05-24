import { useEffect } from 'react'
import store from '../store/store'
import initStoreData from '../store/storeInit'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { LoggedOutRoutsE } from '../types/Routs'
import MainLayout from '../layouts/MainLayout/MainLayout'
import LoginLayout from '../layouts/LoginLayout/LoginLayout'
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
    if (showLoggedOutUi) return
    initStoreData()
  }, [showLoggedOutUi])


  return (
    <Provider store={store}>
      {showLoggedOutUi ? LoggedOut : LoggedIn}
    </Provider>
  )
}

export default MyApp
