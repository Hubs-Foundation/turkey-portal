import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { useState } from 'react'
import RadioGroup from '../../components/shared/RadioGroup/RadioGroup'
import Form from '../../components/shared/Form/Form'
import Input from '../../components/shared/Input/Input'

/**
 * NOTE: this page is for testing and showing.. Storybook will mostly take
 * this pages purpose over..Will delete before production code...
 */

export default function Sandbox() {
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

  const handleFormChange = (event:Event) => {
    const {value }:HTMLInputElement = (event.target as HTMLInputElement)
    setRadioForm(value)
  }

  const initialValues = {
    email:'nick',
    password: '1234',
    test:'label_1'
  }

  const submit = (form:any) => {
    console.log('form',form)
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
          {/* <form > 
            <RadioGroup
              onChange={handleFormChange}
              value={radioForm}
              options={radioFormOptions}
            />
          </form> */}

          <h2>form 2</h2>

          <Form submit={submit} initialValues={initialValues}>
            <>
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
              <RadioGroup
                name="test"
                options={radioFormOptions}
              />
            </>
          </Form>
          
        </section>
      </main>
    </div>
  )
}
