import React, { useContext } from "react";
import MongodbPic from "../../assets/cards/pc-yellow.png";
import ReactPic from "../../assets/cards/pc-red.png";
import NodePic from "../../assets/cards/pc-green.png";
import ExpressPic from "../../assets/cards/pc-black.png";
import JavaScriptPic from "../../assets/cards/pc-blue.png";
import { VscCircleFilled, VscCircleOutline } from "react-icons/vsc";
import { QuestionContext } from "../Context/QuestionContext";
import { useParams } from "react-router-dom";

export default function QuizCard() {
  const { handleNewQuiz } = useContext(QuestionContext);

  const { level } = useParams();
/* displaying the cards of question type and all levels like beginner, intermediate, advanced */
  return (
    <div className="container flex mb-6 dark:text-snow py-26 ">
      <div className="flex flex-wrap">
        {/* JavaScript */}
        <div className="p-4 sm:w-1/3 ">
          <div className="hover:shadow-xl  hover:scale-[1.01]  transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={JavaScriptPic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1 className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 hover:border-ultramarine-blue-2 ">
                  JavaScript
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  JavaScript is the language of creativity. It's a canvas for
                  building your ideas and bringing them to life. It's what makes
                  websites interactive,and interesting.
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    {level === "beginner" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleOutline />
                        <VscCircleOutline />
                      </>
                    ) : level === "intermediate" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleOutline />
                      </>
                    ) : (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleFilled />
                      </>
                    )}
                  </div>
                  <span className="text-xs text-center">{level}</span>
                </div>
                <button
                  onClick={() => handleNewQuiz("javascript", level)}
                  className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* React */}
        <div className=" p-4 sm:w-1/3">
          <div className="hover:shadow-xl hover:scale-[1.01] transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={ReactPic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1 className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 hover:border-ultramarine-blue-2 ">
                  ReactJS
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  React is a cornerstone of modern web development. It's used by
                  some of the biggest companies in the world.
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    {level === "beginner" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleOutline />
                        <VscCircleOutline />
                      </>
                    ) : level === "intermediate" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleOutline />
                      </>
                    ) : (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleFilled />
                      </>
                    )}
                  </div>
                  <span className="text-xs text-center">{level}</span>
                </div>
                <button
                  onClick={() => handleNewQuiz("react", level)}
                  className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Node */}
        <div className=" p-4 sm:w-1/3">
          <div className="hover:shadow-xl hover:scale-[1.01] transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={NodePic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1 className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 hover:border-ultramarine-blue-2 ">
                  NodeJS
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  Node.js is the future of back-end development. It's a fast,
                  scalable, and lightweight platform that makes it easy to build
                  and deploy web applications
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    {level === "beginner" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleOutline />
                        <VscCircleOutline />
                      </>
                    ) : level === "intermediate" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleOutline />
                      </>
                    ) : (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleFilled />
                      </>
                    )}
                  </div>
                  <span className="text-xs text-center">{level}</span>
                </div>
                <button
                  onClick={() => handleNewQuiz("nodejs", level)}
                  className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-4 sm:w-1/3">
          <div className="hover:shadow-xl hover:scale-[1.01] transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={ExpressPic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1 className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 hover:border-ultramarine-blue-2 ">
                  Express JS
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  Express.js is a powerful tool for building web applications.
                  It's fast, flexible, and easy to use, making it one of the
                  most popular web development frameworks out there."
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    {level === "beginner" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleOutline />
                        <VscCircleOutline />
                      </>
                    ) : level === "intermediate" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleOutline />
                      </>
                    ) : (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleFilled />
                      </>
                    )}
                  </div>
                  <span className="text-xs text-center">{level}</span>
                </div>
                <button
                  onClick={() => handleNewQuiz("express", level)}
                  className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" p-4 sm:w-1/3">
          <div className="hover:shadow-xl hover:scale-[1.01] transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
            <img
              className="lg:h-48 md:h-36 w-full object-cover object-center"
              src={MongodbPic}
              alt="blog"
            />
            <span className="mx-6 text-ultramarine-blue-2 hover:text-ultramarine-blue">
              MERN+
            </span>
            <div className="">
              <div className="dark:bg-card-space-cadet w-full p-4">
                <h1 className="title-font dark:text-snow w-full px-4 py-4 text-lg border-b-4 border-ultramarine-blue font-medium mb-3 hover:border-ultramarine-blue-2 ">
                  MongoDB
                </h1>
                <p className="leading-relaxed mb-3 px-4 ">
                  "MongoDB is a flexible, document-oriented database that makes
                  it easy to store,. It's constantly evolving and pushing the
                  boundaries of what's possible in the world of data storage.
                </p>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span>Experience:</span>
                  <div className="hover:text-ultramarine-blue text-link-violet-blue flex justify-center text-xl">
                    {level === "beginner" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleOutline />
                        <VscCircleOutline />
                      </>
                    ) : level === "intermediate" ? (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleOutline />
                      </>
                    ) : (
                      <>
                        <VscCircleFilled />
                        <VscCircleFilled />
                        <VscCircleFilled />
                      </>
                    )}
                  </div>
                  <span className="text-xs text-center">{level}</span>
                </div>
                <button
                  onClick={() => handleNewQuiz("mongodb", level)}
                  className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue"
                >
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
