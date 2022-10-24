/** @type {import('next').NextConfig} */
const serverHostname = process.env.SERVER_HOSTNAME || 'localhost';
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [`${serverHostname}:4000`], // TODO Add other servers
  },
  optimizeFonts: false,
  serverRuntimeConfig: {
    PUBLIC_API_SERVER: `http://${serverHostname}:4000`,
  },
  publicRuntimeConfig: {
    AUTH_SERVER: process.env.AUTH_SERVER,
    DASH_ROOT_DOMAIN: process.env.DASH_ROOT_DOMAIN,
    DUMMY: process.env.dummy,
    FXA_PAYMENT_URL: process.env.FXA_PAYMENT_URL,
    FXA_SERVER: process.env.FXA_SERVER,
    HUB_ROOT_DOMAIN: process.env.HUB_ROOT_DOMAIN,
    MARKETING_PAGE_URL: process.env.MARKETING_PAGE_URL,
    PLAN_ID_EA: process.env.PLAN_ID_EA,
    PLAN_ID_EA_DE: process.env.PLAN_ID_EA_DE,
    PRODUCT_ID: process.env.PRODUCT_ID,
    PUBLIC_API_SERVER: process.env.PUBLIC_API_SERVER,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
