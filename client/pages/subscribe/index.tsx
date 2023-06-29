import { useState } from 'react';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { SubscribeRG } from 'services/routeGuard.service';
import ContactCard from '@Modules/plans/ContactCard/ContactCard';
import styles from './subscribe.module.scss';
import { PersonalPlanCard, StarterPlanCard } from '@Modules/plans/plan-cards';
import { BillingPeriodE } from 'types/General';

const Subscribe = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriodE>(
    BillingPeriodE.MONTHLY
  );

  return (
    <div className="page_wrapper">
      <Head>
        <title>Subscription</title>
        <meta name="description" content="Sign up for a subscription" />
      </Head>

      <main>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h1>Choose your plan</h1>
          </div>

          <div className={styles.cards}>
            <StarterPlanCard />
            <PersonalPlanCard billingPeriod={billingPeriod} />
            <ContactCard
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

export const getServerSideProps = SubscribeRG(
  async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
