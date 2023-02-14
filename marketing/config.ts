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

export type EnvVariableKeys = {
  // used in - navigation mobile desktipo
  DASH_ROOT_DOMAIN: string;
  // subscribe card
  FXA_PAYMENT_URL: string;
  // in docker not sure why
  FXA_SERVER: string;
  // none
  HUB_ROOT_DOMAIN: string;
  // subscribe card
  PLAN_ID_EA: string;
  // subscribe card
  PRODUCT_ID: string;
  // subscribe card
  PLAN_ID_EA_DE: string;
  // region service
  PUBLIC_API_SERVER: string;
};

/**
 * LOCAL ENVIRONMENT
 */
const localVars: EnvVariableKeys = {
  DASH_ROOT_DOMAIN: 'localhost:3000',
  FXA_PAYMENT_URL: 'https://price.local',
  FXA_SERVER: 'fxa.local',
  HUB_ROOT_DOMAIN: 'hub.local',
  PLAN_ID_EA: 'price_id123',
  PRODUCT_ID: 'prod_KPReWHqwGqZBzc',
  PLAN_ID_EA_DE: 'price_germany_id123',
  PUBLIC_API_SERVER: 'http://127.0.0.1:4000',
};

/**
 * DEVELOPMENT ENVIRONMENT
 */
const devVars: EnvVariableKeys = {
  DASH_ROOT_DOMAIN: 'dashboard.dev.myhubs.net',
  FXA_PAYMENT_URL: 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net',
  FXA_SERVER: 'accounts.stage.mozaws.net',
  HUB_ROOT_DOMAIN: 'dev.myhubs.net',
  PLAN_ID_EA: 'price_1Jkcl3Kb9q6OnNsLFbECmMtd',
  PRODUCT_ID: 'prod_KPReWHqwGqZBzc',
  PLAN_ID_EA_DE: 'price_1LqkLwKb9q6OnNsLlWHZfPOu',
  PUBLIC_API_SERVER: 'https://dashboard.dev.myhubs.net',
};

/**
 * PRODUCTION ENVIRONMENT
 */
const prodVars: EnvVariableKeys = {
  DASH_ROOT_DOMAIN: 'dashboard.hubs.mozilla.com',
  FXA_PAYMENT_URL: 'https://subscriptions.firefox.com',
  FXA_SERVER: 'accounts.firefox.com',
  HUB_ROOT_DOMAIN: 'hubs.mozilla.com',
  PLAN_ID_EA: 'price_1M4SjzJNcmPzuWtRyXTlz0Jn',
  PRODUCT_ID: 'prod_Mo4tS8uH9y3Mj5',
  PLAN_ID_EA_DE: 'price_1M9EJVJNcmPzuWtRbMGiQVgD',
  PUBLIC_API_SERVER: 'https://dashboard.hubs.mozilla.com',
};

export const getEnvVariable = (
  env: string | undefined,
  key: keyof EnvVariableKeys
): string => {
  if (env === 'local') {
    return localVars[key];
  }

  if (env === 'dev') {
    return devVars[key];
  }

  // Return prod vard default always.
  return prodVars[key];
};
