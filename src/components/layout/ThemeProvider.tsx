"use client";

import * as React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "devfolio-theme";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (nextTheme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
);

const themeListeners = new Set<() => void>();

function emitThemeChange() {
  for (const listener of themeListeners) {
    listener();
  }
}

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);

  if (typeof window === "undefined") {
    return () => {
      themeListeners.delete(callback);
    };
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === THEME_STORAGE_KEY) {
      callback();
    }
  };

  mediaQuery.addEventListener("change", callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    themeListeners.delete(callback);
    mediaQuery.removeEventListener("change", callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readStoredTheme(defaultTheme: Theme): Theme {
  if (typeof window === "undefined") {
    return defaultTheme;
  }
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") {
      return raw;
    }
  } catch {
    // Ignore storage read failures in restricted browser environments
  }
  return defaultTheme;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

function applyDocumentTheme(theme: Theme) {
  if (typeof document === "undefined") {
    return;
  }
  const root = document.documentElement;
  if (theme === "system") {
    if ("theme" in root.dataset) {
      delete root.dataset.theme;
    }
  } else if (root.dataset.theme !== theme) {
    root.dataset.theme = theme;
  }

  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="color-scheme"]'
  );
  const expectedColorScheme = theme === "system" ? "light dark" : theme;
  if (meta && meta.content !== expectedColorScheme) {
    meta.content = expectedColorScheme;
  }
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  const theme = React.useSyncExternalStore<Theme>(
    subscribeTheme,
    () => readStoredTheme(defaultTheme),
    () => defaultTheme
  );

  const systemTheme = React.useSyncExternalStore<ResolvedTheme>(
    subscribeTheme,
    getSystemTheme,
    () => "light"
  );

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemTheme : theme;

  // Sync data-theme synchronously in React's commit phase before browser paint.
  // When [locale] switches (/en <-> /es), Next.js reconciles <html lang={locale}>
  // without data-theme; running in useLayoutEffect restores data-theme in the same
  // commit tick so zero opposite-theme frames are ever painted.
  useIsomorphicLayoutEffect(() => {
    applyDocumentTheme(theme);
  });

  const setTheme = React.useCallback((nextTheme: Theme) => {
    try {
      if (nextTheme === "system") {
        window.localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      }
    } catch {
      // Ignore storage write errors in restricted browser environments
    }
    applyDocumentTheme(nextTheme);
    emitThemeChange();
  }, []);

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
