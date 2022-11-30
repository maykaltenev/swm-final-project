/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },

    extend: {
      colors: {
        "primary-bg": "#1f293b",
        "my-blue": "#475569",
        "electric": "#29DEF2",
        "blue-purple": "#5068F2"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },


  },
  plugins: [],
};
