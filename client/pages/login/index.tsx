import Head from 'next/head';
import type { GetServerSidePropsContext } from 'next';
import { checkLoggedIn } from 'services/routeGuard.service';
import { AUTH_SERVER_URL, PUBLIC_DASH_ROOT_DOMAIN } from 'config';
import Button from '@Shared/Button/Button';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';

type LoginPropsT = {};

const Login = ({}: LoginPropsT) => {
  const loginUrl = `${AUTH_SERVER_URL}/login?idp=fxa&client=${PUBLIC_DASH_ROOT_DOMAIN}`;

  return (
    <div className="page_wrapper">
      <Head>
        <title>Login Page</title>
        <meta name="description" content="login profile page" />
      </Head>

      <main>
        <h1>Login Page</h1>

        <ExternalLink href={loginUrl} target="_self">
          <Button text="Sign Up"></Button>
        </ExternalLink>
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
