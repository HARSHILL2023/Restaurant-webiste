/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ever-green': '#2d4a2d',
        'ever-green-deep': '#1a2e1a',
        'ever-dark': '#111510',
        'ever-dark-2': '#181e16',
        'ever-dark-3': '#202820',
        'ever-terracotta': '#c4724a',
        'ever-terra-light': '#d9926e',
        'ever-cream': '#f5f0e6',
        'ever-text': '#c8c4ba',
        'ever-text-muted': '#7d7971',
        'ever-border': 'rgba(196,114,74,0.22)',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to bottom, rgba(17,21,16,.25) 0%, rgba(17,21,16,.55) 55%, rgba(17,21,16,.88) 100%)',
      }
    },
  },
  plugins: [],
};
export default config;
