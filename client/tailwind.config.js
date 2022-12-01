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
        // current best-combo
        "oxford-blue": "#1f293b",
        "sky-blue": "#29DEF2",
        "ultramarine-blue": "#5068F2",
        // current best-combo
        "black-choral": "#475569",
        "spanish-gray": "#BABABA",
        "sonic-silver":
          "#6F86A5",
        "snow":
          "#FFFBFC",
        "cerulean-blue":
          "#4458C7",
        //test
        "blue-green": "#6CB0A8",
        "persian-indigo": "#290773",
        "prussian-blue": "#333F54",
        "ultramarine-blue-2": "#677CF4",
        "cornflower-blue": "#7D88FF"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },


  },
  plugins: [],
};
