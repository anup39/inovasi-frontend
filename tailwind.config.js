/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      middle: "1300px",
      xl: "1920px",
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
        subTextHome: "#969696",
        homeSubText: "#333333",
        homeBtnText: "#13C980",
        greenLantern: "#00FF00",
        boxDivider: "#EFEFEF",
        legendDivider: "#02C68540",
        potentialUnSupp: "#FF3D00",
        potentialSupp: "#FFAD33",
        bgPage: "#F9F9F9",
        bellRed: "#EB5757",
        grayBorder: "#9B9D9D",
        sidebarText: "#757575",
        featuresBorder: "#EAEAEA",
        testimonyBg: "#D6D8D8",
        collabBorder: "#02C68566",
        countriesBg: "#04C684",
        mapDivider: "#B8BCBC",
        plantedBg: "#B8E500",
        listGreen: "#00AB71",
        listOrange: "#FFAD33B2",
        pageBorder: "#E5E5E5",
        blackest: "#1F1F1F",
        faqBg: "#E5E5E580",
        registerBg: "#FBFBFB",
        registerInputBorder: "#D0D5DD",
        inputGrey: "#6C6C6C",
        popupTxt: "#252525",
        dashDivider: "#F6F6F6",
        plantationListTitle: "#9B9D9D",
        graysBlue: "#151D48",
      },
    },
  },
  plugins: ["tailwind-scrollbar-hide"],
};
