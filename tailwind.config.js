/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-color": "#faeee7",
        "highlight-color": "#ff8ba7",
        "secondary-color": "#ffc6c7",
        "tertiary-color": "#c3f0ca",
        "recruite-card-bg": "rgba(10, 134, 0, 0.4)"
      },
      fontFamily: {
        "caveat": ["Caveat", "cursive"],
        "zen": ["Zen Maru Gothic", "sans-serif"]
      },
      width: {
        'base': '500px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      }
    },
  },
  plugins: [
  ],
};
