import { RoutesE } from 'types/Routes';
import { AUTH_SERVER, DASH_ROOT_DOMAIN, MARKETING_PAGE_URL } from 'config';

/**************************
 *  RE-DIRECT UTILITIES
 **************************/

const redirectConfig = {
  auth: {
    source: RoutesE.Dashboard,
    destination: `https://${AUTH_SERVER}/login?idp=fxa&client=https://${DASH_ROOT_DOMAIN}`,
    permanent: false,
  },
  marketing: {
    source: RoutesE.Dashboard,
    destination: MARKETING_PAGE_URL,
    permanent: false,
  },
  dashboard: {
    destination: RoutesE.Dashboard,
    permanent: false,
  },
  subscription: {
    source: RoutesE.Dashboard,
    destination: RoutesE.Subscribe,
    permanent: false,
  },
};

/**
 * To Auth
 * @returns redirect
 */
export const redirectToAuthServer = () => {
  return { redirect: redirectConfig.auth };
};

/**
 * To Marketing Page
 * @returns redirect
 */
export const redirectToMarketingPage = () => {
  return { redirect: redirectConfig.marketing };
};

/**
 * To Dashboard
 * @returns redirect
 */
export const redirectToDashboard = () => {
  return { redirect: redirectConfig.dashboard };
};

/**
 * To Subscription
 * @returns redirect
 */
export const redirectToSubscribe = () => {
  return { redirect: redirectConfig.subscription };
};
