import { createContext, useCallback, useContext, useEffect, useState } from "react";

/* Two themes: "dark" is Night (navy, fireflies) and "light" is Day (misty pine forest,
   dewdrops). The theme lives on <html data-theme>. An inline script in index.html sets it
   before first paint from the saved choice or the system setting, so there is no flash. */
const KEY = "theme";
const ThemeContext = createContext({ theme: "dark", setTheme: () => {} });
const read = () => (typeof document === "undefined" ? "dark" : document.documentElement.dataset.theme || "dark");

export function ThemeProvider({ children }) {
  const [theme, set] = useState(read);

  const setTheme = useCallback((next) => {
    const html = document.documentElement;
    // fade colors between themes, only while switching
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      html.classList.add("theme-fade");
      setTimeout(() => html.classList.remove("theme-fade"), 700);
    }
    html.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
    set(next);
  }, []);

  // follow the system setting until the visitor picks a theme themselves
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const on = () => {
      let saved = null;
      try {
        saved = localStorage.getItem(KEY);
      } catch {
        /* ignore */
      }
      if (saved) return;
      const next = mq.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      set(next);
    };
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);

const OPTIONS = [
  {
    id: "dark",
    label: "Night",
    hint: "Night: fireflies in the dark",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
        <circle cx="18.5" cy="5.5" r="1.6" fill="#F5D93B" />
      </svg>
    ),
  },
  {
    id: "light",
    label: "Day",
    hint: "Day: a misty forest with dewdrops",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15Z" fill="currentColor" />
        <path d="M5 19 13 11" stroke="var(--toggle-vein)" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="17" cy="16.5" r="2.2" fill="#E6F1F5" stroke="#9FB3BC" strokeWidth=".8" />
      </svg>
    ),
  },
];

/* Segmented Night / Day switch in the header. Both options are always visible so people
   can see there are two themes. */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="theme-toggle" role="group" aria-label="Theme">
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          className={theme === o.id ? "on" : undefined}
          aria-pressed={theme === o.id}
          title={o.hint}
          onClick={() => theme !== o.id && setTheme(o.id)}
        >
          {o.icon}
          <span>{o.label}</span>
        </button>
      ))}
    </div>
  );
}
