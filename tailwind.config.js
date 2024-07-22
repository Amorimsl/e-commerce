/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-bg': 'rgba(255, 243, 227, 1)',
      },
    },
  },
  plugins: [],
};
