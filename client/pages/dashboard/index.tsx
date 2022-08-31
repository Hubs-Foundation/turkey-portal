import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { HubT } from 'types/General';
import styles from './dashboard.module.scss';
import HubCard from '@Cards/HubCard/HubCard';
import SubCard from '@Cards/SubCard/SubCard';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { requireAuthentication } from 'services/routeGuard.service';
import { getSubscriptions, SubscriptionT } from 'services/subscription.service';
import { getHubs } from 'services/hub.service';
import FeedbackBanner from '@Shared/FeedbackBanner/FeedbackBanner';

type DashboardPropsT = {};

const Dashboard = ({}: DashboardPropsT) => {
  const hubsInit: HubT[] = [];
  const subPrice = 5;
  const subscriptionInit: SubscriptionT = {
    nextPayment: '',
    endOfCycle: '',
  };
  const [hubs, setHubs] = useState(hubsInit);
  const [hasUpdatingCreatingHub, setHasUpdatingCreatingHub] =
    useState<boolean>(false);
  const [subscriptionTotal, setSubscriptionTotal] = useState<number>(subPrice);
  const [subscription, setSubscription] =
    useState<SubscriptionT>(subscriptionInit);

  /**
   * Get Hubs again and apply data, also check
   * data for updates and fails.
   */
  const applyHubs = useCallback(() => {
    getHubs().then((hubs) => {
      setHubs(hubs);
      setHasUpdatingCreatingHub(checkIfCreatingUpdating(hubs));
    });
  }, []);

  /**
   * Check if hub is being created or is updating
   * @param hubs HubT
   * @returns boolean
   */
  const checkIfCreatingUpdating = (hubs: HubT[]): boolean => {
    return hubs.some(
      ({ status }) => status === 'creating' || status === 'updating'
    );
  };

  useEffect(() => {
    let updateIntervalId: NodeJS.Timeout;
    if (hasUpdatingCreatingHub) {
      updateIntervalId = setInterval(applyHubs, 1000);
    }
    return () => {
      clearInterval(updateIntervalId);
    };
  }, [hasUpdatingCreatingHub, applyHubs]);

  const refreshHubData = useCallback(() => {
    getHubs().then((hubs) => {
      setHubs(hubs);
      setHasUpdatingCreatingHub(checkIfCreatingUpdating(hubs));
    });
  }, []);

  /**
   * Get All Hubs
   */
  useEffect(() => {
    getHubs().then((hubs) => {
      setHubs(hubs);
      setSubscriptionTotal(hubs.length * subPrice);
      setHasUpdatingCreatingHub(checkIfCreatingUpdating(hubs));
    });

    getSubscriptions().then((subscription) => {
      setSubscription(subscription);
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
            hubs.map((hub) => {
              return (
                <HubCard
                  key={hub.hubId}
                  hub={hub}
                  refreshHubData={refreshHubData}
                />
              );
            })
          ) : (
            <SkeletonCard qty={3} category="row" />
          )}
        </div>

        {/* SUBSCRIPTION WIDGET  */}
        <div className={styles.subcard}>
          {hubs.length ? (
            <SubCard
              subdomain={hubs[0].subdomain}
              subscription={subscription}
              price={subscriptionTotal}
            />
          ) : null}
        </div>
      </main>
      <footer>
        <FeedbackBanner />
      </footer>
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
