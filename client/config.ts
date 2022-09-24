import getConfig from 'next/config';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const isServerSide = typeof window === 'undefined';

export const {
  AUTH_SERVER,
  DASH_ROOT_DOMAIN,
  FXA_PAYMENT_URL,
  FXA_SERVER,
  HUB_ROOT_DOMAIN,
  MARKETING_PAGE_URL,
  PLAN_ID_EA,
  PRODUCT_ID,
} = publicRuntimeConfig;

export const DUMMY = publicRuntimeConfig.dummy;
export const PUBLIC_API_SERVER = isServerSide
  ? serverRuntimeConfig.PUBLIC_API_SERVER
  : publicRuntimeConfig.PUBLIC_API_SERVER;
