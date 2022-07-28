import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { HubT } from 'types/General';
import styles from './dashboard.module.scss';
import HubCard from '@Cards/HubCard/HubCard';
import SubCard from '@Cards/SubCard/SubCard';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { requireAuthentication } from 'services/routeGuard.service';
import { getSubscription, SubscriptionT } from 'services/subscription.service';
import { getHubs } from 'services/hub.service';

type DashboardPropsT = {};

const Dashboard = ({}: DashboardPropsT) => {
  const hubsInit: HubT[] = [];
  const subPrice = 5;
  const subscriptionInit: SubscriptionT = {
    next_payment : ''
  };
  const [hubs, setHubs] = useState(hubsInit);
  const [subscriptionTotal, setSubscriptionTotal] = useState<number>(subPrice);
  const [subscription, setSubscription] = useState<SubscriptionT>(subscriptionInit);

  /**
   * Get All Hubs
   */
  useEffect(() => {
    getHubs().then((hubs) => {
      setHubs(hubs);
      setSubscriptionTotal(hubs.length * subPrice)
    });

    getSubscription().then((subscription) => {
      setSubscription(subscription)
    });
  }, []);


  return (
    <div className="page_wrapper">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="general profile page" />
      </Head>

      <main className={styles.main}>
        {/* Hub Cards  */}
        <div className={styles.cards_wrapper}>
          {hubs.length ? (
            hubs.map((hub, i) => {
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
                    currentStorageMb={hub.currentStorageMb}
                  />
                );
            })
          ) : (
            <SkeletonCard qty={3} category="row" />
          )}
        </div>

        {/* SUBSCRIPTION WIDGET  */}
        <SubCard 
          classProp={styles.subcard} 
          subscription={subscription}
          price={subscriptionTotal}
        />
      </main>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = requireAuthentication(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
  }
);
