import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
// import OutsideAlerter from "../Alert/Alert";
import { UserContext } from "../Context/UserContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Theme from "../Theme/Theme";
//import useDarkMode from "../DarkMode/DarkMode";
//icons
import { FaSun, FaMoon } from "react-icons/fa";

function Header({theme,setTheme}) {
  const {
    openRegisterForm,
    setOpenRegisterForm,
    openLoginForm,
    setOpenLoginForm,
    handleShowRegisterForm,
    user,
    handleLogout,
  } = useContext(UserContext);

  //to show the dropmenu
  const [showDropMenu, setShowDropMenu] = useState(false);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }
  //for darkmode theme
 /*  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme); */
  /* const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();

    const handleMode = () => setDarkTheme(!darkTheme); 
    return (
      <span onClick={handleMode}>
        {darkTheme ? (
          <FaSun size='24' className='text-gray-500 
                    mr-3 ml-4
                    transition duration-300 ease-in-out 
                    hover:text-pink-400 
                    cursor-pointer' />
        ) : (
          <FaMoon size='24' className='text-gray-500 
                    mr-3 ml-4
                    transition duration-300 ease-in-out 
                    hover:text-pink-400 
                    cursor-pointer' />
        )}
      </span>
    );
  };*/

  const buttonRef = useRef(null);

  const handleDropMenu = () => {
    setShowDropMenu(!showDropMenu);
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
    <div className="container ">
      <div className="mx-auto flex justify-between p-5 items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          to="/"
        >
          <img className="w-10" src={Logo} alt="" />
          <span className="ml-3 text-xl">MERN-Quiz</span>
        </Link>
        {!user && (
          <button
            className="bg-my-blue font-poppins mx-px px-5 rounded-full text-white py-2"
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
                <Link
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                  to="/mycertificates"
                >
                  My Certificates{" "}
                </Link>
                <span
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  /* onClick={switchTheme} */
                 > 
               {/*   {theme  === "light" ? <FaMoon/> : <FaSun/> }    */}             
                  <Theme/>
                </span>

                <button
                  onClick={handleLogout}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
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
