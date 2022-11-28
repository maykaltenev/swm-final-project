import React from 'react'
import Logo from "../../assets/logo.png"

function Header() {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <div className="primary-bg">
        <img className="w-10" src = {Logo} alt = ""/>
     <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Join Us!</button>
        </div>
    
    </div>
  )
}

export default Header