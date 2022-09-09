/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // TODO Add other servers
  },
  env: {
    HUB_ROOT_DOMAIN: process.env.HUB_ROOT_DOMAIN,
  },
  serverRuntimeConfig: {
    API_SERVER: 'http://localhost:4000',
  },
  publicRuntimeConfig: {
    API_SERVER: process.env.PUBLIC_API_SERVER,
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
