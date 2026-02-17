import { NextConfig } from 'next'

const config: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '684389.myshoptet.com',
      },
      {
        protocol: 'https',
        hostname: 'kailushop.cz',
      },
    ],
  },
};

export default config