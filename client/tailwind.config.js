/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },

      colors: {
        "primary-bg": "#1f293b",
        "my-blue": "#475569",
        oxford: "#1F293B",
        "sky-blue": "#29DEF2",
        "lightmode-button": "#5553ff",
        "dark-purple": "#081a51",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
