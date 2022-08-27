/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // TODO Add other servers
  },
  env: {
    HUB_ROOT_DOMAIN: 'myhubs.net',
    API_SERVER: 'http://localhost:4000',
    AUTH_SERVER_URL: 'https://auth.dev.myhubs.net',
  },
};

module.exports = nextConfig;
