import React,{ useState, useEffect } from 'react'
//icons
import {MdDarkMode} from "react-icons/md"
import {MdOutlineLightMode} from "react-icons/md"

function Theme() {
    const [theme, setTheme] = useState(null);
    const [toggle, setToggle] = useState(false)
    //to check for prefered color scheme
  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').matches){
      setTheme('dark');
    }
    else {
      setTheme('light');
    }
  }, [])

  useEffect(() => {
    if (theme === "dark") {
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
        {!toggle ?   <MdDarkMode/>:<MdOutlineLightMode/> }
     
    </div>
  </div>
  )
}

export default Theme