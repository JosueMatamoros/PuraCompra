/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      keyframes: {
        fadein: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        fadeout: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
      },
      animation: {
        fadein: 'fadein 0.5s ease-out',
        fadeout: 'fadeout 0.5s ease-out'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
