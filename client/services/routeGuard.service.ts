import type { GetServerSideProps } from 'next';
import { AxiosRequestHeaders } from 'axios';
import { getAccount } from './account.service';

export function requireAuthentication(gssp: Function): GetServerSideProps {
  return async (context) => {
    const { req } = context;

    // If no errors user is authenticated
    try {
      // TODO : MAYBE - Should we make a more explicit way to confirm a JWT here..
      await getAccount(req.headers as AxiosRequestHeaders);
      return await gssp(context);
    } catch (error) {
      return {
        redirect: {
          destination: '/subscribe',
          permanent: false,
        },
      };
    }
  };
}

/**
 * Route User If Logged in and visits login/signup page
 * @param gssp
 * @returns GetServerSideProps
 */
export function checkLoggedIn(gssp: Function): GetServerSideProps {
  return async (context) => {
    const { req } = context;

    try {
      await getAccount(req.headers as AxiosRequestHeaders);

      // If Authenticated Redirect to Dashboard.
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      };
    } catch (error) {
      return await gssp(context);
    }
  };
}
