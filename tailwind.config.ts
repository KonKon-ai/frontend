import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3A0D60",
        secondary: "#180525",
        tertiary: {
          pink: "#EA41F7",
          gray: "#A6A6A6",
          turquoise: "#48D5DD"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        'ocr': ['"OCR A Extended"', 'monospace'],
        'ethnocentric': ['ETHNOCENTRIC', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
