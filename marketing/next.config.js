/** @type {import('next').NextConfig} */

var _FXA_SERVER = 'DUMMY';
var _AUTH_SERVER = 'DUMMY';
var _HUB_ROOT_DOMAIN = 'DUMMY';
var _DASH_ROOT_DOMAIN = 'DUMMY';
var _FXA_PAYMENT_URL = 'DUMMY';
var _PRODUCT_ID = 'DUMMY';
var _PLAN_ID_EA = 'DUMMY';

if (process.env.ENV == 'prod') {
  _FXA_SERVER = 'TBD111';
  _AUTH_SERVER = 'TBD222';
  _HUB_ROOT_DOMAIN = 'TBD333';
  _DASH_ROOT_DOMAIN = 'TBD444';
  _FXA_PAYMENT_URL = 'TBD555';
  _PRODUCT_ID = 'TBD666';
  _PLAN_ID_EA = 'TBD777';
} else {
  _FXA_SERVER = 'accounts.firefox.com';
  _AUTH_SERVER = 'auth.myhubs.net';
  _HUB_ROOT_DOMAIN = 'dev.myhubs.net';
  _DASH_ROOT_DOMAIN = 'dashboard.dev.myhubs.net';
  _FXA_PAYMENT_URL = 'https://payments-stage.fxa.nonprod.cloudops.mozgcp.net';
  _PRODUCT_ID = 'prod_KPReWHqwGqZBzc';
  _PLAN_ID_EA = 'price_1Jkcl3Kb9q6OnNsLFbECmMtd';
}


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    AUTH_SERVER: _AUTH_SERVER,
    FXA_SERVER: _FXA_SERVER,
    HUB_ROOT_DOMAIN: _HUB_ROOT_DOMAIN,
    FXA_PAYMENT_URL: _FXA_PAYMENT_URL,
    DASH_ROOT_DOMAIN: _DASH_ROOT_DOMAIN,
    PRODUCT_ID: _PRODUCT_ID,
    PLAN_ID_EA: _PLAN_ID_EA,
  },
};

console.log('nextConfig: ', nextConfig);


module.exports = nextConfig;
