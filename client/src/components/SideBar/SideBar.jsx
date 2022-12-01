import React from "react";
import { RocketIcon, LayersIcon, ArchiveIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
export default function SideBar() {
  const navigate = useNavigate();
  return (
    <div className="fixed top-20 left-0 h-screen w-16 md:w-18m-0 flex lg:w-20 flex-col bg-oxford-blue text-white shadow-l">
      <div
        onClick={() => navigate("/createquiz")}
        className="relative flex items-center justify-center 
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-sonic-silver text-ultramarine-blue text-lg
        hover:bg-cerulean-blue hover:text-snow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group"
      >
        <RocketIcon className="w-10 h-12" />

        <span
          className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
          text-snow bg-black-choral
          text-xs font-bold 
          transition-all duration-125 scale-0 origin-left group-hover:scale-125"
        >
          Start Quiz
        </span>
      </div>
      <div
        onClick={() => navigate("/userprofile")}
        className="relative flex items-center justify-center 
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-sonic-silver text-ultramarine-blue text-lg
        hover:bg-cerulean-blue hover:text-snow
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer group"
      >
        <LayersIcon className="w-10 h-12" />
        <span
          className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
          text-snow bg-black-choral
          text-xs font-bold 
          transition-all duration-125 scale-0 origin-left group-hover:scale-125"
        >
          Path
        </span>
      </div>
      <div
        onClick={() => navigate("/result")}
        className="relative flex items-center justify-center 
         h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
         bg-sonic-silver text-ultramarine-blue text-lg
         hover:bg-cerulean-blue hover:text-snow
         rounded-3xl hover:rounded-xl
         transition-all duration-300 ease-linear
         cursor-pointer group"
      >
        <ArchiveIcon className="w-10 h-12" />
        <span
          className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
          text-snow bg-black-choral
          text-xs font-bold 
          transition-all duration-125 scale-0 origin-left group-hover:scale-125"
        >
          History
        </span>
      </div>
    </div>
  );
}
