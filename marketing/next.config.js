/** @type {import('next').NextConfig} */

// TODO: process.env files on the cluster are currently not working in this file. For now we are going
// to hardcode the env variables to production vars.
if (process.env.ENV === 'dev') {
  FXA_SERVER = process.env.FXA_SERVER;
  AUTH_SERVER = process.env.AUTH_SERVER;
  HUB_ROOT_DOMAIN = process.env.HUB_ROOT_DOMAIN;
  DASH_ROOT_DOMAIN = process.env.DASH_ROOT_DOMAIN;
  FXA_PAYMENT_URL = process.env.FXA_PAYMENT_URL;
  PRODUCT_ID = process.env.PRODUCT_ID;
  PLAN_ID_EA = process.env.PLAN_ID_EA;
} else {
  FXA_SERVER = 'accounts.stage.mozaws.net';
  AUTH_SERVER = 'auth.dev.myhubs.net';
  HUB_ROOT_DOMAIN = 'dev.myhubs.net';
  DASH_ROOT_DOMAIN = 'dashboard.dev.myhubs.net';
  FXA_PAYMENT_URL = 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net';
  PRODUCT_ID = 'prod_KPReWHqwGqZBzc';
  PLAN_ID_EA = 'price_1Jkcl3Kb9q6OnNsLFbECmMtd';
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    AUTH_SERVER: AUTH_SERVER,
    FXA_SERVER: FXA_SERVER,
    HUB_ROOT_DOMAIN: HUB_ROOT_DOMAIN,
    FXA_PAYMENT_URL: FXA_PAYMENT_URL,
    DASH_ROOT_DOMAIN: DASH_ROOT_DOMAIN,
    PRODUCT_ID: PRODUCT_ID,
    PLAN_ID_EA: PLAN_ID_EA,
  },
};

console.log('nextConfig: ', nextConfig);

module.exports = nextConfig;
module.exports = {
  env: {
    ENV: process.env.ENV,
  },
}