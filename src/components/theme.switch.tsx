"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

const ThemeChanger = ({ activeColor = "text-primary" }) => {
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

  if (!mounted) return null;

  return (
    <motion.button
      variants={buttonVariants}
      initial={false}
      animate="animate"
      onClick={handleThemeToggle}
      transition={transition}
      className="relative flex items-center rounded-xl px-4 py-2 text-sm font-medium transition-colors duration-300 text-muted-foreground hover:bg-muted hover:text-foreground"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <IoMdSunny className="h-6 w-6 text-foreground" />
      ) : (
        <IoMdMoon className="h-6 w-6 text-foreground" />
      )}
    </motion.button>
  );
};

export default ThemeChanger;
