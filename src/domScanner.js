// domScanner.js

import {
  hexToRgb,
  rgbStringToRgb
} from "./colorUtils.js";
import { smartDarkTransform } from "./darkLogic.js";

let observer = null;
let isDark = false;

function scanElement(el) {
  if (!el || el.nodeType !== 1) return;

  const tagName = el.tagName.toLowerCase();
  if (tagName === 'script' || tagName === 'style' || tagName === 'link') return;

  const styles = getComputedStyle(el);

  // We want to force a check on every element that contains text content
  const colorProps = [
    { name: "color", role: "text" },
    { name: "backgroundColor", role: "background" },
    { name: "borderTopColor", role: "background" },
    { name: "borderRightColor", role: "background" },
    { name: "borderBottomColor", role: "background" },
    { name: "borderLeftColor", role: "background" }
  ];

  colorProps.forEach(prop => {
    let value = styles[prop.name];
    if (!value || value === "transparent" || value === "rgba(0, 0, 0, 0)") return;

    const originalAttr = `data-orig-${prop.name}`;
    let originalValue = el.getAttribute(originalAttr);

    if (isDark) {
      if (!originalValue) {
        el.setAttribute(originalAttr, value);
        originalValue = value;
      }

      let rgb = null;
      if (originalValue.startsWith("#")) {
        rgb = hexToRgb(originalValue);
      } else if (originalValue.startsWith("rgb")) {
        rgb = rgbStringToRgb(originalValue);
      }

      if (rgb) {
        // Uniform text treatment: smartDarkTransform now handles all text variations
        const newColor = smartDarkTransform(rgb.r, rgb.g, rgb.b, prop.role);
        if (newColor && el.style[prop.name] !== newColor) {
          el.style[prop.name] = newColor;
        }
      }
    } else {
      if (originalValue) {
        el.style[prop.name] = originalValue;
        el.removeAttribute(originalAttr);
      }
    }
  });

  // Media
  if (tagName === 'img' || tagName === 'video') {
    el.style.filter = isDark ? "brightness(0.85) contrast(1.1)" : "";
  }
}

export function applyDarkMode() {
  if (typeof document === "undefined") return;
  isDark = true;

  if (!document.getElementById('easy-dark-styles')) {
    const style = document.createElement('style');
    style.id = 'easy-dark-styles';
    style.innerHTML = `
      :root {
        --edm-bg: #0F0F0F;
        --edm-text: #EDEDED;
        --edm-input-bg: #1A1A1A;
        --edm-input-border: #333;
        --edm-input-text: #EDEDED;
        --edm-input-focus: #007BFF;
      }

      [data-easy-dark="on"] body { 
        background-color: var(--edm-bg) !important; 
        color: var(--edm-text) !important; 
      }
      
      * { transition: background-color 0.2s ease, color 0.15s ease !important; }
      
      /* Placeholder styling for Dark Mode */
      [data-easy-dark="on"] input::placeholder,
      [data-easy-dark="on"] textarea::placeholder {
        color: var(--edm-text) !important;
        opacity: 0.7 !important;
      }
      
      /* Force border visibility and background for inputs */
      [data-easy-dark="on"] input, 
      [data-easy-dark="on"] textarea, 
      [data-easy-dark="on"] select {
        background-color: var(--edm-input-bg) !important;
        color: var(--edm-input-text) !important;
        border: 1px solid var(--edm-input-border) !important;
      }

      [data-easy-dark="on"] input:focus, 
      [data-easy-dark="on"] textarea:focus {
        border-color: var(--edm-input-focus) !important;
        outline: none;
      }
    `;
    document.head.appendChild(style);
  }

  // Scan everything
  const allElements = document.getElementsByTagName('*');
  for (let i = 0; i < allElements.length; i++) {
    scanElement(allElements[i]);
  }

  if (observer) observer.disconnect();

  observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          scanElement(node);
          const children = node.getElementsByTagName('*');
          for (let j = 0; j < children.length; j++) {
            scanElement(children[j]);
          }
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

export function removeDarkMode() {
  if (typeof document === "undefined") return;
  isDark = false;

  if (observer) {
    observer.disconnect();
    observer = null;
  }

  const styleTag = document.getElementById('easy-dark-styles');
  if (styleTag) styleTag.remove();

  const elements = document.querySelectorAll(
    "[data-orig-color], [data-orig-backgroundColor], [data-orig-borderTopColor], [data-orig-borderRightColor], [data-orig-borderBottomColor], [data-orig-borderLeftColor]"
  );
  elements.forEach(el => scanElement(el));
}
