import { useEffect, useState } from 'react'
import '../styles/globals.scss'
import MainLayout from '../layouts/MainLayout/MainLayout'
import LoginLayout from '../layouts/LoginLayout/LoginLayout'
import store from '../store/store'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { AccountT } from '../types/General'

const MyApp = ({ Component, pageProps }: AppProps) => {

  const handleChange = () => {
    const data = store.getState()
    setAccount(data.account)
  }

  useEffect(() => {
    const Store = store.subscribe(handleChange)
    return () => {
      Store
    }
  }, [])
  
  const initialAccount:AccountT = {
    isInitialized: false,
    isLoggedIn: false,
    profilePicture: '',
    displayName: '',
    email: ''
  }
  const [account, setAccount] = useState(initialAccount)

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

  return (
    <Provider store={store}>
      {account.isLoggedIn ? LoggedIn : LoggedOut}
    </Provider>
  )
}

export default MyApp
