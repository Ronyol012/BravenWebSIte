/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'reinbou': {
          'navy': '#1D4165',
          'coral': '#EA6969',
          'yellow': '#FFDC7C',
          'peach': '#FCD3B3',
          'sky': '#A7D8DC'
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
};
