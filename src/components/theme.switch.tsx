"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to handle "system" theme
  const isDark = resolvedTheme === "dark";

  const handleThemeToggle = useCallback(
    (e?: React.MouseEvent) => {
      const newMode = isDark ? "light" : "dark";
      const root = document.documentElement;

      // Set coordinates for the view transition animation
      if (e) {
        root.style.setProperty("--x", `${e.clientX}px`);
        root.style.setProperty("--y", `${e.clientY}px`);
      }

      // Start the view transition
      document.startViewTransition(() => {
        setTheme(newMode);
      });
    },
    [isDark, setTheme]
  );

  // Return null until mounted to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      className="hover:bg-muted transition-colors duration-200"
      onClick={handleThemeToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-6 w-6 text-foreground" />
      ) : (
        <Moon className="h-6 w-6 text-foreground" />
      )}
    </Button>
  );
};

export default ThemeChanger;
