/** @type {import('next').NextConfig} */

if (process.env.ENV == "prod"){
  FXA_SERVER="TBD111"
  AUTH_SERVER="TBD222"
  HUB_ROOT_DOMAIN="TBD333"
  DASH_ROOT_DOMAIN="TBD444"
  FXA_PAYMENT_URL="TBD555"
  PRODUCT_ID="TBD666"
  PLAN_ID_EA="TBD777"
}else{
  FXA_SERVER="accounts.firefox.com"
  AUTH_SERVER="auth.myhubs.net"
  HUB_ROOT_DOMAIN="dev.myhubs.net"
  DASH_ROOT_DOMAIN="dashboard.dev.myhubs.net"
  FXA_PAYMENT_URL="https://payments-stage.fxa.nonprod.cloudops.mozgcp.net"
  PRODUCT_ID="prod_KPReWHqwGqZBzc"
  PLAN_ID_EA="price_1Jkcl3Kb9q6OnNsLFbECmMtd"
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

console.log("nextConfig: ", nextConfig)

module.exports = nextConfig;
