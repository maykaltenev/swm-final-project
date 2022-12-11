import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/MERN+.png";
// import OutsideAlerter from "../Alert/Alert";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
//import Theme from "../Theme/Theme";
import useDarkMode from "../DarkMode/DarkMode";

//icons
import { FaSun, FaMoon } from "react-icons/fa";

function Header({ theme, setTheme }) {
  const {
    openRegisterForm,
    openLoginForm,
    handleShowRegisterForm,
    user,
    handleLogout,
  } = useContext(UserContext);
  const navigate = useNavigate();
  //to show the dropmenu
  const [showDropMenu, setShowDropMenu] = useState(false);

  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  const buttonRef = useRef(null);

  const handleDropMenu = () => {
    setShowDropMenu(!showDropMenu);
  };
  const handleUserNavigateToUserProfileFromAvatar = () => {
    setShowDropMenu(!showDropMenu);
    navigate("/userprofile")
  };

  function useOutsideCloseDropMenu(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (!ref?.current?.contains(event?.target)) {
          setShowDropMenu(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideCloseDropMenu(buttonRef);

  return (
    <div className="dark:bg-bg-xiketic container ">
      <div className="mx-auto flex justify-between p-5 items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          to="/"
        >
          <img className="w-24 sm:w-32" src={Logo} alt="" />
        </Link>

        {!user && (
          <button
            className="rounded md:w-1/6 md:p-3 font-medium inline-flex w-full sm:w-1/3 items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue"
            onClick={handleShowRegisterForm}
          >
            Join Us!
          </button>
        )}
        {/* when the user is signedIn */}
        {user && (
          <div ref={buttonRef} className="relative">
            <img
              onClick={handleDropMenu}
              className="cursor-pointer w-14 h-14 border-4 rounded-full  p-1 flex justify-center items-center "
              alt=""
              src={user.avatar}
            />
            {showDropMenu && (
              <div className="flex flex-col w-60 z-[100] text-white absolute right-2 top-20 font-poppins text-base">
                <div className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                  <div className="flex justify-start items-center cursor-pointer" onClick={handleUserNavigateToUserProfileFromAvatar}>
                    <img
                      className="cursor-pointer w-14 h-14 border-4 rounded-full flex justify-center items-center"
                      alt=""
                      src={user.avatar}
                    />
                    <div className="ml-5 " >
                      {user?.firstName?.charAt(0).toUpperCase() +
                        user?.firstName?.slice(1)}{" "}
                    </div>
                  </div>
                </div>
                <Link
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                  to="/mycertificates"
                >
                  My Certificates{" "}
                </Link>
                <div
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out flex items-center cursor-pointer"
                  onClick={handleMode}
                >
                  <span>{darkTheme ? "Light Mode" : "Dark Mode"}</span>
                  <span className="ml-5">{darkTheme ? <FaSun /> : <FaMoon />}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  Logout{" "}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      {/* if the open login form is there show login form */}
      {(openRegisterForm && <Register />) || (openLoginForm && <Login />)}
    </div>
  );
}

export default Header;
