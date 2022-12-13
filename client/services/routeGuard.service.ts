import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  Redirect,
} from 'next';
import { AxiosError, AxiosRequestHeaders } from 'axios';
import { getAccount } from './account.service';
import {
  redirectToAuthServer,
  redirectToMarketingPage,
  redirectToDashboard,
  redirectToSubscribe,
} from '../util/redirects';
import { RoutesE } from '../types/Routes';
import { CookiesE } from 'types/Cookies';
import { IncomingMessage } from 'http';
import { setCookies } from 'cookies-next';
import { localFeature } from '../util/featureFlag';

type UnauthenticatedResponseT = {
  status: Number | undefined;
  data: {
    error: string;
    redirect: string;
  };
};

/**************************
 *  PRIVATE UTILITIES
 **************************/

/**
 * Set cookie from url parameter
 * @param context
 */
function didSetTurkeyauthCookie(context: GetServerSidePropsContext): boolean {
  const { req, res, query } = context;
  const key = CookiesE.TurkeyAuthToken;
  const cookieTtlHours = 24;

  if (!(key in query)) return false;
  setCookies(key, query[key], {
    req,
    res,
    maxAge: 3600 * cookieTtlHours,
  });

  // Note: the 'setCookie' above does not set cookie in time to be used in the
  // account authentication that follows this function. This manually adds cookie
  // to succefully complete account auth.
  req.headers.cookie = `${key}=${query[key]}`;

  return true;
}

/**
 * Handle redirects for authentication errors
 * @param axiosError
 * @returns
 */
function handleUnauthenticatedRedirects(axiosError: AxiosError) {
  const { status, data } = axiosError.response as UnauthenticatedResponseT;

  // If Redirect specified send them to auth
  if (status === 401 && data?.redirect === 'auth') {
    return redirectToAuthServer();
  }

  // Unexpected error
  if (status !== 401) {
    console.error(
      `Unexpected error in requireAuthentication. Response status: ${status}, error: ${axiosError}`
    );
  }

  // If no auth specified default to marketing page
  return redirectToMarketingPage();
}

/**************************
 *  PUBLIC ROUTE GUARDS
 **************************/

/**
 * Dashboard Route Guard
 * @param gssp
 * @returns
 */
export function requireAuthenticationAndSubscription(
  gssp: Function
): GetServerSideProps | Redirect {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    /**
     * Check if token is on the url param, if so redirect back to the dash with a clean /dashboard
     * url so it is not exposed in the browser url UI.
     */
    if (didSetTurkeyauthCookie(context)) {
      return redirectToDashboard();
    }

    // If no errors user is authenticated
    try {
      const account = await getAccount(req.headers as AxiosRequestHeaders);

      // User is authenticated
      if (account.hasSubscription) {
        return await gssp(context, account);
      }

      // Authenticated but no subscription
      return redirectToSubscribe();
    } catch (error) {
      return handleUnauthenticatedRedirects(error as AxiosError);
    }
  };
}

/**
 * Subscription Route Guard
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

    // Local development only - start
    if (localFeature() && shouldNotRedirect(req, query))
      return await gssp(context);
    // Local development only - end

    try {
      const account = await getAccount(req.headers as AxiosRequestHeaders);
      if (account.hasSubscription) {
        return redirectToDashboard();
      }

      return await gssp(context, account);
    } catch (error) {
      return handleUnauthenticatedRedirects(error as AxiosError);
    }
  };
}

/**************************
 *  LOCAL DEV UTILITIES
 **************************/

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
  query: {
    redirect?: string;
  }
): boolean {
  return Boolean(
    req.url?.includes(RoutesE.SUBSCRIBE) && query.redirect === 'false'
  );
}
