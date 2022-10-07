/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    AUTH_SERVER: process.env.AUTH_SERVER,
    FXA_SERVER: process.env.FXA_SERVER,
    HUB_ROOT_DOMAIN: process.env.HUB_ROOT_DOMAIN,
    FXA_PAYMENT_URL: process.env.FXA_PAYMENT_URL,
    DASH_ROOT_DOMAIN: process.env.DASH_ROOT_DOMAIN,
    PRODUCT_ID: process.env.PRODUCT_ID,
    PLAN_ID_EA: process.env.PLAN_ID_EA,
  },
};


console.log("process.env.AUTH_SERVER: ", process.env.AUTH_SERVER)
console.log("process.env.FXA_SERVER: ", process.env.FXA_SERVER)
console.log("process.env.HUB_ROOT_DOMAIN: ", process.env.HUB_ROOT_DOMAIN)
console.log("process.env.FXA_PAYMENT_URL: ", process.env.FXA_PAYMENT_URL)
console.log("process.env.DASH_ROOT_DOMAIN: ", process.env.DASH_ROOT_DOMAIN)
console.log("process.env.PRODUCT_ID: ", process.env.PRODUCT_ID)
console.log("process.env.PLAN_ID_EA: ", process.env.PLAN_ID_EA)

console.log("nextConfig: ", nextConfig)

module.exports = nextConfig;
