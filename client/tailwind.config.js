/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
     
      keyframes:{
        pop:{
          'from': { transform: 'translateY(100%)' },
          'to': { transform: 'translateY(10%)' },
        },        
      },
      animation:{
        "popup":"pop 2s forwards"
      },
      colors: {
        // dark-mode
        "bg-xiketic": "#15141E",
        "card-space-cadet": "#202033",
        "nav-raisin-black": "#2B2B33",
        "dark-raisin-black": "#1E1E27",
        "btn-majorelle-blue": "#5855D8",
        "text-ghost-white": "#F0EFF3",
        "menu-dark-silver-metallic": "#A6A4AD",
        "menu-silver-metallic": "#B5B3BB",
        "link-violet-blue": "#7170D9",
        "link-cyber-yellow": "#FFD51C",
        "oxford-blue": "#1f293b",
        "sonic-silver": "#6F86A5",
        "ultramarine-blue": "#5068F2",
        "dark-purple": "#081a51",
        // current best-combo
        "black-choral": "#475569",
        "spanish-gray": "#BABABA",
        "sky-blue": "#29DEF2",
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
