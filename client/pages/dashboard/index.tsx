import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';
import { HubT } from 'types/General';
import styles from './dashboard.module.scss';
import HubCard from '@Cards/HubCard/HubCard';
import SubCard from '@Cards/SubCard/SubCard';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { requireAuthentication } from 'services/routeGuard.service';
import { getSubscriptions, SubscriptionT } from 'services/subscription.service';
import { getHubs } from 'services/hub.service';
import FeedbackBanner from '@Shared/FeedbackBanner/FeedbackBanner'

type DashboardPropsT = {};

const Dashboard = ({}: DashboardPropsT) => {
  const hubsInit: HubT[] = [];
  const subPrice = 5;
  const subscriptionInit: SubscriptionT = {
    next_payment: '',
  };
  const [hubs, setHubs] = useState(hubsInit);
  const [hasUpdatingCreatingHub, setHasUpdatingCreatingHub] =
    useState<boolean>(false);
  const [subscriptionTotal, setSubscriptionTotal] = useState<number>(subPrice);
  const [subscription, setSubscription] =
    useState<SubscriptionT>(subscriptionInit);
  const [failedUpdatesList, setFailedUpdatesList] = useState<HubT[]>([
    // PLace Holder Mock Hub
    // {
    //   ccuLimit: 5,
    //   currentCcu: 10,
    //   currentStorageMb: 20,
    //   hubId: '78899727885664260',
    //   name: 'Testing hub',
    //   status: 'ready',
    //   storageLimitMb: 100,
    //   subdomain: 'e745b6810a',
    //   tier: 'free',
    // },
  ]);

  /**
   * Get Hubs again and apply data, also check 
   * data for updates and fails.
   */
  const applyHubs = () => {
    getHubs().then((hubs) => {
      setHubs(hubs);
      setHasUpdatingCreatingHub(checkIfCreatingUpdating(hubs));
      handleUpdateFail(hubs);
    });
  };


  /**
   * Watches Hubs reponses to check if there is a fail
   * @param hubs 
   */
  const handleUpdateFail = (hubs: HubT[]) => {
    let failedHubs: HubT[] = [];

    hubs.forEach((hub: HubT) => {
      if (hub.status === 'failed') {
        failedHubs.push(hub);
      }
    });

    setFailedUpdatesList(failedHubs);
  };


  /**
   * Check if hub is being created or is updating
   * @param hubs HubT
   * @returns boolean
   */
  const checkIfCreatingUpdating = (hubs: HubT[]): boolean => {
    let creatingUpdating = false;

    hubs.forEach(({ status }) => {
      if (status === 'creating' || status === 'updating')
        creatingUpdating = true;
    });
    return creatingUpdating;
  };

  useEffect(() => {
    let updateIntervalId: NodeJS.Timeout;
    if (hasUpdatingCreatingHub) {
      updateIntervalId = setInterval(applyHubs, 1000);
    }
    return () => {
      clearInterval(updateIntervalId);
    };
  }, [hasUpdatingCreatingHub]);


  /**
   * Check if Hub has failed to update
   * @param hub HubT
   * @returns boolean
   */
  const isFailedUpdate = (hub: HubT): boolean => {
    let isFound:boolean = false;

    if (!failedUpdatesList.length) return isFound;

    failedUpdatesList.findIndex((update) => {
      return update.hubId === hub.hubId;
    }) >= 0 && (isFound = true);

    return isFound;
  };

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
                  updateDomainDidFail={isFailedUpdate(hub)}
                  currentStorageMb={hub.currentStorageMb}
                />
              );
            })
          ) : (
            <SkeletonCard qty={3} category="row" />
          )}
        </div>

        {/* SUBSCRIPTION WIDGET  */}
        <div className={styles.subcard}>
          <SubCard
            subscription={subscription}
            price={subscriptionTotal}
          />
        </div>
        
      </main>
      <footer>
        <FeedbackBanner/>
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
