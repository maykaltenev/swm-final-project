import React, { useEffect, useState } from "react";
import {
  RocketIcon,
  LayersIcon,
  ArchiveIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
export default function SideBar() {
  const navigate = useNavigate();
  const [show, handleShow] = useState(false);
  const [scrolling, handleScrolling] = useState(true);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 100) {
  //       handleScrolling(true);
  //     } else {
  //       handleScrolling(false);
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("scroll");
  //   };
  // }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        console.log(window.scrollY);
        handleScrolling(true);
      } else {
        handleScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log(show);
  return (
    // <div
    //   className={`sticky ${
    //     scrolling ? "top-0" : " top-20"
    //   } flex bg-opacity-50 p-2 sm:fixed sm:top-30 sm:left-0 sm:h-screen sm:w-16 md:w-18m-0 flex lg:w-20 sm:flex-col  text-white shadow-l z-40`}
    // >
    //   <div
    //     onClick={() => handleShow(!show) && navigate("/")}
    //     className="relative flex items-center justify-center
    //     h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //     bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //     hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //     rounded-3xl hover:rounded-xl
    //     transition-all duration-300 ease-linear
    //     cursor-pointer group"
    //   >
    //     <StarFilledIcon className="w-10 h-12" />

    //     <span
    //       className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    //       text-snow bg-black-choral
    //       text-xs font-bold
    //       transition-all duration-125 scale-0 origin-left group-hover:scale-125"
    //     >
    //       Home
    //     </span>
    //   </div>
    //   <hr />
    //   <div
    //     onClick={() => navigate("/createquiz")}
    //     className="relative flex items-center justify-center
    //     h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //     bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //     hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //     rounded-3xl hover:rounded-xl
    //     transition-all duration-300 ease-linear
    //     cursor-pointer group"
    //   >
    //     <RocketIcon className="w-10 h-12" />

    //     <span
    //       className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    //       text-snow bg-black-choral
    //       text-xs font-bold
    //       transition-all duration-125 scale-0 origin-left group-hover:scale-125"
    //     >
    //       Start Quiz
    //     </span>
    //   </div>
    //   <div
    //     onClick={() => navigate("/userprofile")}
    //     className="relative flex items-center justify-center
    //     h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //     bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //     hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //     rounded-3xl hover:rounded-xl
    //     transition-all duration-300 ease-linear
    //     cursor-pointer group"
    //   >
    //     <LayersIcon className="w-10 h-12" />
    //     <span
    //       className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    //       text-snow bg-black-choral
    //       text-xs font-bold
    //       transition-all duration-125 scale-0 origin-left group-hover:scale-125"
    //     >
    //       Path
    //     </span>
    //   </div>
    //   <div
    //     onClick={() => navigate("/quizhistory")}
    //     className="relative flex items-center justify-center
    //     h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
    //     bg-javascript-yellow text-ultramarine-blue-2 text-lg
    //     hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
    //     rounded-3xl hover:rounded-xl
    //     transition-all duration-300 ease-linear
    //     cursor-pointer group"
    //   >
    //     <ArchiveIcon className="w-10 h-12" />
    //     <span
    //       className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
    //       text-snow bg-black-choral
    //       text-xs font-bold
    //       transition-all duration-125 scale-0 origin-left group-hover:scale-125"
    //     >
    //       History
    //     </span>
    //   </div>
    // </div>
    <div
      //   scrolling ? "top-0" : "top-30"
      // }  flex bg-opacity-50 p-2 sm:fixed sm:top-30 sm:left-0 sm:h-screen sm:w-16 md:w-18m-0 flex lg:w-20 sm:flex-col  text-white shadow-l z-40`}
      className={`sticky   ${
        scrolling ? "top-0" : "top-30"
      } flex bg-opacity-50 p-2 sm:fixed sm:top-30 sm:left-0 sm:h-screen sm:w-16 md:w-18m-0 lg:w-20 sm:flex-col text-white shadow-l z-10`}
    >
      <div
        onClick={() => handleShow(!show)}
        className={`relative ${
          show ? " block relative" : "w-1/3 opacity-90 sm:grid sm:relative "
        } relative flex items-center justify-center
      h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
      bg-javascript-yellow text-ultramarine-blue-2 text-lg
      hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
      rounded-3xl hover:rounded-xl
      transition-all duration-100 ease-linear
      cursor-pointer z-40 group`}
      >
        <StarFilledIcon className="w-10 h-12" content="Home" />
        <span
          onClick={() => navigate("/")}
          className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
        text-snow bg-black-choral
        text-xs font-bold
        transition-all duration-125 scale-0 sm:origin-left  group-hover:scale-125"
        >
          Home
        </span>
      </div>
      <hr />
      <div
        onClick={() => navigate("/createquiz")}
        className={`${
          show ? "block relative" : "hidden sm:grid sm:relative"
        }   flex items-center justify-center
      h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
      bg-javascript-yellow text-ultramarine-blue-2 text-lg
      hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
      rounded-3xl hover:rounded-xl
      transition-all duration-800 ease-linear
      cursor-pointer group`}
      >
        <RocketIcon className="w-10 h-12" />

        <span
          onClick={() => navigate("/createquiz")}
          className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
        text-snow bg-black-choral
        text-xs font-bold
        transition-all duration-125 scale-0  sm:origin-left group-hover:scale-125"
        >
          Start Quiz
        </span>
      </div>
      <div
        onClick={() => navigate("/userprofile")}
        className={` ${
          show ? "block relative" : "hidden sm:grid sm:relative"
        } flex items-center justify-center
      h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
      bg-javascript-yellow text-ultramarine-blue-2 text-lg
      hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
      rounded-3xl hover:rounded-xl
      transition-all duration-300 ease-linear
      cursor-pointer group `}
      >
        <LayersIcon className="w-10 h-12" />

        <span
          onClick={() => navigate("/userprofile")}
          className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
        text-snow bg-black-choral
        text-xs font-bold
        transition-all duration-125 scale-0  sm:origin-left group-hover:scale-125"
        >
          Path
        </span>
      </div>
      <div
        onClick={() => navigate("/quizhistory")}
        className={` ${
          show ? "block relative" : "hidden sm:grid sm:relative"
        } flex items-center justify-center
      h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
      bg-javascript-yellow text-ultramarine-blue-2 text-lg
      hover:bg-ultramarine-blue-2  hover:text-javascript-yellow
      rounded-3xl hover:rounded-xl
      transition-all duration-300 ease-linear
      cursor-pointer group`}
      >
        <ArchiveIcon className="w-10 h-12" />

        <span
          onClick={() => navigate("/quizhistory")}
          className="absolute w-auto p-2 m-2 min-w-max top-12  sm:right-0 sm:left-14 sm:top-0 sm:right-0 rounded-md shadow-md
        text-snow bg-black-choral
        text-xs font-bold
        transition-all duration-125 scale-0  sm:origin-left group-hover:scale-125"
        >
          History
        </span>
      </div>
    </div>
  );
}
