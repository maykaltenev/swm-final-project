import React from "react";
import { RocketIcon, LayersIcon, ArchiveIcon } from "@radix-ui/react-icons";
export default function SideBar() {
  return (
    <div className="fixed top-20 left-0 h-screen w-16 md:w-18m-0flex lg:w-20 flex-col bg-primary-bg text-white shadow-l">
      <div className="mt-4">
        <RocketIcon
          className="relative flex items-center justify-center 
        h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
        bg-gray-700 text-blue-purple text-lg
        hover:bg-blue-purple hover:text-white
        rounded-3xl hover:rounded-xl
        transition-all duration-300 ease-linear
        cursor-pointer"
        />
      </div>
      <div className="mt-4">
        <LayersIcon
          className="relative flex items-center justify-center 
          h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
          bg-gray-700 text-blue-purple text-lg
          hover:bg-blue-purple hover:text-white
          rounded-3xl hover:rounded-xl
          transition-all duration-300 ease-linear
          cursor-pointer"
        />
      </div>
      <div className="mt-4">
        <ArchiveIcon
          className="relative flex items-center justify-center 
         h-12 w-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mt-2 mb-2 mx-auto shadow-lg p-2
         bg-gray-700 text-blue-purple text-lg
         hover:bg-blue-purple hover:text-white
         rounded-3xl hover:rounded-xl
         transition-all duration-300 ease-linear
         cursor-pointer"
        />
      </div>
    </div>
  );
}
