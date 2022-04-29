import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import HubCard from '../../components/cards/HubCard/HubCard'
import axios from 'axios'
import { AccountT } from '../../types/General'
import { getCookie } from 'cookies-next'
import styles from './dashboard.module.scss'


type DashboardPropsT = {
  account: AccountT
}

export default function Dashboard({ account }: DashboardPropsT) {

  const [hubs, setHubs] = useState([])

  useEffect(() => {

    // TODO: figure out how we want to work through CORS here.
    // this is workin progress...
    // const AUTH = getCookie('_turkeyauthtoken')
    // const apiServer = process.env.API_SERVER || "http://localhost:4000"
    // axios.get(`${apiServer}/api/v1/hubs`, {
    //   headers: { 
    //     cookie:AUTH?AUTH:''
    //    }
    // })
    //   .then((response) => {
    //     console.log('response',response)
    //     response.data
    // })


  }, [])

  return (
    <div className="page_wrapper">

      <Head>
        <title>Dashboard Page</title>
        <meta name="description" content="general profle page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Dashboard {account.displayName}</h1>
        <section>
          <HubCard
            name={'Test Hub'}
            tier={'Free'}
          />
        </section>
      </main>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  const apiServer = process.env.API_SERVER || "http://localhost:4000"
  const headers: any = req.headers

  try {
    const account = await axios.get(`${apiServer}/api/v1/account`, {
      headers: { ...headers }
    })
      .then((response) => response.data)

    return { props: { account } }

  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
}
