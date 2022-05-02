import Head from 'next/head'

type LoginPropsT = {}

export default function Login({ }: LoginPropsT) {

  return (
    <div className="page_wrapper">

      <Head>
        <title>Login Page</title>
        <meta name="description" content="login profle page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Login Page</h1>
      </main>
    </div>
  )
}
