import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { AxiosRequestHeaders } from 'axios';
import { Button, ButtonSizesE, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { HubT } from 'types/General';
import { RoutesE } from 'types/Routes';
import { customClientRG } from 'services/routeGuard.service';
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
        <title>Create Custom Client</title>
        <meta
          name="description"
          content="creating a custom client for user on the pro plan"
        />
      </Head>

      <SidePanelLayout
        hub={hubs[0]}
        isLoading={isLoading}
        subscription={subscription}
      >
        <div className={styles.card_wrapper}>
          <Card size="large" classProp={styles.card}>
            <div className="flex-align-center mb-12">
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
              This plan allows you to manually upload your own version of the
              Hubs client including custom code. The following documentation
              walks you through the process, prerequisites, and how to
              troubleshooting custom clients. Be advised that uploading a custom
              client will prevent your hub from receiving automatic updates to
              the Hubs client. Users who upload a custom client are responsible
              for ensuring their code is compatible with Mozilla’s regular
              updates to the Hubs server infrastructure.
            </p>

            <div className="mb-20 youtube-video">
              <iframe
                className=""
                src="https://www.youtube.com/embed/RyS_TbmCcY4"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>

            <a
              className="primary-link mb-20 block"
              onClick={() => {
                window.open('mailto:hubs-clientupload@mozilla.com');
              }}
            >
              [Placeholder] Get started with the Hubs Docs
            </a>

            <a
              className="primary-link block"
              onClick={() => {
                window.open('mailto:hubs-clientupload@mozilla.com');
              }}
            >
              Follow our update cycle
            </a>
          </Card>
        </div>
      </SidePanelLayout>
    </div>
  );
};

export const getServerSideProps = customClientRG(
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
