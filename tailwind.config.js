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
        'custom-text-yellow': 'rgba(184, 142, 47, 1)',
        'custom-card-bg': ' rgba(244, 245, 247, 1)',
        'custom-new-bg': 'rgba(46, 193, 172, 1)',
      },
    },
  },
  plugins: [],
};
