"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
  useLayoutEffect(() => {
    try {
      const savedTheme = localStorage.getItem("booknook-theme");
      const selectedTheme = savedTheme === "light" ? "light" : "dark";

      applyTheme(selectedTheme);
    } catch {
      applyTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    try {
      localStorage.setItem("booknook-theme", nextTheme);
    } catch {
      // The theme still changes for this visit when storage is unavailable.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title="Switch between light and dark mode"
      className="flex size-9 shrink-0 items-center justify-center rounded-full text-book-muted transition hover:bg-book-hover hover:text-book-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-book-accent"
    >
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </button>
  );
}
