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
console.log('token', process.env.CONTENTFUL_TOKEN);
console.log('token', process.env.CONTENTFUL_TOKEN - last4);

module.exports = nextConfig;
