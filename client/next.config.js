/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost:4000'], // TODO Add other servers
  },
  serverRuntimeConfig: {
    PUBLIC_API_SERVER: 'http://localhost:4000',
  },
  publicRuntimeConfig: {
    AUTH_SERVER: process.env.AUTH_SERVER,
    DUMMY: process.env.dummy,
    FXA_SERVER: process.env.FXA_SERVER,
    HUB_ROOT_DOMAIN: process.env.HUB_ROOT_DOMAIN,
    PUBLIC_API_SERVER: process.env.PUBLIC_API_SERVER,
    PUBLIC_DASH_ROOT_DOMAIN: process.env.PUBLIC_DASH_ROOT_DOMAIN,
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
