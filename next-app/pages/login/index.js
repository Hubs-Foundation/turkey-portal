import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import Form from '../../components/shared/Form/Form'
import Input from '../../components/shared/Input/Input'

export default function Sandbox(props) {
  
  const initialValues = {
    email:'',
    password: '',
  }

  const submit = (form) => {
    console.log('form',form)
  }

  return (
    <div>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login Screen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        create lgin form here.
        <Form submit={submit} initialValues={initialValues}>
          <Input
            label="Email"
            type="email"
            name="email"
          />
          <Input
            label="Password"
            type="password"
            name="password"
          />
        </Form>

      </main>
    </div>
  )
}
