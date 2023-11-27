/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = {
  ...withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  }),
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/page',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
}

module.exports = nextConfig