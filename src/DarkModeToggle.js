"use client";

import React from "react";
import { useDarkMode } from "./useDarkMode.js";

export function DarkModeToggle({ fixed = true, style = {}, className = "" }) {
  const { enabled, setEnabled } = useDarkMode();

  const baseStyle = {
    position: fixed ? "fixed" : "relative",
    bottom: fixed ? "30px" : "auto",
    right: fixed ? "30px" : "auto",
    width: "64px",
    height: "32px",
    borderRadius: "20px",
    border: "1px solid " + (enabled ? "#333" : "#ddd"),
    cursor: "pointer",
    zIndex: 9999,
    background: enabled ? "#222" : "#fff",
    display: "flex",
    alignItems: "center",
    padding: "2px",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: enabled
      ? "0 4px 15px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3)"
      : "0 4px 15px rgba(0,0,0,0.08)",
    outline: "none",
    ...style
  };

  return React.createElement(
    "button",
    {
      onClick: () => setEnabled(!enabled),
      style: baseStyle,
      className: className,
      "aria-label": "Toggle dark mode"
    },
    // The "Track" icon
    React.createElement("div", {
      style: {
        position: "absolute",
        left: "6px",
        fontSize: "12px",
        opacity: enabled ? 0 : 1,
        transition: "opacity 0.3s",
        pointerEvents: "none"
      }
    }, "☀️"),
    React.createElement("div", {
      style: {
        position: "absolute",
        right: "6px",
        fontSize: "12px",
        opacity: enabled ? 1 : 0,
        transition: "opacity 0.3s",
        pointerEvents: "none"
      }
    }, "🌙"),
    // The Sliding Knob
    React.createElement("div", {
      style: {
        width: "26px",
        height: "26px",
        borderRadius: "50%",
        background: enabled
          ? "linear-gradient(145deg, #4da3ff, #007bff)"
          : "linear-gradient(145deg, #ffffff, #f0f0f0)",
        transform: enabled ? "translateX(32px)" : "translateX(0px)",
        transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2
      }
    })
  );
}
