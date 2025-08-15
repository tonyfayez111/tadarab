import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remove the domains array and use only remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging-api.tadarab.com',
        port: '',
        pathname: '/rails/active_storage/**',
      },
      {
        protocol: 'https',
        hostname: 's3.me-south-1.amazonaws.com',
        port: '',
        pathname: '/tadarab2.0-bahrain/**',
      },
    ],
  },
};

export default nextConfig;