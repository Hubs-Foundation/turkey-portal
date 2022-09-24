import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { requireAuthenticationAndHubsOrSubscription } from 'services/routeGuard.service';
import SubContactCard from '@Cards/SubContactCard/SubContactCard';
import SubInfoCard from '@Cards/SubInfoCard/SubInfoCard';
import styles from './login.module.scss';

// TODO This page will never be seen for EA
type LoginPropsT = {};

const Login = ({}: LoginPropsT) => {
  return (
    <div className="page_wrapper">
      <Head>
        <title>Login Page</title>
        <meta name="description" content="login profile page" />
      </Head>

      <main>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.cards}>
              <SubInfoCard />
              <SubContactCard
                email="hubs@mozilla.com"
                subject="Subscription inquiries"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

export const getServerSideProps = requireAuthenticationAndHubsOrSubscription(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
  }
);

Login.displayName = 'Login';
