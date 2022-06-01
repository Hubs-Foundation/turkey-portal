import Head from 'next/head'
import Button from '../../components/shared/Button/Button'
import ExternalLink from '../../components/shared/ExternalLink/ExternalLink'
import { API_SERVER } from 'config'


type LoginPropsT = {}

export default function Login({ }: LoginPropsT) {

  // TODO: this is not correct, need to connect with brian on how to update
  // the backend for this. -NG
  
  // This looks close enough for now. We still haven't finalized this in MVP2. Probably the main change would be 
  // to make auth.myhubs.net configurable with an environment variable. - BP
  const loginUrl = `https://auth.myhubs.net/login?idp=fxa&client=${API_SERVER}`

  return (
    <div className="page_wrapper">

      <Head>
        <title>Login Page</title>
        <meta name="description" content="login profle page" />
      </Head>

      <main>
        <h1>Login Page</h1>

        <ExternalLink href={loginUrl} target="_self">
          <Button text='Sign Up'></Button>
        </ExternalLink>

      </main>
    </div>
  )
}