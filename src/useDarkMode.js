"use client";

import { useContext } from "react";
import { DarkModeContext } from "./DarkModeProvider.js";

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) {
    throw new Error(
      "useDarkMode must be used inside DarkModeProvider"
    );
  }
  return ctx;
}
