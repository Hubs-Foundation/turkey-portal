import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { HubT, UpdateHubT, StatusE, AccountT } from 'types/General';
import { RoutesE } from 'types/Routes';
import { getHub, updateHub } from 'services/hub.service';
import { requireAuthenticationAndSubscription } from 'services/routeGuard.service';
import Head from 'next/head';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { ToastContainer, toast } from 'react-toastify';
import HubFormCard, { HubFormCardT } from '@Cards/HubFormCard/HubFormCard';
import type { GetServerSidePropsContext } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import styles from './[hub_id].module.scss';
import { getSubscription, SubscriptionT } from 'services/subscription.service';
import SidePanel from 'modules/dashboard/SidePanel';
import { AxiosRequestHeaders } from 'axios';
import { enabledStarterPlan } from 'util/featureFlag';

type HubDetailsViewPropsT = {
  subscription: SubscriptionT;
  account: AccountT;
};

const HubDetailsView = ({ subscription, account }: HubDetailsViewPropsT) => {
  const router = useRouter();
  const [hub, setHub] = useState<HubT | null>(null);
  const [loading, setLoading] = useState(true);
  const { hub_id } = router.query;

  /**
   * Get Hub By ID
   */
  useEffect(() => {
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
  const launchToastError = (errorMessage: string) => {
    // TODO: set up error logger
    toast.error(errorMessage, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
    setLoading(false);
  };

  /**
   * Handle Form Submit
   */
  const handleFormSubmit = useCallback(
    ({ name, subdomain }: HubFormCardT) => {
      /**
       * TODO:
       * Circle back with UX on how we can have a error state here and not
       * just a toast message.
       */
      if (!hub) {
        launchToastError('Sorry, there was an error locating this Hub.');
        return;
      }

      /**
       * Update Date from form
       * keep all other data as is
       */
      const updatedHub: UpdateHubT = {
        ...hub,
        subdomain: subdomain,
        name: name,
      };

      const submit = async () => {
        try {
          const resp = await updateHub(hub.hubId, updatedHub);
          if (resp?.status === 200) {
            router.push({
              pathname: RoutesE.DASHBOARD,
            });
          } else {
            launchToastError('Sorry, there was an error updating this Hub.');
          }

          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

      submit();
    },
    [hub, router]
  );

  /**
   * Handle Form Error
   */
  const handleFormError = (errorMessage: string) => {
    launchToastError(errorMessage);
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      {!loading && hub !== null ? (
        <main className={styles.main}>
          <div className={styles.card_wrapper}>
            <HubFormCard
              hub={hub}
              onSubmit={handleFormSubmit}
              onError={handleFormError}
            />
          </div>

          <SidePanel
            subdomain={hub.subdomain}
            subscription={subscription}
            hasStarterPlan={account.hasPlan}
            hasSubscription={account.hasSubscription}
          />
        </main>
      ) : (
        <div className="flex-justify-center">
          <div className={styles.skeleton_container}>
            <SkeletonCard qty={3} category="square" />
            <SkeletonCard qty={3} category="square" />
            <SkeletonCard qty={3} category="square" />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export const getServerSideProps = requireAuthenticationAndSubscription(
  async (context: GetServerSidePropsContext, account: AccountT) => {
    // Starter plan doesn't have access to Hub name or subdomain change, so this page is not found
    if (enabledStarterPlan() && account.hasPlan) return { notFound: true };
    // Your normal `getServerSideProps` code here
    try {
      const subscription = await getSubscription(
        context.req.headers as AxiosRequestHeaders
      );
      return {
        props: {
          subscription,
          account,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }
);

export default HubDetailsView;
