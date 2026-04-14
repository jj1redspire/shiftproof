import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0d0d1a',
          800: '#1a1a2e',
          700: '#16213e',
          600: '#1a2550',
        },
        amber: {
          400: '#f0a500',
          500: '#e2a100',
          600: '#c08800',
        },
        surface: {
          DEFAULT: '#1e1e36',
          light: '#252544',
          border: '#2e2e52',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
