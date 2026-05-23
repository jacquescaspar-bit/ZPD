import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Minimal config for stability - no experimental features
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: ["192.168.1.109"],
  async redirects() {
    return [
      { source: '/privacy', destination: '/legal#privacy', permanent: true },
      { source: '/terms', destination: '/legal#terms', permanent: true },
      { source: '/refund-policy', destination: '/legal#refund', permanent: true },
      { source: '/child-protection', destination: '/legal#child', permanent: true },
    ];
  },
};

export default nextConfig;
