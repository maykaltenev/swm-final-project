import React, { useEffect, useState, useRef } from "react";
import {
  RocketIcon,
  LayersIcon,
  ArchiveIcon,
  StarFilledIcon,
  CodeIcon,
} from "@radix-ui/react-icons";

import useOutsideCloseDropMenu from "../../utils/helper";
import { VscCircleFilled } from "react-icons/vsc";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function SideBar() {
  const navigate = useNavigate();
  // const [show, handleShow] = useState(true);
  const [showAsideMenu, setShowAsideMenu] = useState(true);
  const [scrolling, handleScrolling] = useState(false);

  const asideRef = useRef(null);
  /* dropdown menu */
  const handleDropMenu = () => {
    setShowAsideMenu(!showAsideMenu);
  };
  /* call this function to click outside the dropdown menu */
  useOutsideCloseDropMenu(asideRef, setShowAsideMenu, scrolling);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleScrolling(true);
        setShowAsideMenu(false);
      } else if (window.scrollY < 100) {
        handleScrolling(false);
        setShowAsideMenu(true);
      } else {
        handleScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAsideMenu]);
  /* navigating the icons to the respective paths like home, path,coding challenge, quiz history */
  return (
    <div
      ref={asideRef}
      className={`sticky
      ${scrolling ? "top-0 sm:top-20 md:top-20" : "top-20 "} 
     md:fixed flex bg-opacity-50 p-2 sm:left-0 sm:w-screen md:w-screen sm:w-16 flex lg:w-20 lg:flex-col  text-white shadow-l z-50`}
      onClick={handleDropMenu}
    >
      {/* show the aside menu */}
      <div
        className={`${showAsideMenu ? "relative " : "absolute sm:relative"} 
         sm:hidden flex items-center justify-center
        h-10 w-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-cyber-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-cyber-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-50`}
      >
        <VscCircleFilled className="w-5 h-5" />
        <VscCircleFilled className="w-5 h-5" />
        <VscCircleFilled className="w-5 h-5" />
      </div>
      {/* icon will navigate to home page */}
      <div
        onClick={() => navigate("/")}
        className={`${
          showAsideMenu ? "relative " : " absolute sm:relative"
        } flex items-center justify-center
        h-10 w-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-cyber-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-cyber-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-20`}
      >
        <AiFillStar className="w-10 h-12" />
        <span
          className={`absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
         text-snow bg-black-choral
         text-xs font-bold
        transition-all duration-125 scale-0 lg:origin-left 
${showAsideMenu ? "group-hover:scale-125" : "group-hover:scale-0"}`}
        >
          Home
        </span>
      </div>

      <div
        onClick={() => navigate("/createquiz")}
        className={`${
          showAsideMenu ? "relative" : "absolute  sm:relative"
        } flex items-center justify-center
        h-10 w-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-cyber-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-cyber-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-20`}
      >
        <RocketIcon className="w-10 h-12" />

        <span
          className={`absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
        text-snow bg-black-choral
        text-xs font-bold
        transition-all duration-125 scale-0 lg:origin-left 
${showAsideMenu ? "group-hover:scale-125" : "group-hover:scale-0"}`}
        >
          Start Quiz
        </span>
      </div>

      <div
        onClick={() => navigate("/path")}
        className={`${
          showAsideMenu ? "relative" : "absolute  sm:relative "
        } flex items-center justify-center 
        h-10 w-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-cyber-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-cyber-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-20`}
      >
        <LayersIcon className="w-10 h-12" />
        <span
          className={`absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
          text-snow bg-black-choral
          text-xs font-bold
          transition-all duration-125 scale-0 md:origin-left 
    ${showAsideMenu ? "group-hover:scale-125" : "group-hover:scale-0"}`}
        >
          Path
        </span>
      </div>
      <div
        onClick={() => navigate("/codechallenge")}
        className={`${
          showAsideMenu ? "relative" : "absolute  sm:relative"
        } flex items-center justify-center
        h-10 w-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-cyber-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-cyber-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-20`}
      >
        <CodeIcon className="w-10 h-12" />

        <span
          className={`absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
        text-snow bg-black-choral
        text-xs font-bold
        transition-all duration-125 scale-0 md:origin-left 
${showAsideMenu ? "group-hover:scale-125" : "group-hover:scale-0"}`}
        >
          Code Challenge
        </span>
      </div>
      <div
        onClick={() => navigate("/quizhistory")}
        className={`${
          showAsideMenu ? "relative" : "absolute sm:relative"
        } flex items-center justify-center
        h-10 w-10 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-cyber-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-cyber-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group `}
      >
        <ArchiveIcon className="w-10 h-12" />
        <span
          className={`absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
        text-snow bg-black-choral
        text-xs font-bold
        transition-all duration-125 scale-0 md:origin-left ${
          showAsideMenu ? "group-hover:scale-125" : "group-hover:scale-0"
        }
`}
        >
          History
        </span>
      </div>
    </div>
  );
}
