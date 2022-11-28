import React, { useContext } from "react";
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
  console.log("the user is:",user)
  //finding the user
  /* let userSigned = user.find(
    (item) => item.email === signIn.email && item.password === signIn.password
  ); */

  return (
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      {openRegisterForm && <Register />}
      <div className="flex justify-between">
        <img className="w-10" src={Logo} alt="" />
        <button
          className="bg-my-blue font-poppins mx-px px-5 rounded-full text-white"
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
    </div>
  );
}

export default Header;
