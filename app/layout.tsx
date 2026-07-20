import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import DevThemeToggle from "@/components/DevThemeToggle";
import SiteFooter from "@/components/SiteFooter";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "@/globals.css";

const isDev = process.env.NODE_ENV === "development";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const antipasto = localFont({
  src: [
    {
      path: "../public/antipasto/Antipasto_extralight.otf",
      weight: "200",
    },
    {
      path: "../public/antipasto/Antipasto_regular.otf",
      weight: "400",
    },
    {
      path: "../public/antipasto/Antipasto_extrabold.otf",
      weight: "800",
    },
  ],
  variable: "--font-antipasto",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Where Learning Happens`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Personalised tutoring in the Zone of Proximal Development",
  applicationName: SITE_NAME,
  appleWebApp: {
    capable: true,
    title: "ZPD",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Where Learning Happens`,
    description: "Personalised tutoring in the Zone of Proximal Development",
    images: [
      {
        url: "/pwa/icon-512.png",
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Where Learning Happens`,
    description: "Personalised tutoring in the Zone of Proximal Development",
    images: ["/pwa/icon-512.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.ico",
        sizes: "48x48",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.ico",
        sizes: "48x48",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: [
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/pwa/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    suppressHydrationWarning
    className={`${inter.variable} ${antipasto.variable}`}
    dir="ltr"
    lang="en"
  >
    <body className="antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans">
      {isDev ? (
        <Script id="zpd-dev-theme" strategy="beforeInteractive">
          {`(function(){try{var h=location.hostname;if(h!=='localhost'&&h!=='127.0.0.1'&&!h.endsWith('.local'))return;var t=localStorage.getItem('zpd-dev-theme');if(t==='light'||t==='dark'){document.documentElement.dataset.devTheme=t;document.documentElement.style.colorScheme=t;}}catch(e){}})();`}
        </Script>
      ) : null}
      {children}
      <SiteFooter />
      <Analytics />
      {isDev ? <DevThemeToggle /> : null}
    </body>
  </html>
);

export default RootLayout;
