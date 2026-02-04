# 🌙 Easy Dark Mode (React & Next.js)

Easy Dark Mode ek **plug-and-play dark mode solution** hai jo bina manually CSS likhe, aapki poori website ko **smartly dark mode** me convert kar deta hai. Ye existing colors ko detect karta hai aur unhe intelligently dark mode ke liye adjust karta hai.

---

## ✨ Features

- ⚡ **One-click Dark Mode Toggle**: Smooth transition ke saath.
- 🎨 **Smart Color Conversion**: Background, text, aur borders ko automatic handle karta hai.
- 🔄 **Dynamic DOM Support**: MutationObserver ki madad se dynamically added elements pe bhi apply hota hai.
- 💾 **Persistence**: User preference default `localStorage` me save hoti hai.
- 🖼️ **Media Adjustment**: Images aur videos ki brightness/contrast auto-adjust hoti hai.
- 🛠️ **Fully Customizable**: CSS variables ke through colors override kar sakte hain.
- 🚀 **Framework Ready**: React aur Next.js (App Router) dono ke liye optimized.

---

## 📦 Installation

```bash
npm i easy-dark-mode
```

---

## 🚀 Usage

### 1️⃣ Global Wrapper (React/Next.js)

Sabse pehle apne App component ko `DarkModeProvider` se wrap karein.

#### For Next.js (App Router):
Create a `providers.js` or directly wrap in `layout.js` (Ensure it's a Client Component).

```jsx
// app/layout.js
import { DarkModeProvider } from "easy-dark-mode";

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

#### For React:
```jsx
// src/main.jsx or App.jsx
import { DarkModeProvider } from "easy-dark-mode";

ReactDOM.createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <App />
  </DarkModeProvider>
)
```

### 2️⃣ Adding Toggle Button

Aap `DarkModeToggle` component ko jha chahe wha use kar sakte hain.

```jsx
import { DarkModeToggle } from "easy-dark-mode";

function Navbar() {
  return (
    <nav>
      <h1>My App</h1>
      {/* Defaults to fixed bottom-right */}
      <DarkModeToggle /> 
      
      {/* Inline position */}
      <DarkModeToggle fixed={false} />
    </nav>
  );
}
```

---

## 🎨 Customizing Colors (CSS Variables)

Agar aapko default dark colors pasand nahi, toh aap apni **global CSS** me variables override kar sakte hain:

```css
:root {
  /* Default Values override examples */
  --edm-bg: #121212;             /* Main background */
  --edm-text: #e0e0e0;           /* Main text color */
  --edm-input-bg: #1e1e1e;       /* Input background */
  --edm-input-border: #333;      /* Input border color */
  --edm-input-text: #ffffff;     /* Input text color */
  --edm-input-focus: #4da3ff;    /* Input focus border */
}
```

---

## 🧠 Advanced Usage

### Custom Toggle Button
Agar aapko apna custom button banana hai, toh `useDarkMode` hook ka use karein:

```jsx
import { useDarkMode } from "easy-dark-mode";

function CustomThemeButton() {
  const { enabled, setEnabled } = useDarkMode();

  return (
    <button onClick={() => setEnabled(!enabled)}>
      {enabled ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
```

---

## 🛠️ Props & API

### `DarkModeToggle` Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fixed` | `boolean` | `true` | Agar `true` hai toh button bottom-right corner me fix rahega. |
| `style` | `object` | `{}` | Custom inline styles for the button. |
| `className` | `string` | `""` | Additional CSS class. |

### `useDarkMode` Hook
Returns `{ enabled, setEnabled }`.

---

## 💾 Saving State
Package automatically `localStorage` me `easy-dark-mode-enabled` key use karta hai taaki user ka preference refresh hone par bhi barkrar rahe.

---

## 📄 License
MIT 