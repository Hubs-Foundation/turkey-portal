import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { HubT, LastErrorE, StatusE } from 'types/General';
import styles from './dashboard.module.scss';
import HubCard from '@Modules/hubs/HubCard/HubCard';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import { requireAuthenticationAndSubscription } from 'services/routeGuard.service';
import { getSubscription, SubscriptionT } from 'services/subscription.service';
import { getHubs } from 'services/hub.service';
import { selectAccount } from 'store/accountSlice';
import { initAccountData as refreshAccountData } from 'store/storeInit';
import { useSelector } from 'react-redux';
import { AxiosRequestHeaders } from 'axios';
import SidePanelLayout from 'layouts/SidePanelLayout/SidePanelLayout';
import { CustomizeHub } from '@Modules/hubs/CustomizeHub/CustomizeHub';
import { useIsProfessionalUp } from 'hooks/usePlans';
import Warning from '@Shared/Warning/Warning';

type DashboardPropsT = { subscription: SubscriptionT };

const creatingHub: HubT = {
  ccuLimit: 0,
  currentCcu: 0,
  currentStorageMb: 0,
  domain: '',
  hubId: '',
  name: 'Untitled Hub',
  status: StatusE.CREATING,
  lastError: null,
  storageLimitMb: 0,
  subdomain: '',
  tier: 'p0',
};

/**
 * This is a default "catch all" Error Hub
 * state. Usually the user will see this if the
 * http request fails completely when calling hubs
 * api.
 */
const ErroringHub: HubT = {
  ccuLimit: 0,
  currentCcu: 0,
  currentStorageMb: 0,
  domain: '',
  hubId: '',
  name: 'Erred Hub',
  status: StatusE.ERROR,
  lastError: LastErrorE.ERROR,
  storageLimitMb: 0,
  subdomain: '',
  tier: 'p0',
};

const Dashboard = ({ subscription }: DashboardPropsT) => {
  const account = useSelector(selectAccount);
  const [hubs, setHubs] = useState<HubT[]>([]);
  const [hasUpdatingHub, setHasUpdatingHub] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isProfessionalUp = useIsProfessionalUp();

  /**
   * Hubs call failed:
   * Manually set Error state Hub in UI
   */
  const setDefaultErrorStateHub = () => {
    setHubs([ErroringHub]);
    setIsLoading(false);
  };

  /**
   * Get Hubs again and apply data, also check
   * data for updates and fails.
   */
  const refreshHubData = useCallback(() => {
    const getData = async () => {
      try {
        const hubs: HubT[] = await getHubs();
        setHubs(hubs);
        setHasUpdatingHub(checkIfUpdating(hubs));
      } catch (error) {
        setDefaultErrorStateHub();
        console.error(error);
      }
    };
    getData();
  }, []);

  /**
   * Check if hub is being updated
   * @param hubs HubT
   * @returns boolean
   */
  const checkIfUpdating = (hubs: HubT[]): boolean => {
    return hubs.some(({ status }) => status === 'updating');
  };

  useEffect(() => {
    let updateIntervalId: NodeJS.Timeout;
    const pollingInterval = 10_000;

    if (hasUpdatingHub) {
      updateIntervalId = setInterval(refreshHubData, pollingInterval);
    }
    return () => {
      clearInterval(updateIntervalId);
    };
  }, [hasUpdatingHub, refreshHubData]);

  /**
   * Get All Hubs
   */
  useEffect(() => {
    const getData = async () => {
      /**
       * Log raw data for
       * degub on prod
       */
      const logData = (hub: HubT) => {
        console.log('Subscription Data:');
        console.table([{ ...subscription }]);
        console.log('Hub Data:');
        console.table(hub);
      };

      try {
        const hubs = await getHubs();
        setHubs(hubs);
        setHasUpdatingHub(checkIfUpdating(hubs));
        setIsLoading(false);
        logData(hubs[0]);
      } catch (error) {
        setDefaultErrorStateHub();
        console.error(error);
      }
    };

    getData();
    // TODO : Tech Debt - first account call is not showing that the hub is being created on attribute "hasCreatingHubs".
    // this is because the getHubs call above kicks off the creation if there are no hubs.. this is a bandaid to just call
    // the account data again and see if the "hasCreatingHubs" is true.
    setTimeout(() => {
      refreshAccountData();
    }, 2000);
  }, [subscription]);

  return (
    <div className="page_wrapper">
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="general profile page" />
      </Head>

      <SidePanelLayout
        hub={hubs[0]}
        subscription={subscription}
        isLoading={isLoading && Boolean(account.planName)}
      >
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
            <>
              {hubs.map((hub) => {
                return (
                  <HubCard
                    key={hub.hubId}
                    hub={hub}
                    refreshHubData={refreshHubData}
                  />
                );
              })}
              {isProfessionalUp && <CustomizeHub hub={hubs[0]} />}
            </>
          ) : (
            <SkeletonCard qty={3} category="row" />
          )}
        </div>
      </SidePanelLayout>
    </div>
  );
};

export default Dashboard;

export const getServerSideProps = requireAuthenticationAndSubscription(
  async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    try {
      const subscription = await getSubscription(
        context.req.headers as AxiosRequestHeaders
      );
      return {
        props: {
          subscription,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
);
