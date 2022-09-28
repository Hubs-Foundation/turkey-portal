import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { checkLoggedIn } from 'services/routeGuard.service';
import SubContactCard from '@Cards/SubContactCard/SubContactCard';
import SubInfoCard from '@Cards/SubInfoCard/SubInfoCard';
import styles from './login.module.scss';

type LoginPropsT = {};

const Login = ({}: LoginPropsT) => {
  // TODO: this is not correct, need to connect with brian on how to update
  // the backend for this. -NG

  // This looks close enough for now. We still haven't finalized this in MVP2. Probably the main change would be
  // to make auth.myhubs.net configurable with an environment variable. - BP

  return (
    <div className="page_wrapper">
      <title>I am here.</title>
      <Head>
        <title>Login Page</title>
        <meta name="description" content="login profle page" />
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

export const getServerSideProps = checkLoggedIn(
  (context: GetServerSidePropsContext) => {
    // Your normal `getServerSideProps` code here
    return { props: {} };
  }
);

Login.displayName = 'Login';
