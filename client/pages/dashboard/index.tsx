import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { HubT, StatusE } from 'types/General';
import styles from './dashboard.module.scss';
import HubCard from '@Cards/HubCard/HubCard';
import SubCard from '@Cards/SubCard/SubCard';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { requireAuthenticationAndHubsOrSubscription } from 'services/routeGuard.service';
import { getSubscription, SubscriptionT } from 'services/subscription.service';
import { getHubs } from 'services/hub.service';
import FeedbackBanner from '@Shared/FeedbackBanner/FeedbackBanner';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';

type DashboardPropsT = {};

const creatingHub: HubT = {
  ccuLimit: 0,
  currentCcu: 0,
  currentStorageMb: 0,
  hubId: '',
  name: 'Untitled Hub',
  status: StatusE.CREATING,
  lastError: '',
  storageLimitMb: 0,
  subdomain: '',
  tier: 'premium',
};

const Dashboard = ({}: DashboardPropsT) => {
  const account = useSelector(selectAccount);
  const hubsInit: HubT[] = [];
  const subPrice = 5;
  const subscriptionInit: SubscriptionT = {
    nextPayment: '',
    endOfCycle: '',
  };
  const [hubs, setHubs] = useState(hubsInit);
  const [hasUpdatingCreatingHub, setHasUpdatingCreatingHub] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
    const getData = async () => {
      const [hubs, subscription] = await Promise.all([
        getHubs(),
        getSubscription(),
      ]);

      setHubs(hubs);
      setSubscriptionTotal(hubs.length * subPrice);
      setHasUpdatingCreatingHub(checkIfCreatingUpdating(hubs));
      setSubscription(subscription);
      setIsLoading(false);
    };

    // TODO: Error state
    getData().catch(console.error);
  }, []);

  return (
    <div className="page_wrapper">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="general profile page" />
      </Head>

      <section className={styles.hubs_wrapper}>
        {/* Hub Cards  */}
        <div className={styles.cards_wrapper}>
          {/* Hub Creating */}
          {/* TODO (Tech Debt): Right now (EA) we are only dealing with one hub, so, if there are zero 
          hubs and account has "creating hubs" flag as true, we know to show the creating hub
          card. When we have multiple hubs (post EA) we need to transition this on the back end to have
          a "creating" state accompanied by websockets and not depend on the account data. 
              Reason being is we are not polling the account api to see if the creating hubs flag has 
          changed, and subsequently remove this creating card, additionally, we can't rely on the hubs.length
          anymore in the senario of a multi-hub account. So, it would be better to handle this in the scope 
          of the hubs api in the future - NG */}
          {account.hasCreatingHubs && hubs.length === 0 ? (
            <HubCard hub={creatingHub} />
          ) : (
            ''
          )}

          {!isLoading ? (
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
          {!isLoading ? (
            <SubCard
              subdomain={hubs[0].subdomain}
              subscription={subscription}
              price={subscriptionTotal}
            />
          ) : (
            <SkeletonCard
              qty={1}
              category="square"
              classProp={styles.subcard_skeleton}
            />
          )}
        </div>
      </section>

      <footer>
        <FeedbackBanner email="hubs-feedback@mozilla.com" subject="Feedback" />
      </footer>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = requireAuthenticationAndHubsOrSubscription(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    const { req } = context;
    console.log('rawHeaders', req.rawHeaders);
    return { props: {} };
  }
);
