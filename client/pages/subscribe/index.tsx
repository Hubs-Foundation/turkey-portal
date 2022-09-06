import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { checkLoggedIn } from 'services/routeGuard.service';
import SubContactCard from '@Cards/SubContactCard/SubContactCard';
import SubInfoCard from '@Cards/SubInfoCard/SubInfoCard';
import styles from './subscribe.module.scss';

type SubscribePropsT = {};

const Subscribe = ({}: SubscribePropsT) => {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Subscription</title>
        <meta name="description" content="Sign up for a subscribtion" />
      </Head>

      <main>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>Your account has no active hubs</h1>
            {/* TODO pull pricing from subplat - $20 */}
            <p>
              You can begin a new subscription with an Early Access Hub for $20
              a month
            </p>
          </div>

          <div className={styles.cards}>
            <SubInfoCard />
            <SubContactCard email="hubs@mozilla.com" subject="Subscription" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscribe;

export const getServerSideProps = checkLoggedIn(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
  }
);
