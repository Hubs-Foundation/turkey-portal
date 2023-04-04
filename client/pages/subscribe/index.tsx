import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { pageRequireAuthentication } from 'services/routeGuard.service';
import SubContactCard from '@Cards/SubContactCard/SubContactCard';
import SubInfoCard from '@Cards/SubInfoCard/SubInfoCard';
import styles from './subscribe.module.scss';
import { getRegion } from 'services/region.service';

type SubscribePropsT = {
  region: string | null;
};

const Subscribe = ({ region }: SubscribePropsT) => {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Subscription</title>
        <meta name="description" content="Sign up for a subscription" />
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
            <SubContactCard
              email="hubs@mozilla.com"
              subject="Subscription inquiries"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Subscribe;

export const getServerSideProps = pageRequireAuthentication(
  async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
