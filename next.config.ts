import path from 'path'; // Add this import
import type { NextConfig } from 'next';

let baseUrl = 'https://cdn.visitca.uz/dinelink/';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  /* config options here */
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
  // productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.visitca.uz',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 86400,
  },
  env: {
    BASE_URL: baseUrl,
  },
};

export default nextConfig;
