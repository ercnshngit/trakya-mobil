/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": {
          500: "#172974",
        },
        "primary-yellow": {
          500: "#C39A46",
        },
      },
    },
  },
  plugins: [],
};
