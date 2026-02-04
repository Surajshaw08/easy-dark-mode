"use client";

import React, { createContext, useEffect, useState } from "react";
import { applyDarkMode, removeDarkMode } from "./domScanner.js";

export const DarkModeContext = createContext(null);

export function DarkModeProvider({ children }) {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("easy-dark-mode-enabled");
    if (saved === "true") {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return;
    const root = document.documentElement;

    localStorage.setItem("easy-dark-mode-enabled", enabled);

    if (enabled) {
      root.setAttribute("data-easy-dark", "on");
      const timer = setTimeout(() => {
        applyDarkMode();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      root.removeAttribute("data-easy-dark");
      removeDarkMode();
    }
  }, [enabled, mounted]);

  return React.createElement(
    DarkModeContext.Provider,
    { value: { enabled, setEnabled } },
    children
  );
}
