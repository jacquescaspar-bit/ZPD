import type { NextConfig } from "next";

const GUIDE = "/blog/is-tutoring-the-right-fit";

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
        destination: GUIDE,
        permanent: true,
      },
      // Mangled guide slugs seen in analytics (email-scanner truncations).
      // aXMtdHV0b3 is the start of Base64(is-tutoring-the-right-fit);
      // the regex also catches longer Base64 prefixes of the same slug.
      {
        source: "/blog/:slug(aXMtdHV0b3.*)",
        destination: GUIDE,
        permanent: true,
      },
      { source: "/blog/is-tut", destination: GUIDE, permanent: true },
      { source: "/blog/is-tutoring-th", destination: GUIDE, permanent: true },
      {
        source: "/gqtldnx-yzytwnsl-ymj-wnlmy-kny",
        destination: GUIDE,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
