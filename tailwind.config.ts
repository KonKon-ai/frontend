import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        aquaKonkon: '#63DCDD',
        pinkKonkon: '#EA41F7',
        goldKonkon: '#FFD700',
        silverKonkon: '#C0C0C0',
        bronzeKonkon: '#CD7F32',
        whiteKonKon: '#F5F5F5'
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
      keyframes: {
        slidein: {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        slidein300: "slidein 1s ease 300ms forwards",
        slidein500: "slidein 1s ease 500ms forwards",
        slidein700: "slidein 1s ease 700ms forwards",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
