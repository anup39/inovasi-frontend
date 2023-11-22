/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        lightGreen: '#009CA0',
        semiBlack: '#282828',
        darkGreen: '#018C79',
        creamGray: '#FAFAFA',
        lightGray: '#F7F7F7',
      },
    },
  },
  plugins: ['tailwind-scrollbar-hide'],
};
