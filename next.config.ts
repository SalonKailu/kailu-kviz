import { NextConfig } from 'next'

const config: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['684389.myshoptet.com', 'kailushop.cz'], // Povolení domény obrázků
  },
};

export default config