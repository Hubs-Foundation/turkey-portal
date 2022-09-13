import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { checkLoggedIn } from 'services/routeGuard.service';
import SubContactCard from '@Cards/SubContactCard/SubContactCard';
import SubInfoCard from '@Cards/SubInfoCard/SubInfoCard';
import styles from './login.module.scss';

/**
 *
 * Note :  THIS PAGE IS NOT BEING USED. THIS PAGE SHOULD NOT BE SHOWN TO THE USER
 * IN THE CURRENT WORK FLOW - NG
 *
 */

type LoginPropsT = {};

const Login = ({}: LoginPropsT) => {
  // TODO: this is not correct, need to connect with brian on how to update
  // the backend for this. -NG

  // This looks close enough for now. We still haven't finalized this in MVP2. Probably the main change would be
  // to make auth.myhubs.net configurable with an environment variable. - BP

  return (
    <div className="page_wrapper">
      <Head>
        <title>Login Page</title>
        <meta name="description" content="login profle page" />
      </Head>

      <main>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.cards}>
              <SubInfoCard />
              <SubContactCard />
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
