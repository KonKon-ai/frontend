import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aquaKonkon: '#63DCDD',
        pinkKonkon: '#EA41F7',
        goldKonkon: '#FFD700',
        silverKonkon: 'C0C0C0',
        bronzeKonkon: '#CD7F32'
      },
      fontFamily: {
        'ocr': ['"OCR A Extended"', 'monospace'], 
        'ethnocentric': ['Ethnocentric Rg', 'sans-serif'],   
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
      },
    },
  },
  plugins: [],
} satisfies Config;
