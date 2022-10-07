import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  Redirect,
} from 'next';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import { getAccount } from './account.service';
import { RoutesE } from 'types/Routes';
import { MARKETING_PAGE_URL } from 'config';
import { IncomingMessage } from 'http';

export function requireAuthenticationAndHubsOrSubscription(
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
      }

      // Authenticated, NO hubs OR NO subscription
      return redirectToSubscribe();
    } catch (error) {
      // User is not authenticated
      const axiosError = error as AxiosError;
      const status: Number | undefined = axiosError.response?.status;

      // If status is 401, it's an expected error
      if (status !== 401) {
        // Unexpected error
        console.error('Unexpected error in requireAuthentication');
        console.error(`Response status: ${status}, error: ${axiosError}`);
      }

      return redirectToMarketingPage();
    }
  };
}

function redirectToMarketingPage() {
  return {
    redirect: {
      source: '/dashboard',
      destination: MARKETING_PAGE_URL, // likely the marketing page
      permanent: false,
    },
  };
}

function redirectToDashboard() {
  return {
    redirect: {
      destination: RoutesE.Dashboard,
      permanent: false,
    },
  };
}

function redirectToSubscribe() {
  return {
    redirect: {
      source: '/dashboard',
      destination: '/subscribe',
      permanent: false,
    },
  };
}

// TODO EA remove this function when unauthenticated users are no longer redirected to marketing page
const FALSE = 'false';
type QueryRedirectT = {
  redirect?: string;
};

/**
 * Local development only
 * Used for pasting document.cookie into the browser for local testing purposes
 * Checks for /subscribe page, then for "?redirect=false" in query params, then if we're on localhost
 *
 * @param req
 * @param query
 * @returns boolean
 */
function shouldNotRedirect(
  req: IncomingMessage,
  query: QueryRedirectT
): boolean {
  if (
    req.url?.includes('/subscribe') &&
    query.redirect === FALSE &&
    req.headers.host?.includes('localhost')
  )
    return true;
  else return false;
}

/**
 * For authenticated subscribe page,redirect to /dashboard if you have hubs or subscription
 * Authenticated NO hubs AND NO subscription, stay on /subscribe page
 * Authenticated YES hubs OR YES subscription, redirect to /dashboard
 * NOT Authenticated, redirect to marketing page
 * @param gssp
 * @returns GetServerSideProps
 */
export function subscriptionPageRequireAuthentication(
  gssp: Function
): GetServerSideProps {
  return async (context) => {
    const { req, query } = context;

    // shouldNotRedirect() Local development only
    if (shouldNotRedirect(req, query)) return await gssp(context);

    try {
      const account = await getAccount(req.headers as AxiosRequestHeaders);

      if (account.hasHubs || account.hasSubscription) {
        return redirectToDashboard();
      } else {
        return await gssp(context, account);
      }
    } catch (error) {
      // Not Authenticated
      return redirectToMarketingPage();
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
          destination: RoutesE.Dashboard,
          permanent: false,
        },
      };
    } catch (error) {
      return await gssp(context);
    }
  };
}
