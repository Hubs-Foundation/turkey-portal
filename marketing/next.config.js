/** @type {import('next').NextConfig} */

// TODO: process.env files on the cluster are currently not working in this file. For now we are going
// to hardcode the env variables to production vars.
if (process.env.ENV === 'dev') {
  DASH_ROOT_DOMAIN = 'dashboard.dev.myhubs.net';
  FXA_PAYMENT_URL = 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net';
  FXA_SERVER = 'accounts.stage.mozaws.net';
  HUB_ROOT_DOMAIN = 'dev.myhubs.net';
  PLAN_ID_EA = 'price_1Jkcl3Kb9q6OnNsLFbECmMtd';
  PRODUCT_ID = 'prod_KPReWHqwGqZBzc';
} else {
  DASH_ROOT_DOMAIN = 'dashboard.hubs.mozilla.com';
  FXA_PAYMENT_URL = 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net'; //this can't be right for prod
  FXA_SERVER = 'accounts.firefox.com';
  HUB_ROOT_DOMAIN = 'marketing.myhubs.dev'; // will be swithced to hubs.mozilla.com on release day
  PLAN_ID_EA = 'price_1Jkcl3Kb9q6OnNsLFbECmMtd'; //same as ^^
  PRODUCT_ID = 'prod_KPReWHqwGqZBzc'; // same as ^
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
    PRODUCT_ID: PRODUCT_ID,
  },
  env: {
    ENV: process.env.ENV,
  },
};

console.log('nextConfig: ', nextConfig);

module.exports = nextConfig;
