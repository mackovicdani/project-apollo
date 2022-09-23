/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        back: "#1E1F21",
        dark: "#161718",
        main: "#2D2C30",
        card: "#3A393E",
        elev: "#4C4B50",
        primary: {
          main: "#6562fc",
          hover: "#7473f5",
          focus: "#5552f8",
        },
        secondary: "#009167",
        succes: "#15803d",
        error: "#b91c1c",
        text: "#D2D2D2",
        border: "#101010",
        "text-disabled": "#7A7A7A",
      },
      gridTemplateRows: {
        "2xl": "45% 55%",
        xl: "auto auto",
        xs: "auto auto auto",
        items: "33% 33% 33% auto",
      },
      gridTemplateColumns: {
        "2xl": "1fr 420px",
        xl: "1fr 420px",
        xs: "auto",
      },
    },
  },
  plugins: [],
};
