"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const isIos = () =>
  typeof navigator !== "undefined" &&
  /iphone|ipad|ipod/i.test(navigator.userAgent);

const isStandalone = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true));

const FooterInstallApp = () => {
  const [installEvent, setInstallEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isStandalone()) return;

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    if (isIos()) {
      setVisible(true);
    }

    if ("serviceWorker" in navigator) {
      void navigator.serviceWorker.register("/sw.js?v=2").catch((error) => {
        console.warn("Service worker registration failed:", error);
      });
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") {
        setVisible(false);
      }
      setInstallEvent(null);
      return;
    }

    if (isIos() && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: SITE_NAME,
          text: "Personalised tutoring in the Zone of Proximal Development",
          url: SITE_URL,
        });
      } catch {
        // User cancelled or share failed silently
      }
    }
  };

  if (!visible) return null;

  return (
    <button
      className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
      type="button"
      onClick={() => void handleInstall()}
    >
      <Download className="h-4 w-4" />
      Install App
    </button>
  );
};

export default FooterInstallApp;
