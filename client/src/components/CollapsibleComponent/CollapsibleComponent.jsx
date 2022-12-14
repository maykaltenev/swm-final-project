import React from "react";

import { HiLightningBolt, HiOutlineLightningBolt } from "react-icons/hi";

import mongodbimg from "../../assets/mongodb.svg";
import nodejsimg from "../../assets/nodejs.svg";
import mern from "../../assets/MERN-logo.png";
import { useNavigate } from "react-router-dom";

export default function Collapsible() {
  const navigate = useNavigate();

  const handleClick = (level) => {
    navigate(`/path/${level}`);
  };

  return (
    /* to show collapsible component for mern stack beginner , intermediate, advanced and once the user clicks anyone of these he will be navigated to the path where he is able to choose MERN of his choice to start quiz */
    <div className="text-gray-800 min-h-screen flex flex-col items-center  ">
      <div className="container rounded border-ultramarine-blue sm:w-3/5 py-3 px-2">
        {/* JS */}
        <details
          className="bg-snow shadow h-2/4 rounded mb-4 border-solid "
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative"
          >
            <h3 className="flex flex-1 p-4 font-semibold ">
              Mern Stack for beginner
            </h3>
            <div className="flex w-10 items-center justify-center">
              <div
                className="border-8 border-transparent border-l-gray-600 ml-2
        group-open:rotate-90 transition-transform origin-left
        "
              ></div>
            </div>
          </summary>
          <div
            onClick={() => handleClick("beginner")}
            className="p-6 hover:bg-gray-200"
          >
            <div className="flex relative pt-10 pb-20 sm:items-center text md:w-2/3 mx-auto cursor-pointer">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-2  bg-ultramarine-blue pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-spanish-gray text-ultramarine-blue relative z-10 top-30  title-font font-medium text-m ">
                1
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 text-gray-800 rounded-full inline-flex items-center justify-center">
                  <img src={mern} alt="mern logo" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the Mern Stack Path for beginner
                  </h2>
                  <p className="leading-relaxed bg-">
                    MERN is one of several variations of the MEAN stack (MongoDB
                    Express Angular Node), where the traditional Angular.js
                    front-end framework is replaced with React.js. Other
                    variants include MEVN (MongoDB, Express, Vue, Node), and
                    really any front-end JavaScript framework can work. Ready to
                    take the next step? Start your journey
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
        <details
          className="bg-snow shadow h-2/4 rounded mb-4 border-solid "
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative"
          >
            <h3 className="flex flex-1 p-4 font-semibold ">
              Mern Stack for Intermediate
            </h3>
            <div className="flex w-10 items-center justify-center">
              <div
                className="border-8 border-transparent border-l-gray-600 ml-2
        group-open:rotate-90 transition-transform origin-left
        "
              ></div>
            </div>
          </summary>
          <div
            onClick={() => handleClick("intermediate")}
            className="p-6 hover:bg-gray-200"
          >
            <div className="flex relative pt-10 pb-20 sm:items-center text md:w-2/3 mx-auto cursor-pointer">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-2  bg-ultramarine-blue pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-spanish-gray text-ultramarine-blue relative z-10 top-30  title-font font-medium text-m ">
                2
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 text-gray-800 rounded-full inline-flex items-center justify-center">
                  <img src={mern} alt="mern logo" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the Mern Stack Path for Intermediate
                  </h2>
                  <p className="leading-relaxed bg-">
                    MERN stack is a collection of technologies that enables
                    faster application development. It is used by developers
                    worldwide. The main purpose of using MERN stack is to
                    develop apps using JavaScript only. This is because the four
                    technologies that make up the technology stack are all
                    JS-based. Thus, if one knows JavaScript (and JSON), the
                    backend, frontend, and database can be operated easily.
                  </p>

                  <div className="mt-4 ">
                    <span className="text-bold text-l mt-2">Level:</span>
                    <div className="mt-4 flex w-fit hover:border-x-8 rounded border-min border-cornflower-blue  ">
                      <HiLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiOutlineLightningBolt className="w-5 h-5  text-ultramarine-blue  " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
        <details
          className="bg-snow shadow h-2/4 rounded mb-4 border-solid "
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative"
          >
            <h3 className="flex flex-1 p-4 font-semibold ">
              Mern Stack for Advanced
            </h3>
            <div className="flex w-10 items-center justify-center">
              <div
                className="border-8 border-transparent border-l-gray-600 ml-2
        group-open:rotate-90 transition-transform origin-left
        "
              ></div>
            </div>
          </summary>
          <div
            onClick={() => handleClick("advanced")}
            className="p-6 hover:bg-gray-200"
          >
            <div className="flex relative pt-10 pb-20 sm:items-center text md:w-2/3 mx-auto cursor-pointer">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-2  bg-ultramarine-blue pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-spanish-gray text-ultramarine-blue relative z-10 top-30  title-font font-medium text-m ">
                3
              </div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 text-gray-800 rounded-full inline-flex items-center justify-center">
                  <img src={mern} alt="mern logo" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the Mern Stack Path for Advanced
                  </h2>
                  <p className="leading-relaxed bg-">
                    There are many good reasons to use the MERN Stack. For
                    example, it allows the creation of a 3-tier architecture
                    that includes frontend, backend, and database using
                    JavaScript and JSON.
                  </p>

                  <div className="mt-4 ">
                    <span className="text-bold text-l mt-2">Level:</span>
                    <div className="mt-4 flex w-fit hover:border-x-8 rounded border-min border-cornflower-blue  ">
                      <HiLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiLightningBolt className="w-5 h-5  text-ultramarine-blue " />
                      <HiLightningBolt className="w-5 h-5  text-ultramarine-blue  " />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
        {/* React */}
        {/* <details
          className="bg-snow shadow rounded group mb-4 border-solid "
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
                    <g stroke="#61dafb" strokeWidth="1" fill="none">
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
                    React.js, more commonly known as React, is a free,
                    open-source JavaScript library. It works best to build user
                    interfaces by combining sections of code (components) into
                    full websites. Originally built by Facebook, Meta and the
                    open-source community now maintain it. you can build your
                    entire site in React or just use one single React component
                    on one page.
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
        </details> */}
        {/* Expressjs */}
        {/* <details
          className="bg-snow shadow rounded group mb-4 border-solid "
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative
    "
          >
            <h3 className="flex flex-1 p-4 font-semibold ">Express Js</h3>
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
                    fill="#000000"
                    viewBox="0 0 50 50"
                    width="60px"
                    height="60px"
                  >
                    <path d="M49.729 11h-.85c-1.051 0-2.041.49-2.68 1.324l-8.7 11.377-8.7-11.377C28.162 11.49 27.171 11 26.121 11h-.85l10.971 14.346L25.036 40h.85c1.051 0 2.041-.49 2.679-1.324L37.5 26.992l8.935 11.684C47.073 39.51 48.063 40 49.114 40h.85L38.758 25.346 49.729 11zM21.289 34.242c-2.554 3.881-7.582 5.87-12.389 4.116C4.671 36.815 2 32.611 2 28.109L2 27h12v0h11l0-4.134c0-6.505-4.818-12.2-11.295-12.809C6.273 9.358 0 15.21 0 22.5l0 5.573c0 5.371 3.215 10.364 8.269 12.183 6.603 2.376 13.548-1.17 15.896-7.256 0 0 0 0 0 0h-.638C22.616 33 21.789 33.481 21.289 34.242zM2 22.5C2 16.71 6.71 12 12.5 12S23 16.71 23 22.5V25H2V22.5z" />
                  </svg>{" "}
                </div>
                <div className="shrink-2 sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the Express JS Path
                  </h2>
                  <p className="leading-relaxed bg-">
                    ExpressJS is considered as minimal as well as flexible web
                    application framework of Node.js which gives robust features
                    for use of the web as well as mobile applications. ExpressJS
                    is also considered as an open source framework and it was
                    developed and maintained by the foundation of NodeJS.
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
        </details> */}
        {/* nodejs */}
        {/*  <details
          className="bg-snow shadow rounded group mb-4 border-solid "
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative
    "
          >
            <h3 className="flex flex-1 p-4 font-semibold ">NodeJS</h3>
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
                  <img src={nodejsimg} alt="nodejs icon" />
                </div>
                <div className="shrink-2 sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the NodeJS Path
                  </h2>
                  <p className="leading-relaxed bg-">
                    Node.js is an open-source server environment,
                    cross-platform, and runs on Windows, Linux, Unix, and macOS.
                    Node.js is a back-end JavaScript runtime environment, that
                    runs on the V8 JavaScript Engine and executes JavaScript
                    code outside a web browser.
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
        </details> */}
        {/* mongoDB */}
        {/*    <details
          className="bg-snow shadow rounded group mb-4 border-solid "
          open
        >
          <summary
            className="list-none flex flex-wrap items-center cursor-pointer
    focus-visible:outline-none focus-visible:ring focus-visible:ring-ultramarine-blue
    rounded group-open:rounded-b-none group-open:z-[1] relative
    "
          >
            <h3 className="flex flex-1 p-4 font-semibold ">MongoDB</h3>
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
                  <img src={mongodbimg} alt="mongodb logo" className="  " />
                </div>
                <div className="shrink-2 sm:pl-6 mt-6 sm:mt-0 ">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl ">
                    Start your journey with the MongoDB Path
                  </h2>
                  <p className="leading-relaxed bg-">
                    MongoDB is a document-oriented NoSQL database used for high
                    volume data storage. Instead of using tables and rows as in
                    the traditional relational databases, MongoDB makes use of
                    collections and documents. Documents consist of key-value
                    pairs which are the basic unit of data in MongoDB.
                    Collections contain sets of documents and function which is
                    the equivalent of relational database tables. MongoDB is a
                    database which came into light around the mid-2000s.
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
        </details> */}
      </div>
    </div>
  );
}
