/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#534ff2",
        "primary-dark": "#100bc5",
      },
      boxShadow: {
        Ambidient: "0px 8px 10px 0px rgba(0, 0, 0, 0.2)",
        Penumbra: "0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
        Umbra: "0px 16px 24px 2px rgba(0, 0, 0, 0.14)",
      },
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
