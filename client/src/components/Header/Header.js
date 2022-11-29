import React, { useContext } from "react";
import {Link} from "react-router-dom"
import Logo from "../../assets/logo.png";
import { UserContext } from "../Context/UserContext";
import Register from "../Register/Register";
function Header() {
  const {
    openRegisterForm,
    setOpenRegisterForm,
    isSignedIn,
    setIsSignedIn,
    user,
    signIn,
    setSignIn,
  } = useContext(UserContext);
  console.log("the user is:", user);
  //finding the user
  /* let userSigned = user.find(
    (item) => item.email === signIn.email && item.password === signIn.password
  ); */

  return (
    <div className="container mx-auto flex justify-between p-5 items-center">
      {openRegisterForm && <Register />}

      <Link  class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" to="/">
        <img className="w-10" src={Logo} alt="" />
        <span class="ml-3 text-xl">MERN-Quiz</span>
      </Link>
      <button
        className="bg-my-blue font-poppins mx-px px-5 rounded-full text-white py-2"
        onClick={() => setOpenRegisterForm(true)}
      >
        Join Us!
      </button>
      {/* when the user is signedIn */}
      {/* {isSignedIn && (
          <li>
            <select name="" id="">
              <option value="">
                {userSigned ? (
                  <>
                    Welcome{" "}
                    {userSigned.username.charAt(0).toUpperCase() +
                      userSigned.username.slice(1)}
                  </>
                ) : (
                  ""
                )}
              </option>
              <option value="logout">Log Out</option>
            </select>
          </li>
        )} */}
    </div>
  );
}

export default Header;
