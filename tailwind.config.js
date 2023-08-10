/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/pages/**/*.{js,ts,jsx,tsx}",
    "src/components/**/*.{js,ts,jsx,tsx}",
    "src/features/**/*.{js,ts,jsx,tsx}",
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
        "zen": ["Zen Maru Gothic", "sans-serif"],
        "m-plus": ['"M PLUS Rounded 1c"', "sans-serif"]
      },
      margin: {
        "200": "200px",
      },
      width: {
        "100": "100px",
        'base': '500px',
        'sm': '440px',
        'md': '560px',
        'lg': '770px',
        'xl': '1280px',
      }
    },
  },
  plugins: [
  ],
};
