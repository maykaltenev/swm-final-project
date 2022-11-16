import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
//image
import Logo from "../../assets/logo.png"
function Header() {
    const { googleUser, setGoogleUser } = useContext(UserContext);
  return (
    <div>
        <img src={Logo} width = "70px" height="50px" alt="" />
        <Link to="/register">
        <button>Login</button>
        </Link>
        {/* if google user found */}
        {googleUser && 
        <div>
            <img src = {googleUser.picture}alt="userpicture"/>
            <h3>{googleUser.name}</h3>
        </div>}
    </div>
  )
}

export default Header