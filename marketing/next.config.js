/** @type {import('next').NextConfig} */

// TODO: process.env files are currently not working in this file. For now we are going
// to hardcode the env variables to production vars. Change this file for local testing.
FXA_SERVER = 'accounts.firefox.com';
AUTH_SERVER = 'auth.dev.myhubs.net';
HUB_ROOT_DOMAIN = 'dev.myhubs.net';
DASH_ROOT_DOMAIN = 'dashboard.dev.myhubs.net';
FXA_PAYMENT_URL = 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net';
PRODUCT_ID = 'prod_KPReWHqwGqZBzc';
PLAN_ID_EA = 'price_1Jkcl3Kb9q6OnNsLFbECmMtd';

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
