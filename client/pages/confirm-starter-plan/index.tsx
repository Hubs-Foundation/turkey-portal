import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { subscriptionPageRequireAuthentication } from 'services/routeGuard.service';
import styles from '../subscribe/subscribe.module.scss';
import { postStarterSubscription } from 'services/subscription.service';
import { Button } from '@mozilla/lilypad-ui';

const ConfirmStarterPlan = () => {
  const onConfirmStartStarterPlan = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      await postStarterSubscription();
      // TODO redirect to dashboard after post finishes
    } catch (err) {
      // TODO make error toast
      console.error(
        'Failed to subscribe user to free plan. Please try again later.'
      );
    }
  };

  return (
    <div className="page_wrapper">
      <Head>
        <title>Confirm Starter Plan</title>
        <meta name="description" content="Sign up for Starter Plan" />
      </Head>

      <main>
        <div className={styles.wrapper}>
          <Button
            text="Confirm Starter Plan"
            label="Confirm Starter Plan"
            onClick={onConfirmStartStarterPlan}
          />
        </div>
      </main>
    </div>
  );
};

export default ConfirmStarterPlan;

export const getServerSideProps = subscriptionPageRequireAuthentication(
  async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
