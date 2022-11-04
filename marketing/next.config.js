/** @type {import('next').NextConfig} */

/**
 * LOCAL ENVIRONMENT
 */
if (process.env.ENV === 'local') {
  DASH_ROOT_DOMAIN = 'localhost:3000';
  FXA_PAYMENT_URL = 'https://price.local';
  FXA_SERVER = 'fxa.local';
  HUB_ROOT_DOMAIN = 'hub.local';
  PLAN_ID_EA = 'price_id123';
  PRODUCT_ID = 'prod_KPReWHqwGqZBzc';
  PLAN_ID_EA_DE = 'price_germany_id123';
  PUBLIC_API_SERVER = 'http://localhost:4000';
}

/**
 * DEVELOPMENT ENVIRONMENT
 */
if (process.env.ENV === 'dev') {
  DASH_ROOT_DOMAIN = 'dashboard.dev.myhubs.net';
  FXA_PAYMENT_URL = 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net';
  FXA_SERVER = 'accounts.stage.mozaws.net';
  HUB_ROOT_DOMAIN = 'dev.myhubs.net';
  PLAN_ID_EA = 'price_1Jkcl3Kb9q6OnNsLFbECmMtd';
  PRODUCT_ID = 'prod_KPReWHqwGqZBzc';
  PLAN_ID_EA_DE = 'price_1LqkLwKb9q6OnNsLlWHZfPOu';
  PUBLIC_API_SERVER = 'https://dashboard.dev.myhubs.net';
}

/**
 * PRODUCTION ENVIRONMENT
 */
if (process.env.ENV === 'prod' || process.env.ENV === undefined) {
  DASH_ROOT_DOMAIN = 'dashboard.hubs.mozilla.com';
  FXA_PAYMENT_URL = 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net'; //this can't be right for prod
  FXA_SERVER = 'accounts.firefox.com';
  HUB_ROOT_DOMAIN = 'marketing.myhubs.dev'; // will be switched to hubs.mozilla.com on release day
  PLAN_ID_EA = 'price_1Jkcl3Kb9q6OnNsLFbECmMtd'; //same as ^^
  PRODUCT_ID = 'prod_KPReWHqwGqZBzc'; // same as ^
  PLAN_ID_EA_DE = 'price_1LqkLwKb9q6OnNsLlWHZfPOu';
  PUBLIC_API_SERVER = 'http://localhost:4000';
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    DASH_ROOT_DOMAIN: DASH_ROOT_DOMAIN,
    FXA_PAYMENT_URL: FXA_PAYMENT_URL,
    FXA_SERVER: FXA_SERVER,
    HUB_ROOT_DOMAIN: HUB_ROOT_DOMAIN,
    PLAN_ID_EA: PLAN_ID_EA,
    PLAN_ID_EA_DE: PLAN_ID_EA_DE,
    PRODUCT_ID: PRODUCT_ID,
    PUBLIC_API_SERVER: PUBLIC_API_SERVER,
  },
  env: {
    ENV: process.env.ENV,
  },
};

console.log('nextConfig: ', nextConfig);

module.exports = nextConfig;
