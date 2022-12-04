import React, { useEffect, useState, useRef } from "react";
import {
  RocketIcon,
  LayersIcon,
  ArchiveIcon,
  StarFilledIcon,
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
  const [width, setWidth] = useState(false);
  const asideRef = useRef(null);
  const handleDropMenu = () => {
    setShowAsideMenu(!showAsideMenu);
  };
  useOutsideCloseDropMenu(asideRef, setShowAsideMenu);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleScrolling(true);
        setShowAsideMenu(false);
      } else {
        handleScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showAsideMenu]);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 670) {
        console.log(window.innerWidth);
        setWidth(true);
      } else {
        setWidth(false);
      }
    };
    console.log(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  //test
  console.log("w", width);

  return (
    <div
      // className={`sticky  top-[${
      //   window.scrollY + 20
      // }]
      ref={asideRef}
      className={`sticky  top-20  md:fixed flex bg-opacity-50 p-2 sm:left-0 sm:h-screen sm:w-16 md:w-18m-0 flex lg:w-20 sm:flex-col  text-white shadow-l z-50`}
      onClick={handleDropMenu}
    >
      <div
        className={`${showAsideMenu ? "relative " : "absolute sm:relative"} 
        ${
          width ? "relative" : "hidden"
        }test sm:hidden flex items-center justify-center
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-javascript-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-50`}
      >
        <VscCircleFilled className="w-5 h-5" />
        <VscCircleFilled className="w-5 h-5" />
        <VscCircleFilled className="w-5 h-5" />
      </div>

      <div
        onClick={() => navigate("/")}
        className={`${
          showAsideMenu ? "relative absolute" : " absolute sm:relative"
        } flex items-center justify-center
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-javascript-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-20`}
      >
        <AiFillStar className="w-10 h-12" />
        <span
          className="absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
          text-snow bg-black-choral
          text-xs font-bold
          transition-all duration-125 scale-0 md:origin-left group-hover:scale-125"
        >
          Home
        </span>
      </div>

      <div
        onClick={() => navigate("/createquiz")}
        className={`${
          showAsideMenu ? "relative" : "absolute grid sm:relative"
        } flex items-center justify-center
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-javascript-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-20`}
      >
        <RocketIcon className="w-10 h-12" />

        <span
          className="absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
          text-snow bg-black-choral
          text-xs font-bold
          transition-all duration-125 scale-0 md:origin-left group-hover:scale-125"
        >
          Start Quiz
        </span>
      </div>
      <div
        onClick={() => navigate("/userprofile")}
        className={`${
          showAsideMenu ? "relative" : "absolute grid sm:relative"
        } flex items-center justify-center
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-javascript-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group z-20`}
      >
        <LayersIcon className="w-10 h-12" />
        <span
          className="absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
          text-snow bg-black-choral
          text-xs font-bold
          transition-all duration-125 scale-0 md:origin-left group-hover:scale-125"
        >
          Path
        </span>
      </div>
      <div
        onClick={() => navigate("/quizhistory")}
        className={`${
          showAsideMenu ? "relative" : "absolute grid sm:relative"
        } flex items-center justify-center
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-javascript-yellow text-ultramarine-blue-2 text-lg
        hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group `}
      >
        <ArchiveIcon className="w-10 h-12" />
        <span
          className="absolute w-auto p-2 m-2 min-w-max top-12 sm:top-0 right-0 md:left-14 rounded-md shadow-md
      text-snow bg-black-choral
      text-xs font-bold
      transition-all duration-125 scale-0 md:origin-left group-hover:scale-125"
        >
          History
        </span>
      </div>
    </div>
    // <div
    //   className={`sticky   ${
    //     scrolling ? "top-0" : "top-30"
    //   } flex bg-opacity-50 p-2 sm:fixed sm:top-30 sm:left-0 sm:h-screen sm:w-16 md:w-18m-0 lg:w-20 sm:flex-col text-white shadow-l z-10`}
    // >
    //   <div
    //     onClick={() => handleShow(!show)}
    //     className={`relative ${
    //       show ? "block relative" : "w-1/3 opacity-90 sm:grid sm:relative"
    //     } relative flex items-center justify-center
    //   h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //   bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //   hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //   rounded-3xl hover:rounded-xl
    //   transition-all duration-100 ease-linear
    //   cursor-pointer z-40 group`}
    //   >
    //     <StarFilledIcon className="w-10 h-12" content="Home" />
    //     <span
    //       onClick={() => navigate("/")}
    //       className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
    //     text-snow bg-black-choral
    //     text-xs font-bold
    //     transition-all duration-125 scale-0 sm:origin-left  group-hover:scale-125"
    //     >
    //       Home
    //     </span>
    //   </div>
    //   <hr />
    //   <div
    //     onClick={() => navigate("/createquiz")}
    //     className={`${
    //       show ? "block relative" : "hidden sm:grid sm:relative"
    //     }   flex items-center justify-center
    //   h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //   bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //   hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //   rounded-3xl hover:rounded-xl
    //   transition-all duration-800 ease-linear
    //   cursor-pointer group`}
    //   >
    //     <RocketIcon className="w-10 h-12" />

    //     <span
    //       onClick={() => navigate("/createquiz")}
    //       className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
    //     text-snow bg-black-choral
    //     text-xs font-bold
    //     transition-all duration-125 scale-0  sm:origin-left group-hover:scale-125"
    //     >
    //       Start Quiz
    //     </span>
    //   </div>
    //   <div
    //     onClick={() => navigate("/userprofile")}
    //     className={` ${
    //       show ? "block relative" : "hidden sm:grid sm:relative"
    //     } flex items-center justify-center
    //   h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //   bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //   hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //   rounded-3xl hover:rounded-xl
    //   transition-all duration-300 ease-linear
    //   cursor-pointer group `}
    //   >
    //     <LayersIcon className="w-10 h-12" />

    //     <span
    //       onClick={() => navigate("/userprofile")}
    //       className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
    //     text-snow bg-black-choral
    //     text-xs font-bold
    //     transition-all duration-125 scale-0  sm:origin-left group-hover:scale-125"
    //     >
    //       Path
    //     </span>
    //   </div>
    //   <div
    //     onClick={() => navigate("/quizhistory")}
    //     className={` ${
    //       show ? "block relative" : "hidden sm:grid sm:relative"
    //     } flex items-center justify-center
    //   h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //   bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //   hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //   rounded-3xl hover:rounded-xl
    //   transition-all duration-300 ease-linear
    //   cursor-pointer group`}
    //   >
    //     <ArchiveIcon className="w-10 h-12" />

    //     <span
    //       onClick={() => navigate("/quizhistory")}
    //       className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
    //     text-snow bg-black-choral
    //     text-xs font-bold
    //     transition-all duration-125 scale-0  sm:origin-left group-hover:scale-125"
    //     >
    //       History
    //     </span>
    //   </div>
    // </div>
  );
}
