import '../styles/globals.scss'
import MainLayout from '../layouts/MainLayout/MainLayout'
import LoginLayout from '../layouts/LoginLayout/LoginLayout'
import store from '../store/store'
import { Provider } from 'react-redux'

// Todo Work on auth 
const isLoggedIn = false

function MyApp({ Component, pageProps }) {

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
      {isLoggedIn ? LoggedIn : LoggedOut}
    </Provider>
  )
}

export default MyApp
