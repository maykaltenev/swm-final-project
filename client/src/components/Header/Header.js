import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
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
  //to show the dropmenu
  const [showDropMenu, setShowDropMenu] = useState(false);
  const buttonRef = useRef(null);

  const handleDropMenu = () => {
    setShowDropMenu(!showDropMenu);
  };

  function useOutsideAlerter(ref) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        alert("You clicked outside of me!");
      }
    }
  }, [ref]);
}

  return (
    <div className="container mx-auto flex justify-between p-5 items-center">
      {openRegisterForm && <Register />}

      <Link
        className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
        to="/"
      >
        <img className="w-10" src={Logo} alt="" />
        <span className="ml-3 text-xl">MERN-Quiz</span>
      </Link>
      <button
        className="bg-my-blue font-poppins mx-px px-5 rounded-full text-white py-2"
        onClick={() => setOpenRegisterForm(true)}
      >
        Join Us!
      </button>

      {/* when the user is signedIn */}
      {user && (
        <div className="relative">
          <img
            onClick={handleDropMenu}
            ref={buttonRef}
            className="w-7"
            alt=""
            src={user.avatar}
          />
          {showDropMenu && (
            <div className="flex flex-col w-60  text-white absolute right-2 top-14 ">
              <div className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                <div className="flex ">
                  <img
                    onClick={handleDropMenu}
                    className="w-7"
                    alt=""
                    src={user.avatar}
                  />
                  <div className="ml-4">
                    {user?.firstName?.charAt(0).toUpperCase() +
                      user?.firstName?.slice(1)}{" "}
                  </div>
                </div>
              </div>
              <Link className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ">
                My Certificates{" "}
              </Link>
              <Link className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ">
                Logout{" "}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
