import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type Theme = 'dark' | 'light';
const storageKey = 'judyzhu-theme'; // Keep in sync with the pre-paint script in index.html.
const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void } | null>(null);

function syncBrowserColor() {
  const color = getComputedStyle(document.documentElement).getPropertyValue('--color-page').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

  function applyTheme(next: Theme) {
    // Update tokens before React renders readers such as the design system page.
    document.documentElement.dataset.theme = next;
    syncBrowserColor();
    setTheme(next);
  }

  useEffect(() => {
    syncBrowserColor();
    function onStorage(event: StorageEvent) {
      if (event.storageArea === window.localStorage && (event.key === storageKey || event.key === null)) {
        applyTheme(event.newValue === 'light' ? 'light' : 'dark');
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { window.localStorage.setItem(storageKey, next); } catch { /* The current visit still works without storage. */ }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme requires ThemeProvider');
  return context;
}
