import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export const {
  HUB_ROOT_DOMAIN,
  DASH_ROOT_DOMAIN,
  AUTH_SERVER,
  FXA_SERVER,
  FXA_PAYMENT_URL,
  PRODUCT_ID,
  PLAN_ID_EA,
} = publicRuntimeConfig;
