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
  redirectToConfirmPlan,
} from '../util/redirects';
import { RoutesE } from '../types/Routes';
import { CookiesE } from 'types/Cookies';
import { setCookies } from 'cookies-next';
import { localFeature } from '../util/featureFlag';
import { AccountT } from 'types/General';

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
    sameSite: 'lax',
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
function handleUnauthenticatedRedirects(
  axiosError: AxiosError,
  callbackRoute: RoutesE | null = null
) {
  const { status, data } = axiosError.response as UnauthenticatedResponseT;

  // If Redirect specified send them to auth
  if (status === 401 && data?.redirect === 'auth') {
    return redirectToAuthServer(callbackRoute);
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
 * Confirm Plan Route Guard
 * @param gssp
 * @returns
 */
export function confirmPlanRG(gssp: Function): GetServerSideProps | Redirect {
  return async (context: GetServerSidePropsContext) => {
    const { req, query } = context;

    if (localFeature() && shouldNotRedirect(query)) return await gssp(context);

    if (didSetTurkeyauthCookie(context)) {
      return redirectToConfirmPlan();
    }

    // If no errors user is authenticated
    try {
      const account: AccountT = await getAccount(
        req.headers as AxiosRequestHeaders
      );

      // If user has plan go to dashboard
      if (account.hasPlan) {
        return redirectToDashboard();
      }

      return await gssp(context);
    } catch (error) {
      return handleUnauthenticatedRedirects(
        error as AxiosError,
        req.url as RoutesE
      );
    }
  };
}

/**
 * [hub_id] Route Guard
 * @param gssp
 * @returns
 */
export function hubIdRG(gssp: Function): GetServerSideProps | Redirect {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    if (didSetTurkeyauthCookie(context)) {
      return redirectToDashboard();
    }

    // If no errors user is authenticated
    try {
      const account: AccountT = await getAccount(
        req.headers as AxiosRequestHeaders
      );

      // starter plan doesn't have access to Hub name or subdomain change
      if (account.planName === 'starter') {
        return redirectToDashboard();
      }

      // User is authenticated
      if (account.hasSubscription) {
        return await gssp(context);
      }

      // Authenticated but no subscription
      return redirectToSubscribe();
    } catch (error) {
      return handleUnauthenticatedRedirects(
        error as AxiosError,
        req.url as RoutesE
      );
    }
  };
}

/**
 * Custom Client Route Guard
 * @param gssp
 * @returns
 */
export function customClientRG(gssp: Function): GetServerSideProps | Redirect {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;

    // If no errors user is authenticated
    try {
      const account: AccountT = await getAccount(
        req.headers as AxiosRequestHeaders
      );

      // only P2 can get to this page
      if (account.planName !== PlansE.p2) {
        return redirectToDashboard();
      }

      // User has subscription
      if (account.hasSubscription) {
        return await gssp(context);
      }

      // Authenticated but no subscription
      return redirectToSubscribe();
    } catch (error) {
      return handleUnauthenticatedRedirects(
        error as AxiosError,
        req.url as RoutesE
      );
    }
  };
}

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
      const account: AccountT = await getAccount(
        req.headers as AxiosRequestHeaders
      );

      // User is authenticated
      if (account.hasSubscription || account.hasPlan) {
        return await gssp(context);
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
export function pageRequireAuthentication(gssp: Function): GetServerSideProps {
  return async (context) => {
    const { req, query } = context;

    if (localFeature() && shouldNotRedirect(query)) return await gssp(context);

    try {
      const account: AccountT = await getAccount(
        req.headers as AxiosRequestHeaders
      );

      if (account.hasSubscription || account.hasPlan) {
        return redirectToDashboard();
      }

      return await gssp(context);
    } catch (error) {
      return handleUnauthenticatedRedirects(
        error as AxiosError,
        req.url as RoutesE
      );
    }
  };
}

/**************************
 *  LOCAL DEV UTILITIES
 **************************/

/**
 * Local development only
 *
 * @param req
 * @returns boolean
 */
function shouldNotRedirect(query: { redirect?: string }): boolean {
  return Boolean(query.redirect === 'false');
}
