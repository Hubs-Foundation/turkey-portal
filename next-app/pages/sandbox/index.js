import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import RadioGroup from '../../components/shared/RadioGroup/RadioGroup'



export default function Sandbox(props) {
  const radioFormOptions = [
    {
      label: 'Label 1',
      value: 'label_1',
      groupName: 'test',
      id: 'label_1',
    },
    {
      label: 'Label 2',
      value: 'label_2',
      groupName: 'test',
      id: 'label_2',
    }
  ]

  const [radioForm, setRadioForm] = useState('label_1')

  const handleFormChange = (e) => {
    const value = e.target.value
    setRadioForm(value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sandbox Page</title>
        <meta name="description" content="general profle page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Sandbox Welcome</h1>
        <section>
          <h3>Forms</h3>
          <form > 
            <RadioGroup
              onChange={handleFormChange}
              value={radioForm}
              options={radioFormOptions}
            />
          </form>
          
        </section>
      </main>
    </div>
  )
}
