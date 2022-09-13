/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // TODO Add other servers
  },
  serverRuntimeConfig: {
    API_SERVER: 'http://localhost:4000',
  },
  publicRuntimeConfig: {
    API_SERVER: process.env.PUBLIC_API_SERVER,
    AUTH_SERVER_URL: process.env.AUTH_SERVER_URL,
    PUBLIC_API_SERVER: process.env.PUBLIC_API_SERVER,
    HUB_ROOT_DOMAIN: process.env.HUB_ROOT_DOMAIN,
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
