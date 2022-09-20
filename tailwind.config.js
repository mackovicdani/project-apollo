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
        xs: "350px auto auto auto 250px",
        lg: "380px 500px auto 300px",
        xl: "50% auto 1fr",
        xl2: "50% auto 1fr",
        new: "45% 55%",
      },
      gridTemplateColumns: {
        xs: "300px auto auto 230px 250px",
        lg: "330px 500px 250px 250px",
        xl: "50% 25% 25%",
        xl2: "25% 15% 15% 15% 15% 15%",
        new: "1fr 420px",
      },
      transitionProperty: {
        custom: "height, width, transform, zIndex, opacity",
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
