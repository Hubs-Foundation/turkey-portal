import Head from 'next/head'
import Button from '../../components/shared/Button/Button'
import ExternalLink from '../../components/shared/ExternalLink/ExternalLink'

type LoginPropsT = {}

export default function Login({ }: LoginPropsT) {

  // TODO: this is not correct, need to connect with brian on how to update
  // the backend for this.
  const apiServer = process.env.API_SERVER || 'http://localhost:4000'
  const loginUrl = `https://auth.myhubs.net/login?idp=fxa&client=${apiServer}`

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