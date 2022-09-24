import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  Redirect,
} from 'next';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import { getAccount } from './account.service';
import { RoutesE } from 'types/Routes';
import { MARKETING_PAGE_URL } from 'config';

type RedirectDataT = {
  error: String;
  redirect: String;
};

export function requireAuthentication(
  gssp: Function
): GetServerSideProps | Redirect {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    // If no errors user is authenticated
    try {
      // TODO : MAYBE - Should we make a more explicit way to confirm a JWT here..
      const account = await getAccount(req.headers as AxiosRequestHeaders);

      // User is authenticated
      if (account.hasHubs || account.hasSubscription) {
        return await gssp(context, account);
      } else {
        // Authenticated but does not have any hubs or a subscription therefore send to /subscribe page
        return {
          redirect: {
            source: '/dashboard',
            destination: '/subscribe',
            permanent: false,
          },
        };
      }
    } catch (error) {
      // User is not authenticated
      const axiosError = error as AxiosError;
      const status: Number | undefined = axiosError.response?.status;
      const redirectToMarketingPage = {
        redirect: {
          source: '/dashboard',
          destination: MARKETING_PAGE_URL, // likely the marketing page
          permanent: false,
        },
      };

      if (status === 401) {
        // Expected authentication error from the Phoenix server
        return redirectToMarketingPage;
      } else {
        console.error('Unexpected error in requireAuthentication');
        console.error(`Response status ${status}`);
        // Unexpected error
        return redirectToMarketingPage;
      }
    }
  };
}

// Type check if obj is RedirectDataT
function checkTypeRedirectDataT(
  obj: unknown | RedirectDataT
): obj is RedirectDataT {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'error' in obj &&
    'redirect' in obj
  );
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
          destination: RoutesE.Dashboard,
          permanent: false,
        },
      };
    } catch (error) {
      return await gssp(context);
    }
  };
}
