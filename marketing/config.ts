import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export const {
  AUTH_SERVER,
  DASH_ROOT_DOMAIN,
  ENV,
  FXA_PAYMENT_URL,
  FXA_SERVER,
  HUB_ROOT_DOMAIN,
  PLAN_ID_EA,
  PLAN_ID_EA_DE,
  PRODUCT_ID,
  PUBLIC_API_SERVER,
} = publicRuntimeConfig;
export const DASH_ROOT_DOMAIN_V2 = process.env.NEXT_PUBLIC_DASH_ROOT_DOMAIN_V2;
