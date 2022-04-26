import {useEffect} from 'react'
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import {setAccount} from '../store/accountSlice'
import { useDispatch } from 'react-redux';

async function fetchApi({ req }, resource) {
  const apiServer = process.env.API_SERVER || "http://localhost:4000";
  return await fetch(`${apiServer}/api/v1/${resource}`, { headers: req.headers }).then((r) => r.json());
}


export async function getServerSideProps(context) {
  const hubs = await fetchApi(context, "hubs");
  const account = await fetchApi(context, "account");
  return { props: { hubs,account } };
}

export default function Home({ hubs ,account}) {


  const dispatch = useDispatch();

  /**
   * TODO : detele debuging consoles when finished
   */
  useEffect(() => {
    console.log('hubs',hubs)
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
          )): ''
        
        }
        </div>
      </main>
    </div>
  );
}
