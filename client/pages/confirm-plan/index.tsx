import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { subscriptionPageRequireAuthentication } from 'services/routeGuard.service';
import styles from '../subscribe/subscribe.module.scss';
import { Button } from '@mozilla/lilypad-ui';
import { postStarterPlan } from 'services/plans.service';

const ConfirmPlan = () => {
  const onConfirmStartStarterPlan = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    try {
      await postStarterPlan();
      // TODO free plan redirect to dashboard after post finishes
    } catch (err) {
      // TODO free plan make error toast
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

export default ConfirmPlan;

export const getServerSideProps = subscriptionPageRequireAuthentication(
  async (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return {
      props: {},
    };
  }
);
