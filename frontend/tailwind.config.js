/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/preline/preline.js'],
  theme: {
    fontFamily: {
      sans: ['Roboto Flex', 'sans-serif'],
    }
  },
  plugins: [require('preline/plugin')],
};
