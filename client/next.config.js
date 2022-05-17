/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],// TODO Add other servers
  },
  env: {
    DOMAIN: "myhubs.net"
  }
}

module.exports = nextConfig
