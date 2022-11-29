/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode:"class",
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
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },

    
  },
  plugins: [],
};
