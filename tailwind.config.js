/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'custom-bg': 'rgba(255, 243, 227, 1)',
        'color-transparent': ' rgba(159, 159, 159, 1)',
      },
    },
  },
  plugins: [],
};
