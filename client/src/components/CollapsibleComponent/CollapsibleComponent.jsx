import React from "react";

import { HiLightningBolt, HiOutlineLightningBolt } from "react-icons/hi";
// import { FaLightningBoltIcon } from "react-icons/fa";
export default function Collapsible() {
  return (
    <div className=" bg-gray-300 text-gray-800 min-h-screen ">
      <h1 className="text-center">Welcome to the user page!</h1>
      <div className="container  w-3/5 rounded border-ultramarine-blue mx-auto bg-gray-400 py-3 px-2">
        {/* JS */}
        <details
          className="bg-snow shadow rounded mb-4 border-solid border-l-8 hover:border-ultramarine-blue"
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative
    "
          >
            <h3 className="flex flex-1 p-4 font-semibold ">Java Script</h3>
            <div className="flex w-10 items-center justify-center">
              <div
                className="border-8 border-transparent border-l-gray-600 ml-2
        group-open:rotate-90 transition-transform origin-left
        "
              ></div>
            </div>
          </summary>
          <div className="p-6 hover:bg-gray-200">
            <div className="flex relative pt-10 pb-20 sm:items-center text md:w-2/3 mx-auto cursor-pointer">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-2  bg-ultramarine-blue pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-spanish-gray text-ultramarine-blue relative z-10 top-30  title-font font-medium text-m ">
                1
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg-ultramarine-blue text-gray-800 rounded-full inline-flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 256"
                    preserveAspectRatio="xMinYMin meet"
                  >
                    <path d="M0 0h256v256H0V0z" fill="#F7DF1E" />
                    <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247L210.29 147.43c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" />
                  </svg>
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the JavaScript Path
                  </h2>
                  <p clasNames="leading-relaxed bg-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem vero impedit adipisci eius, accusamus culpa,
                    distinctio illum atque sunt rerum facere ex quia delectus
                    perspiciatis ipsa eos beatae odio voluptas.
                  </p>

                  <div className="mt-4 ">
                    <span className="text-bold text-l mt-2">Level:</span>
                    <div className="mt-4 flex w-fit hover:border-x-8 rounded border-min border-cornflower-blue  ">
                      <HiLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiOutlineLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiOutlineLightningBolt className="w-5 h-5  text-ultramarine-blue  " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
        {/* React */}
        <details
          className="bg-snow shadow rounded group mb-4 border-solid border-l-8 hover:border-ultramarine-blue"
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative
    "
          >
            <h3 className="flex flex-1 p-4 font-semibold ">React</h3>
            <div className="flex w-10 items-center justify-center">
              <div
                className="border-8 border-transparent border-l-gray-600 ml-2
        group-open:rotate-90 transition-transform origin-left
        "
              ></div>
            </div>
          </summary>
          <div className="p-6 hover:bg-gray-200">
            <div className="flex relative pt-10 pb-20 sm:items-center text md:w-2/3 mx-auto cursor-pointer">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-2  bg-ultramarine-blue pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0  w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-spanish-gray text-ultramarine-blue relative z-10 top-30 title-font font-medium text-xs ">
                2
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 rounded-full inline-flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-11.5 -10.23174 23 20.46348"
                  >
                    <title>React Logo</title>
                    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
                    <g stroke="#61dafb" stroke-width="1" fill="none">
                      <ellipse rx="11" ry="4.2" />
                      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                  </svg>
                </div>
                <div className="shrink-2 sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the ReactJS Path
                  </h2>
                  <p className="leading-relaxed bg-">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorem vero impedit adipisci eius, accusamus culpa,
                    distinctio illum atque sunt rerum facere ex quia delectus
                    perspiciatis ipsa eos beatae odio voluptas.
                  </p>

                  <div className="mt-4 ">
                    <span className="text-bold text-l mt-2">Level:</span>
                    <div className="mt-4 flex w-fit hover:border-x-8 rounded border-min border-cornflower-blue  ">
                      <HiLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiOutlineLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiOutlineLightningBolt className="w-5 h-5  text-ultramarine-blue  " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
