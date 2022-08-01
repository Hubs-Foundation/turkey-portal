import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { HubT, UpdateHubT } from 'types/General';
import { getHub, updateHub } from 'services/hub.service';
import { requireAuthentication } from 'services/routeGuard.service';
import Head from 'next/head';
import SkeletonCard from '@Cards/SkeletonCard/SkeletonCard';
import { ToastContainer, toast } from 'react-toastify';
import HubFormCard, { HubFormCardT } from '@Cards/HubFormCard/HubFormCard';
import type { GetServerSidePropsContext } from 'next';
import 'react-toastify/dist/ReactToastify.css';
import styles from './[hub_id].module.scss';
import { getSubscriptions, SubscriptionT } from 'services/subscription.service';
import SubCard from '@Cards/SubCard/SubCard';

type HubDetailsViewPropsT = {};

const HubDetailsView = ({}: HubDetailsViewPropsT) => {
  // TODO : Get real sub data
  const subscriptionInit: SubscriptionT = {
    next_payment: '',
  };
  const router = useRouter();
  const [hub, setHub] = useState<HubT | null>(null);
  const [loading, setLoading] = useState(true);
  const { hub_id } = router.query;
  const [subscription, setSubscription] = useState<SubscriptionT>(subscriptionInit);

  /**
   * Get Hub By ID
   */
  useEffect(() => {
    getHub(`${hub_id}`).then((hub: HubT) => {
      setLoading(false);
      setHub(hub);
    });
  }, [hub_id]);

  /**
   * Get Hub Subscription
   */
  useEffect(() => {
    getSubscriptions().then((subscription) => {
      setSubscription(subscription);
    });
  }, []);

  const launchToastError = () => {
    // TODO: set up error logger
    toast.error('Sorry, there was an error locating this Hub.', {
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
      setLoading(true);
      if (!hub) {
        launchToastError();
        return;
      }

      /**
       * Update Date from from
       * keep all other data as is
       */
      const { ccuLimit, status, storageLimitMb, hubId, tier } = hub;
      const updatedHub: UpdateHubT = {
        name,
        ccuLimit,
        status,
        storageLimitMb,
        subdomain,
        tier,
      };

      updateHub(`${hubId}`, updatedHub).then((resp) => {
        if (resp?.status === 200) {
          toast.success(`Hub: ${name} has been updated!`);
          setHub(resp?.data);
        } else {
          toast.error('Sorry, there was an error updating this Hub.');
        }

        setLoading(false);
      });
    },
    [hub]
  );

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      {!loading && hub !== null ? (
        <main className={styles.main}>
          <div className={styles.cards_wrapper}>
            <HubFormCard hub={hub} onSubmit={handleFormSubmit} />
          </div>

          {/* SUBSCRIPTION WIDGET  */}
          <SubCard classProp={styles.subcard} subscription={subscription} />
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

export default HubDetailsView;

export const getServerSideProps = requireAuthentication(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
  }
);
