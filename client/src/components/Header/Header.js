import React from 'react'
import Logo from "../../assets/logo.png"

function Header() {
  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
        <div className="bg-primary-bg">
        <img className="w-10" src = {Logo} alt = ""/>
     <button className="bg-myblue">Join Us!</button>
        </div>
    
    </div>
  )
}

export default Header