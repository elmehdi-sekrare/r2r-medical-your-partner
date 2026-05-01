import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const KEY = "r2r.theme";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(KEY);
  if (stored === "dark") return "dark";
  if (stored === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function DarkModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
      className="inline-grid h-9 w-9 place-items-center rounded-full border border-border bg-card hover:text-primary sm:h-10 sm:w-10"
      aria-label={theme === "light" ? "Mode sombre" : "Mode clair"}
      title={theme === "light" ? "Mode sombre" : "Mode clair"}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
