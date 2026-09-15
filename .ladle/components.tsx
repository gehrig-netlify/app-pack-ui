import type { GlobalProvider } from "@ladle/react";
import * as React from "react";
import "./globals.css";
import "../src/styles.css";

// Ladle's own dark-mode toggle only flips its outer app shell — each story
// renders in its own same-origin iframe that never sees that state. This is
// a self-contained override (independent of the OS `prefers-color-scheme`
// default in globals.css) so dark mode can be previewed on demand.
const STORAGE_KEY = "app-pack-ui-ladle-theme";

type ThemeOverride = "light" | "dark" | null;

function readStoredTheme(): ThemeOverride {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: ThemeOverride) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  if (theme) root.classList.add(theme);
}

export const Provider: GlobalProvider = ({ children }) => {
  const [theme, setTheme] = React.useState<ThemeOverride>(readStoredTheme);

  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = () => {
    const isDark = document.documentElement.classList.contains("dark");
    const usesDarkMedia = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentlyDark = isDark || (theme === null && usesDarkMedia);
    const next: ThemeOverride = currentlyDark ? "light" : "dark";
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private browsing, etc.)
    }
    setTheme(next);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggle}
        style={{
          position: "fixed",
          top: 8,
          right: 8,
          zIndex: 9999,
          padding: "6px 10px",
          borderRadius: 6,
          border: "1px solid var(--border)",
          background: "var(--background)",
          color: "var(--foreground)",
          fontSize: 12,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          cursor: "pointer",
        }}
      >
        Toggle theme
      </button>
      {children}
    </>
  );
};
