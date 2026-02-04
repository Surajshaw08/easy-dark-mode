# 🌙 Easy Dark Mode (React & Next.js)

**Made by [Suraj](https://www.linkedin.com/in/surajkrshaw08/)**

Easy Dark Mode is a plug-and-play dark mode solution for React and Next.js that automatically converts your entire website to dark mode without writing manual CSS.

It intelligently detects existing colors and transforms them into an optimized dark theme while preserving usability, contrast, and accessibility.

## ✨ Features

- **⚡ One-Click Dark Mode Toggle**: Smooth and instant theme switching.
- **🎨 Smart Color Conversion**: Automatically adjusts backgrounds, text, borders, inputs, and UI elements.
- **🔄 Dynamic DOM Support**: Uses `MutationObserver` to handle dynamically added elements.
- **💾 Persistent User Preference**: Stores theme preference in `localStorage`.
- **🖼️ Media Adjustment**: Automatically optimizes brightness and contrast for images and videos.
- **🛠️ Fully Customizable**: Override default dark colors using CSS variables.
- **🚀 Framework Ready**: Optimized for React and Next.js (App Router).

## 📦 Installation

```bash
npm install easy-dev-dark-mode
```

or

```bash
yarn add easy-dev-dark-mode
```

## 🚀 Quick Start

### 1️⃣ Wrap Your App with `DarkModeProvider`

This enables dark mode globally.

#### ✅ Next.js (App Router)

**Important:** `layout.js` must be a Client Component if you put the provider there, or better yet, create a separate client provider component.

```jsx
"use client";

import { DarkModeProvider } from "easy-dev-dark-mode";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
```

#### ✅ React (Vite / CRA)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeProvider } from "easy-dev-dark-mode";

ReactDOM.createRoot(document.getElementById("root")).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
);
```

### 🌗 Adding a Dark Mode Toggle

You can place the toggle button anywhere in your app.

```jsx
import { DarkModeToggle } from "easy-dev-dark-mode";

function Navbar() {
  return (
    <nav>
      <h1>My App</h1>

      {/* Fixed bottom-right (default) */}
      <DarkModeToggle />

      {/* Inline placement */}
      <DarkModeToggle fixed={false} />
    </nav>
  );
}

export default Navbar;
```

## 🎨 Customizing Dark Colors (CSS Variables)

You can override the default dark theme colors globally.

```css
:root {
  --edm-bg: #121212;           /* Main background */
  --edm-text: #e0e0e0;         /* Main text */
  --edm-input-bg: #1e1e1e;     /* Input background */
  --edm-input-border: #333333; /* Input border */
  --edm-input-text: #ffffff;   /* Input text */
  --edm-input-focus: #4da3ff;  /* Focus outline */
}
```

## 🧠 Advanced Usage

### Custom Toggle Button (Using Hook)

If you want to build your own custom UI, use the `useDarkMode` hook.

```jsx
import { useDarkMode } from "easy-dev-dark-mode";

function CustomThemeButton() {
  const { enabled, setEnabled } = useDarkMode();

  return (
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default CustomThemeButton;
```

## 🛠️ API Reference

### `DarkModeToggle` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fixed` | `boolean` | `true` | Fixes toggle to bottom-right |
| `style` | `object` | `{}` | Inline styles |
| `className` | `string` | `""` | Custom CSS class |

### `useDarkMode` Hook

```javascript
const { enabled, setEnabled } = useDarkMode();
```

| Property | Type | Description |
| :--- | :--- | :--- |
| `enabled` | `boolean` | Current theme state |
| `setEnabled` | `function` | Toggle theme |

## 💾 State Persistence

User preference is automatically saved in:

**localStorage key:** `easy-dark-mode-enabled`

The selected theme persists across page reloads and sessions.

## 📄 License

Apache License 2.0

You are free to use, modify, and distribute this software in compliance with the Apache 2.0 License.

See the full license here:
👉 [https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

## ⭐ Support

If you like this project, please ⭐ star the repository and share it with the community!

