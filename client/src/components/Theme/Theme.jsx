import React,{ useState, useEffect } from 'react'
//icons
import {FaMoon, FaSun} from "react-icons/fa"

function Theme() {
    const [theme, setTheme] = useState(null);
    const [toggle, setToggle] = useState(false)
    //to check for prefered color scheme
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme')
   useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark');
    }
    else {
      setTheme('light');
    }
  }, [])

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]); 

  const handleThemeSwitch = () => {
    setToggle(!toggle)
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full bg-white dark:bg-black flex justify-center items-center">
    <div className=" p-4 rounded-3xl" onClick={handleThemeSwitch}>
         {!toggle ?   <FaMoon/>:<FaSun/> } 
     
    </div>
  </div>
  )
}

export default Theme