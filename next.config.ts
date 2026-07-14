import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  allowedDevOrigins: ["192.168.1.109"],
  async redirects() {
    return [
      { source: "/privacy", destination: "/legal#privacy", permanent: true },
      { source: "/terms", destination: "/legal#terms", permanent: true },
      {
        source: "/refund-policy",
        destination: "/legal#refund",
        permanent: true,
      },
      {
        source: "/child-protection",
        destination: "/legal#child",
        permanent: true,
      },
      {
        source: "/guides/parents-guide-to-zpd",
        destination: "/blog/is-tutoring-the-right-fit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
