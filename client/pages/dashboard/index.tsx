import Head from 'next/head'
import styles from './dashboard.module.scss'
import HubCard from '../../components/cards/HubCard/HubCard'

type DashboardPropsT = {}

export default function Dashboard({}:DashboardPropsT) {
 
  return (
    <div className="page_wrapper">

      <Head>
        <title>Dashboard Page</title>
        <meta name="description" content="general profle page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Dashboard Page</h1>

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
