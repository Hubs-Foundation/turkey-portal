/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],// TODO Add other servers
  },
  env: {
    NEXT_PUBLIC_HUB_URL: "myhubs.net"
  }
}

module.exports = nextConfig
