/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#fcecec',
        'sage': '#8cac7c',
        'brown': '#5c5444',
        'gold': '#ac8444',
        'offwhite': '#fcfcf4',
        'mint': '#b8f0c4',
        'forest': '#444c3c',
      },
    },
  },
  plugins: [],
};
