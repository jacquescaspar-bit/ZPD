import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: SITE_NAME,
    short_name: "ZPD",
    description:
      "Personalised tutoring in the Zone of Proximal Development. Enrol, complete onboarding, and manage your child's learning journey.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#FFFFFF",
    theme_color: "#2563EB",
    categories: ["education", "productivity"],
    lang: "en-AU",
    dir: "ltr",
    icons: [
      {
        src: "/pwa/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/pwa/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        form_factor: "narrow",
        label: `${SITE_NAME} home`,
      },
    ],
    related_applications: [],
    prefer_related_applications: false,
    shortcuts: [
      {
        name: "Enrol",
        short_name: "Enrol",
        url: "/enrol",
        description: "Start or continue enrolment",
      },
      {
        name: "Contact",
        short_name: "Contact",
        url: "/contact",
        description: "Get in touch with ZPD Learning",
      },
    ],
  };
}
