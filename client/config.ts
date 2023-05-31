import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isServerSide = typeof window === 'undefined';

export const {
  AUTH_SERVER,
  DASH_ROOT_DOMAIN,
  ENV,
  FXA_PAYMENT_URL,
  FXA_SERVER,
  HUB_ROOT_DOMAIN,
  MARKETING_PAGE_URL,
  PLAN_ID_EA,
  PLAN_ID_EA_DE,
  PRODUCT_ID,
  SUBPLAT_SUBSCRIPTIONS_LINK,
} = publicRuntimeConfig;

export const DUMMY = publicRuntimeConfig.dummy;
export const PUBLIC_API_SERVER = isServerSide
  ? serverRuntimeConfig.PUBLIC_API_SERVER
  : publicRuntimeConfig.PUBLIC_API_SERVER;
