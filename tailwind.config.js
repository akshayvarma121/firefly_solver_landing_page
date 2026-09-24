/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      background: "#111310",
      panel: "#1B1D18",
      border: "#33362E",
      text: {
        primary: "#E8E6DE",
        muted: "#8C8B80",
      },
      signal: "#E8A33D",
      trace: {
        secondary: "#6B8F71",
      },
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      sans: ["\"IBM Plex Sans\"", "sans-serif"],
      mono: ["\"IBM Plex Mono\"", "monospace"],
    },
    borderRadius: {
      none: "0",
      sm: "1px",
      DEFAULT: "2px",
      md: "2px",
      lg: "2px",
      xl: "2px",
      "2xl": "2px",
      "3xl": "2px",
      full: "2px",
    },
    boxShadow: {
      none: "none",
    },
    backgroundImage: {
      none: "none",
    },
    blur: {
      none: "0",
    },
    dropShadow: {
      none: "none",
    },
    extend: {},
  },
  plugins: [],
  corePlugins: {
    boxShadow: false,
    boxShadowColor: false,
    backgroundImage: false,
    gradientColorStops: false,
    blur: false,
    dropShadow: false,
  }
}
