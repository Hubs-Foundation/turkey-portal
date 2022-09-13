/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // TODO Add other servers
  },
  serverRuntimeConfig: {
    PUBLIC_API_SERVER: 'http://localhost:4000',
  },
  publicRuntimeConfig: {
    PUBLIC_API_SERVER: process.env.PUBLIC_API_SERVER,
    DUMMY: process.env.dummy,
    AUTH_SERVER: process.env.AUTH_SERVER,
    FXA_SERVER: process.env.FXA_SERVER,
    HUB_ROOT_DOMAIN: process.env.HUB_ROOT_DOMAIN,
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
