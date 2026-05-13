import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'theme';
const ThemeContext = createContext(null);

function getSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyClass(resolved) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolved);
}

/**
 * Provides theme state ('light' | 'dark' | 'system') to the tree.
 *
 * Drop-in for next-themes' <ThemeProvider attribute="class" defaultTheme="system" enableSystem>.
 * Persists the user's choice in localStorage under "theme", reads system
 * preference via matchMedia, applies the resolved theme as a class on <html>,
 * and listens for OS-level theme changes when the user is on "system".
 *
 * The script in index.html prevents FOUC by applying the class before React
 * mounts; this provider keeps state in sync after mount.
 *
 * @component
 */
export function ThemeProvider({ children, defaultTheme = 'system' }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return defaultTheme;
    return localStorage.getItem(STORAGE_KEY) || defaultTheme;
  });
  const [systemTheme, setSystemTheme] = useState(getSystemTheme);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    applyClass(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setSystemTheme(e.matches ? 'dark' : 'light');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be unavailable (e.g. private mode) — ignore
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme, systemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Read theme state from the nearest ThemeProvider.
 *
 * @returns {{ theme: string, setTheme: (t: string) => void, resolvedTheme: string, systemTheme: string }}
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return { theme: 'system', setTheme: () => {}, resolvedTheme: 'light', systemTheme: 'light' };
  }
  return ctx;
}
