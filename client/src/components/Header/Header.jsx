import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import Register from "../Register/Register";
//image
import Logo from "../../assets/logo.png";
//css
import "./Header.css";

function Header() {

  const [googleUserToggle, setGoogleUserToggle] = useState(false);
  const navigate = useNavigate();

  const { googleUser, setGoogleUser, openRegisterForm, setOpenRegisterForm } =
    useContext(UserContext);

  const handleJoinusButton = () => {
    setOpenRegisterForm(true);
    setGoogleUserToggle(true)
    navigate("/register");
  };

  const handleLogoutButton = () => {
    console.log("logout button");
    localStorage.clear("user");
    navigate("/");
    setGoogleUser("");
    setGoogleUserToggle(false)
    setOpenRegisterForm(false);
  };

  return (
    <div className="header">
      {openRegisterForm && <Register/>}
      <div className="header-menu">
        <img src={Logo} width="70px" height="50px" alt="" />

        <button onClick={handleJoinusButton}>Join Us</button>

        <button onClick={handleLogoutButton}>Logout</button>
      </div>

      {/* if google user found */}
      {/* first set in google user details on the local storage and   */}
    
     {googleUserToggle && (
        <div className="google-user">
          <img src={googleUser.picture} alt="userpicture" />
          <h3>{googleUser.name}</h3>
        </div>
      )} 
    </div>
  );
}

export default Header;
