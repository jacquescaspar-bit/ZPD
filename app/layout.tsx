import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import SiteFooter from "@/components/SiteFooter";
import "@/globals.css";

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

export const metadata: Metadata = {
  title: "Where Learning Happens",
  description: "Personalised tutoring in the Zone of Proximal Development",
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
      { url: "/favicon.ico", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.ico", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html
    className={`${inter.variable} ${antipasto.variable}`}
    dir="ltr"
    lang="en"
  >
    <body className="antialiased bg-[var(--background)] text-[var(--foreground)] min-h-screen font-sans">
      {children}
      <SiteFooter />
    </body>
  </html>
);

export default RootLayout;
