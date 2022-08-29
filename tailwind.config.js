/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        back: "#302e31",
        main: "#333332",
        card: "#363438",
        primary: "#0196ea",
        succes: "#15803d",
        error: "#b91c1c",
        text: "#c7c6c7",
        "text-disabled": "#d4d4d4",
      },
    },
  },
  plugins: [],
};
