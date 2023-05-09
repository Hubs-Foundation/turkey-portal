type EnvVariableKeys = {
  DASH_ROOT_DOMAIN: string;
  FXA_PAYMENT_URL: string;
  PLAN_ID_EA: string;
  PRODUCT_ID: string;
  PLAN_ID_EA_DE: string;
  PUBLIC_API_SERVER: string;
  ENABLE_STARTER_PLAN: string;
};

type EnvVariable = keyof EnvVariableKeys;

/**
 * LOCAL ENVIRONMENT
 */
const localVars: EnvVariableKeys = {
  DASH_ROOT_DOMAIN: 'localhost:3000',
  FXA_PAYMENT_URL: 'https://price.local',
  PLAN_ID_EA: 'price_id123',
  PRODUCT_ID: 'prod_KPReWHqwGqZBzc',
  PLAN_ID_EA_DE: 'price_germany_id123',
  PUBLIC_API_SERVER: 'http://127.0.0.1:4000',
  ENABLE_STARTER_PLAN: 'enabled',
};

/**
 * DEVELOPMENT ENVIRONMENT
 */
const devVars: EnvVariableKeys = {
  DASH_ROOT_DOMAIN: 'dashboard.dev.myhubs.net',
  FXA_PAYMENT_URL: 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net',
  PLAN_ID_EA: 'price_1Jkcl3Kb9q6OnNsLFbECmMtd',
  PRODUCT_ID: 'prod_KPReWHqwGqZBzc',
  PLAN_ID_EA_DE: 'price_1LqkLwKb9q6OnNsLlWHZfPOu',
  PUBLIC_API_SERVER: 'https://dashboard.dev.myhubs.net',
  ENABLE_STARTER_PLAN: 'enabled',
};

/**
 * PRODUCTION ENVIRONMENT
 */
const prodVars: EnvVariableKeys = {
  DASH_ROOT_DOMAIN: 'dashboard.hubs.mozilla.com',
  FXA_PAYMENT_URL: 'https://subscriptions.firefox.com',
  PLAN_ID_EA: 'price_1M4SjzJNcmPzuWtRyXTlz0Jn',
  PRODUCT_ID: 'prod_Mo4tS8uH9y3Mj5',
  PLAN_ID_EA_DE: 'price_1M9EJVJNcmPzuWtRbMGiQVgD',
  PUBLIC_API_SERVER: 'https://dashboard.hubs.mozilla.com',
  ENABLE_STARTER_PLAN: '',
};

/**
 * Get Env Variable : these are generated at build time time.
 * run time ENV variables can be used on pages that are not built
 * on run time
 * @param key
 * @returns string
 */
const getEnvVariable = (key: EnvVariable): string => {
  if (process.env.ENV === 'local') {
    return localVars[key];
  }

  if (process.env.ENV === 'dev') {
    return devVars[key];
  }

  // Return prod vars by default always.
  return prodVars[key];
};

export default getEnvVariable;
