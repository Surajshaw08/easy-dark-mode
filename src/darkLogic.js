// darkLogic.js

import { hexToRgb, rgbToHex, rgbToHsl, hslToCss, getLuminance, clamp } from "./colorUtils.js";

const DARK_TEXT_COLOR = "#EDEDED"; // Standard light text for dark mode
const MUTED_TEXT_COLOR = "#AFAFAF"; // Standard muted text for dark mode

const DARK_MODE_MAP = {
  // Whites & Neutrals (Backgrounds)
  "#FFFFFF": "#0F0F0F",
  "#FAFAFA": "#121212",
  "#F5F5F5": "#1A1A1A",
  "#EEEEEE": "#222222",
  "#E0E0E0": "#2A2A2A",
  "#CCCCCC": "#3A3A3A",
  "#999999": "#666666",

  // Primary Colors (Brighten)
  "#FF0000": "#FF4D4D",
  "#007BFF": "#4DA3FF",
  "#28A745": "#4ADE80",
  "#FFC107": "#FFD54F",
  "#6F42C1": "#A78BFA",
};

export function smartDarkTransform(r, g, b, role) {
  const hex = rgbToHex(r, g, b);

  // 1. Background Logic
  if (role === "background") {
    if (DARK_MODE_MAP[hex]) return DARK_MODE_MAP[hex];
    const { h, s, l } = rgbToHsl(r, g, b);
    // If it's light, make it dark
    if (l > 0.5) {
      return hslToCss(h, s * 0.7, clamp(1 - l, 0.05, 0.25));
    }
    return null; // Already dark
  }

  // 2. Text Logic (Treat all text uniformly)
  if (role === "text") {
    const { h, s, l } = rgbToHsl(r, g, b);

    // If text is saturated (like a blue link or red error), keep hue but ensure brightness
    if (s > 0.3) {
      return hslToCss(h, s, clamp(l + 0.2, 0.6, 0.9));
    }

    // For neutral text (black, grey, etc.)
    // If it's dark text (L < 0.7), make it consistent light color
    if (l < 0.7) {
      // If it's very dark (near black), use primary light text
      if (l < 0.3) return DARK_TEXT_COLOR;
      // If it's grey/muted, use muted light text
      return MUTED_TEXT_COLOR;
    }

    // If it's already light text (L >= 0.7), it's probably already dark-mode ready
    return null;
  }

  return null;
}
