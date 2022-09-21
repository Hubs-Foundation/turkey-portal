import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
export const HUB_ROOT_DOMAIN = publicRuntimeConfig.HUB_ROOT_DOMAIN;
export const AUTH_SERVER = publicRuntimeConfig.AUTH_SERVER;
export const FXA_SERVER = publicRuntimeConfig.FXA_SERVER;
export const FXA_PAYMENT_URL = publicRuntimeConfig.FXA_PAYMENT_URL;
export const PRODUCT_ID = publicRuntimeConfig.PRODUCT_ID;
export const PLAN_ID_EA = publicRuntimeConfig.PLAN_ID_EA;
