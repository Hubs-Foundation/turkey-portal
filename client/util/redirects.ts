import { RoutesE } from 'types/Routes';
import { AUTH_SERVER, MARKETING_PAGE_URL } from 'config';
import { DASH_ROOT_DOMAIN } from 'config';

/**
 * To Auth
 * @param RoutesE
 * @returns redirect
 */
export const redirectToAuthServer = (callbackRoute: RoutesE | null) => {
  return {
    redirect: {
      source: RoutesE.DASHBOARD,
      /** WARNING : auth server does not just take any ol url as a callback, 
      it needs to be added to "trustedClients" in turkey ops to work. */
      destination: `https://${AUTH_SERVER}/login?idp=fxa&client=https://${DASH_ROOT_DOMAIN}${
        callbackRoute === null ? '' : callbackRoute
      }`,
      permanent: false,
    },
  };
};

/**
 * To Marketing Page
 * @returns redirect
 */
export const redirectToMarketingPage = () => {
  return {
    redirect: {
      source: RoutesE.DASHBOARD,
      destination: MARKETING_PAGE_URL,
      permanent: false,
    },
  };
};

/**
 * To Dashboard
 * @returns redirect
 */
export const redirectToDashboard = () => {
  return {
    redirect: {
      destination: RoutesE.DASHBOARD,
      permanent: false,
    },
  };
};

/**
 * To Subscription
 * @returns redirect
 */
export const redirectToSubscribe = () => {
  return {
    redirect: {
      source: RoutesE.DASHBOARD,
      destination: RoutesE.SUBSCRIBE,
      permanent: false,
    },
  };
};
