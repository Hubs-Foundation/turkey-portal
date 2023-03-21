import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { subscriptionPageRequireAuthentication } from 'services/routeGuard.service';
import SubContactCard from '@Cards/SubContactCard/SubContactCard';
import styles from './subscribe.module.scss';
import { StandardInfoCard } from '@Cards/PlanInfoCard/StandardPlanCard';
import { StarterInfoCard } from '@Cards/PlanInfoCard/StarterPlanCard';

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
          <div className={styles.cards}>
            <StarterInfoCard />
            <StandardInfoCard />
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

export const getServerSideProps = subscriptionPageRequireAuthentication(
  async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
