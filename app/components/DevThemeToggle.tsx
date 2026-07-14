"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "zpd-dev-theme";

type DevTheme = "light" | "dark";

const isLocalDevHost = () => {
  const host = window.location.hostname;
  return (
    host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")
  );
};

const applyDevTheme = (theme: DevTheme) => {
  const { documentElement: html } = document;
  html.dataset.devTheme = theme;
  html.style.colorScheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore private browsing / blocked storage
  }
};

const readStoredTheme = (): DevTheme | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

const DevThemeToggle = () => {
  const [theme, setTheme] = useState<DevTheme>("light");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isLocalDevHost()) return;

    setVisible(true);
    const fromDom = document.documentElement.dataset.devTheme;
    const stored = readStoredTheme();
    const initial: DevTheme =
      fromDom === "light" || fromDom === "dark"
        ? fromDom
        : (stored ??
          (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"));
    setTheme(initial);
    if (document.documentElement.dataset.devTheme !== initial) {
      applyDevTheme(initial);
    }
  }, []);

  if (!visible) return null;

  const nextTheme: DevTheme = theme === "light" ? "dark" : "light";

  return (
    <button
      aria-label={`Switch to ${nextTheme} mode`}
      className="fixed bottom-4 right-4 z-[9999] flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/95 px-4 py-2 text-sm font-medium text-stone-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-stone-50 dark:border-stone-600/80 dark:bg-stone-800/95 dark:text-stone-100 dark:hover:bg-stone-700/95"
      title="Dev only — theme override (localhost)"
      type="button"
      onClick={() => {
        setTheme(nextTheme);
        applyDevTheme(nextTheme);
      }}
    >
      <span aria-hidden>{theme === "light" ? "🌙" : "☀️"}</span>
      <span>{theme === "light" ? "Dark" : "Light"}</span>
      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-900/60 dark:text-blue-200">
        Dev
      </span>
    </button>
  );
};

export default DevThemeToggle;
