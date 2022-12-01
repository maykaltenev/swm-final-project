import React from "react";
import JavaScriptPic from "../../assets/cards/pc-yellow.png";
import ReactPic from "../../assets/cards/pc-red.png";
import NodePic from "../../assets/cards/pc-green.png";
import { VscCircleFilled, VscCircleOutline } from "react-icons/vsc";

export default function QuizCard() {
  return (
    <div className="container mb-6 dark:text-snow w-3/4 px-4 py-26 mx-auto ">
      <div className="flex flex-wrap -m-4  ">
        {/* JavaScript */}
        <div className="group p-4 md:w-1/3 ">
          <div className="h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={JavaScriptPic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 group-hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1
                  className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 group-hover:border-ultramarine-blue-2 "
                  group
                >
                  JavaScript
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="group-hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    <VscCircleFilled />
                    <VscCircleFilled />
                    <VscCircleOutline />
                  </div>
                  <span className="text-xs text-center">Intermediate</span>
                </div>
                <button className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* React */}
        <div className="group p-4 md:w-1/3 ">
          <div className="h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={ReactPic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 group-hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1
                  className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 group-hover:border-ultramarine-blue-2 "
                  group
                >
                  ReactJS
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="group-hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    <VscCircleFilled />
                    <VscCircleOutline />
                    <VscCircleOutline />
                  </div>
                  <span className="text-xs text-center">Beginner</span>
                </div>
                <button className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Node */}
        <div className="group p-4 md:w-1/3 ">
          <div className="h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={NodePic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 group-hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1
                  className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 group-hover:border-ultramarine-blue-2 "
                  group
                >
                  NodeJS
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="group-hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    <VscCircleFilled />
                    <VscCircleOutline />
                    <VscCircleOutline />
                  </div>
                  <span className="text-xs text-center">Beginner</span>
                </div>
                <button className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue">
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
