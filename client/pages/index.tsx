import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { useEffect } from 'react'
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { setAccount } from '../store/accountSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { HubT, AccountT } from '../types/General'

const fetchData = async (context: GetServerSidePropsContext, resource: string) => {
  const apiServer = process.env.API_SERVER || "http://localhost:4000"
  const headers: any = context.req.headers

  return await axios.get(`${apiServer}/api/v1/${resource}`, {
    headers: { ...headers }
  })
    .then((response) => response.data)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const hubs = await fetchData(context, 'hubs')
  const account = await fetchData(context, 'account')

  return {
    props: { hubs, account }
  }
}

type HomeProps = {
  hubs: Array<HubT>,
  account: AccountT
}

const Home = ({ hubs, account }: HomeProps) => {

  const dispatch = useDispatch();

  /**
   * TODO : detele debuging consoles when finished
   */
  useEffect(() => {
    console.log('hubs', hubs)
    console.log('account', account)
  }, [hubs])

  const handleClick = () => {
    dispatch(setAccount(account))
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Turkey</h1>
        <button onClick={handleClick}>click me</button>

        <div className={styles.grid}>
          {
            hubs.length ? hubs.map((hub) => (
              <div key={hub.hub_id} className={styles.card}>
                <h2>{hub.name}</h2>
                {hub.status}
              </div>
            )) : ''

          }
        </div>
      </main>
    </div>
  );
}

export default Home



