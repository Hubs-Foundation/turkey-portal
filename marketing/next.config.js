/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    AUTH_SERVER: process.env.NEXT_PUBLIC_AUTH_SERVER,
    DASH_ROOT_DOMAIN: process.env.DASH_ROOT_DOMAIN,
    FXA_PAYMENT_URL: process.env.NEXT_PUBLIC_FXA_PAYMENT_URL,
    FXA_SERVER: process.env.NEXT_PUBLIC_FXA_SERVER,
    HUB_ROOT_DOMAIN: process.env.NEXT_PUBLIC_HUB_ROOT_DOMAIN,
    PLAN_ID_EA: process.env.NEXT_PUBLIC_PLAN_ID_EA,
    PRODUCT_ID: process.env.NEXT_PUBLIC_PRODUCT_ID,
  },
};

module.exports = nextConfig;
