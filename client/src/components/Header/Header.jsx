import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
//image
import Logo from "../../assets/logo.png";
function Header() {
  const navigate = useNavigate();
  const { googleUser, setGoogleUser } = useContext(UserContext);

  const handleLoginButton = () => {
    console.log("login button");
    navigate("/register");
  };

  const handleLogoutButton = () => {
    console.log("logout button");
    localStorage.clear("user");
    navigate("/");
    setGoogleUser("");
  };

  return (
    <div className="header">
      <div className="header-menu">
      <img src={Logo} width="70px" height="50px" alt="" />

<button onClick={handleLoginButton}>Login</button>

<button onClick={handleLogoutButton}>Logout</button>
      </div>
    

      {/* if google user found */}
      {/* first set in google user details on the local storage and   */}
      {googleUser && (
        <div>
          <img src={googleUser.picture} alt="userpicture" />
          <h3>{googleUser.name}</h3>
        </div>
      )}
    </div>
  );
}

export default Header;
