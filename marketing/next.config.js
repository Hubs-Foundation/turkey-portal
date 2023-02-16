/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.ctfassets.net'],
  },
  swcMinify: true,
  env: {
    ENV: process.env.ENV,
  },
};

console.log('nextConfig: ', nextConfig);

module.exports = nextConfig;
