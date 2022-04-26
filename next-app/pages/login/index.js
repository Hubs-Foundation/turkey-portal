import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import RadioGroup from '../../components/shared/RadioGroup/RadioGroup'



export default function Sandbox(props) {
  

  const [radioForm, setRadioForm] = useState('label_1')

  const handleFormChange = (e) => {
    const value = e.target.value
    setRadioForm(value)
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
      </main>
    </div>
  )
}
