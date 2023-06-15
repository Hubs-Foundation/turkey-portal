import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { AxiosRequestHeaders } from 'axios';
import { Button, ButtonSizesE, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { HubT } from 'types/General';
import { RoutesE } from 'types/Routes';
import { hubIdRG } from 'services/routeGuard.service';
import styles from './custom-client.module.scss';
import { getSubscription, SubscriptionT } from 'services/subscription.service';
import { getHubs } from 'services/hub.service';
import SidePanelLayout from 'layouts/SidePanelLayout/SidePanelLayout';
import Card from '@Shared/Card/Card';

type HubDetailsViewPropsT = {
  subscription: SubscriptionT;
};

const CustomClient = ({ subscription }: HubDetailsViewPropsT) => {
  const router = useRouter();
  const [hubs, setHubs] = useState<HubT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /**
   * Get Hubs
   */
  useEffect(() => {
    const getData = async () => {
      try {
        const hubs = await getHubs();
        setHubs(hubs);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  /**
   * Cancel Click ( Router )
   */
  const handleCancelClick = () => {
    router.push({
      pathname: RoutesE.DASHBOARD,
    });
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Hub Details View</title>
        <meta name="description" content="detailed information about a Hub" />
      </Head>

      <SidePanelLayout
        hub={hubs[0]}
        isLoading={isLoading}
        subscription={subscription}
      >
        <div className={styles.card_wrapper}>
          <Card size="large" classProp={styles.card}>
            <div className={styles.card_header}>
              <Button
                label="cancel"
                onClick={handleCancelClick}
                size={ButtonSizesE.LARGE}
                category={ButtonCategoriesE.PRIMARY_CLEAR}
                icon="arrow-left"
                classProp="mr-5"
              />
              <h1 className="heading-sm">Custom Client</h1>
            </div>
            <p className="paragraph mb-24">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lacinia quis vel eros donec ac. Ultrices gravida dictum fusce ut.
              Dui accumsan sit amet nulla facilisi morbi tempus. Tellus integer
              feugiat scelerisque varius morbi enim nunc faucibus.
            </p>
            <a href="" className="primary-link">
              hubs-clientupload@mozilla.com
            </a>
          </Card>
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

export default CustomClient;
