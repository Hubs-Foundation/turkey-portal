import Head from 'next/head'
import type { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import HubCard from '../../components/cards/HubCard/HubCard'
import axios from 'axios'
import { AccountT, HubT } from '../../types/General'
import { getCookie } from 'cookies-next'
import styles from './dashboard.module.scss'
import { setAccount } from '../../store/accountSlice'
import PageHeading from '../../components/shared/PageHeading/PageHeading'

type DashboardPropsT = {
  account: AccountT
}

export default function Dashboard({ account }: DashboardPropsT) {

  const dispatch = useDispatch()
  const hubsInit: HubT[] = []
  const [hubs, setHubs] = useState(hubsInit)

  useEffect(() => {
    // Add newly validated account to the store
    dispatch(setAccount(account))
  }, [account])

  useEffect(() => {
    const apiServer = process.env.API_SERVER || "http://localhost:4000"
    axios.get(`${apiServer}/api/v1/hubs`, { withCredentials: true })
      .then((response) => {
        setHubs(response.data)
      })
  }, [])

  return (
    <div className="page_wrapper">

      <Head>
        <title>Dashboard Page</title>
        <meta name="description" content="general profle page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeading
        title="Dashboard"
      />

      <main className={styles.main}>

        {/* Hub Cards  */}
        <div className={styles.cards_wrapper}>
          {hubs.length && (
            hubs.map((hub) => {
              return (
                <HubCard
                  key={hub.hub_id}
                  name={hub.name}
                  tier={hub.tier}
                  ccuLimit={hub.ccu_limit}
                  status={hub.status}
                  storageLimitMb={hub.storage_limit_mb}
                  subdomain={hub.subdomain}
                />
              )
            })
          )}
        </div>

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
