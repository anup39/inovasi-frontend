/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        lightGreen: "#009CA0",
        semiBlack: "#282828",
        darkGreen: "#018C79",
        creamGray: "#FAFAFA",
        lightGray: "#F7F7F7",
        bgBlack: "#2A2A2A",
        veryLightGreen: "#DBFFE5",
        searchGray: "#EDEDED",
        grayText: "#737791",
        borderGreen: "#83DE60",
        semiBlackText: "#848686",
        redText: "#D55F5A",
        bgLightGray: "#F2F2F2",
        footerBg: "#025944",
        footerHeading: "#02C685",
        footerLine: "#C0C0C080",
        parrot: "#8ADF5E",
      },
    },
  },
  plugins: ["tailwind-scrollbar-hide"],
};
