import Head from 'next/head'
import type { GetServerSidePropsContext } from 'next'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import HubCard from '../../components/cards/HubCard/HubCard'
import { AccountT, HubT } from '../../types/General'
import styles from './dashboard.module.scss'
import { getHubs, getHub } from '../../services/hub.service'
import PageHeading from '../../components/shared/PageHeading/PageHeading'
import { requireAuthentication } from '../../services/routeGuard.service'

type DashboardPropsT = {}

const Dashboard = ({ }: DashboardPropsT) => {

  const dispatch = useDispatch()
  const hubsInit: HubT[] = []
  const [hubs, setHubs] = useState(hubsInit)

  useEffect(() => {
    getHubs().then((hubs) => {
      console.log('hubs',hubs)
      setHubs(hubs)
    }) 
  }, [])

  return (
    <div className="page_wrapper">

      <Head>
        <title>Dashboard Page</title>
        <meta name="description" content="general profile page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageHeading
        title="Dashboard"
      />

      <main className={styles.main}>

        {/* Hub Cards  */}
        <div className={styles.cards_wrapper}>
          {hubs.length ? (
            hubs.map((hub) => {
              return (
                <HubCard
                  key={hub.hubId}
                  name={hub.name}
                  tier={hub.tier}
                  hubId={hub.hubId}
                  ccuLimit={hub.ccuLimit}
                  status={hub.status}
                  storageLimitMb={hub.storageLimitMb}
                  subdomain={hub.subdomain}
                  currentCcu={hub.currentCcu}
                  currentStorage={hub.currentStorage}
                />
              )
            })
          ) : ''}
        </div>

      </main>
    </div>
  )
}

export default Dashboard


export const getServerSideProps = requireAuthentication((context: GetServerSidePropsContext, account: AccountT) => {
  // Your normal `getServerSideProps` code here
  return { props: { } }
})


