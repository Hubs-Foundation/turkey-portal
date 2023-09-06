import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HubT, StatusE } from 'types/General';
import { RoutesE } from 'types/Routes';
import { getHub } from 'services/hub.service';
import { hubIdRG } from 'services/routeGuard.service';
import Head from 'next/head';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';
import HubFormCard from '@Modules/hubs/HubFormCard/HubFormCard';
import type { GetServerSidePropsContext } from 'next';
import styles from './[hub_id].module.scss';
import { getSubscription, SubscriptionT } from 'services/subscription.service';
import { AxiosRequestHeaders } from 'axios';
import SidePanelLayout from 'layouts/SidePanelLayout/SidePanelLayout';

type HubDetailsViewPropsT = {
  subscription: SubscriptionT;
};

const HubDetailsView = ({ subscription }: HubDetailsViewPropsT) => {
  const router = useRouter();
  const [hub, setHub] = useState<HubT>();
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
        setHub(hub);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [hub_id, router]);

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      <SidePanelLayout hub={hub} subscription={subscription}>
        <div className={styles.card_wrapper}>
          {!loading && hub != null ? (
            <HubFormCard hub={hub} />
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
