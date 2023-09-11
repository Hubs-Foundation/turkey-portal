import { useState, useEffect, useCallback, useContext } from 'react';
import { useRouter } from 'next/router';
import { HubT, UpdateHubT, StatusE } from 'types/General';
import { RoutesE } from 'types/Routes';
import { getHub, updateHub } from 'services/hub.service';
import { hubIdRG } from 'services/routeGuard.service';
import Head from 'next/head';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import HubFormCard, {
  HubFormCardT,
} from '@Modules/hubs/HubFormCard/HubFormCard';
import type { GetServerSidePropsContext } from 'next';
import styles from './[hub_id].module.scss';
import { getSubscription, SubscriptionT } from 'services/subscription.service';
import { AxiosRequestHeaders } from 'axios';
import { StoreContext } from 'contexts/StoreProvider';
import SidePanelLayout from 'layouts/SidePanelLayout/SidePanelLayout';

type HubDetailsViewPropsT = {
  subscription: SubscriptionT;
};

const HubDetailsView = ({ subscription }: HubDetailsViewPropsT) => {
  const router = useRouter();
  const storeContext = useContext(StoreContext);
  const [hub, setHub] = useState<HubT | null>(null);
  const [loading, setLoading] = useState(true);
  const { hub_id } = router.query;

  /**
   * Get Hub By ID
   */
  useEffect(() => {
    launchToastError('test');
    const getData = async () => {
      try {
        const hub: HubT = await getHub(`${hub_id}`);
        if (hub.status === StatusE.UPDATING) {
          router.push({
            pathname: RoutesE.DASHBOARD,
          });
          return;
        }
        setLoading(false);
        setHub(hub);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [hub_id, router]);

  /**
   * Toast Error
   * @param errorMessage
   */
  const launchToastError = useCallback(
    (errorMessage: string) => {
      storeContext.handleDispatchNotification({
        title: 'Error',
        description: errorMessage,
        duration: 8000,
        type: 'error',
        location: 'top_center',
        pauseOnHover: true,
        autoClose: true,
        hasIcon: true,
        category: 'toast',
      });
      setLoading(false);
    },
    [storeContext]
  );

  /**
   * Handle Form Submit
   */
  const handleFormSubmit = useCallback(
    ({ subdomain }: HubFormCardT) => {
      /** No hub launch error toast */
      if (!hub) {
        launchToastError('Sorry, there was an error locating this Hub.');
        return;
      }

      /**
       * Update subdomain from form
       * keep all other data as is
       */
      const updatedHub: UpdateHubT = {
        ...hub,
        subdomain: subdomain,
      };

      const submit = async () => {
        const errorMessage = 'Sorry, there was an error updating this Hub.';
        try {
          const resp = await updateHub(hub.hubId, updatedHub);
          if (resp?.status === 200) {
            router.push({
              pathname: RoutesE.DASHBOARD,
            });
          } else {
            launchToastError(errorMessage);
          }

          setLoading(false);
        } catch (error) {
          launchToastError(errorMessage);
          console.error(error);
        }
      };

      submit();
    },
    [hub, router, launchToastError]
  );

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      <SidePanelLayout hub={hub} subscription={subscription}>
        <div className={styles.card_wrapper}>
          {!loading && hub !== null ? (
            <HubFormCard hub={hub} onSubmit={handleFormSubmit} />
          ) : (
            <SkeletonCard qty={3} category="row" />
          )}
        </div>
      </SidePanelLayout>
    </div>
  );
};

export const getServerSideProps = hubIdRG(
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

export default HubDetailsView;
