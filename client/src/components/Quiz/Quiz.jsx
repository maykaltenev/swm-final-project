import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { useNavigate, useParams } from "react-router-dom";
import CountDownTimer from "../Timer/Timer";
//Images
import reactimg from "../../assets/reactimg.png";
import mongodbimg from "../../assets/mongodbimg.png";
import jsimg from "../../assets/jsimg.png";
import expressimg from "../../assets/expressimg.png";
import nodeimg from "../../assets/nodeimg.png";

function Quiz() {
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    getResult,
    setCurrentQuestion,
    questionData,
    timeOver,
    currentQuestion,
  } = useContext(QuestionContext);

  const { id } = useParams();

  const handlePrevious = () => {
    setCurrentQuestion(id);
    navigate(`/mypage/${id * 1 > 0 ? id * 1 - 1 : id}`);
  };
  const navigate = useNavigate();
  const handleNext = () => {
    setCurrentQuestion(id);
    navigate(`/mypage/${id * 1 < questionData.length - 1 ? id * 1 + 1 : id}`);
  };
  return (
    <div className="relative">
      {
        <div
          className={
            timeOver
              ? " w-full h-full bg-gray-300 bg-opacity-60 border-2  absolute"
              : ""
          }
        >
          {timeOver && (
            <div className=" w-full h-full flex items-center  justify-center ">
              <div className="z-50 w-4/5 h-1/4  flex flex-col items-center  justify-center border-2  rounded-xl shadow-lg  p-3 my-2 sm:w-2/5 sm:h-1/5  sm:p-5  bg-white">
                <p className=" text-center p-2 sm:my-2 w-full   rounded-xl">
                  Time is Over Please submit the quiz
                </p>
                <button
                  className="my-2 sm:my-4  border-2 text-white bg-red-500  rounded-xl  w-1/3 h-1/3 "
                  onClick={() => getResult(questionData[0]?.questionType)}
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      }
      <div className="flex b flex-col min-h-screen w-screen sm:w-full sm:h-[75%] dark:bg-dark-raisin-black dark:shadow-4xl shadow-5xl rounded-xl">
        <div className="dark:border-git-box rounded-3xl ml-3 dark:text-text-ghost-white text-git-box flex flex-row  items-center ">
          <div>
            <span className=" ">{id * 1 + 1}</span>/
            <span> {questionData.length}</span>
          </div>
          <img
            className="h-8 w-8 ml-5 sm:h-10 sm:w-12 sm:m-2 "
            src={
              questionData[id]?.questionType === "javascript"
                ? jsimg
                : questionData[id]?.questionType === "react"
                ? reactimg
                : questionData[id]?.questionType === "express"
                ? expressimg
                : questionData[id]?.questionType === "mongodb"
                ? mongodbimg
                : questionData[id]?.questionType === "nodejs"
                ? nodeimg
                : ""
            }
            alt="quiz"
          />
        </div>
        <div className="sm:w-full h-full w-full  mb-10 lg:mb-0 md:flex dark:bg-dark-raisin-black ">
          <QuestionCard
            question={questionData[id]}
            showExplanation={showExplanation}
            currentQuestion={id}
          />
          <div className="dark:bg-nav-raisin-black-2  flex p-2 w-full bg-transparent rounded-3xl shadow-xl border-gray-800 flex-row sm:flex-col sm:h-[73vh] md:h-[75vh] sm:items-center sm:justify-between sm:w-1/4 md:ml-4  ">
            <CountDownTimer />
            <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
          </div>
        </div>
        <div className="flex md:mt-4 justify-evenly">
          <div className="ml-2 flex w-3/5 justify-center">
            <button
              className="mr-2 w-28 px-6 py-2.5 md:w-48 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 dark:hover:bg-gray-700  dark:hover:text-snow
            bg-btn-majorelle-blue dark:bg-cyber-yellow dark:text-git-box hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="w-28 px-6 py-2.5  md:px-10bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 dark:hover:bg-gray-700  dark:hover:text-snow
            bg-btn-majorelle-blue dark:bg-cyber-yellow dark:text-git-box hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
          <div className="w-2/5 text-center">
            {Number(id) === questionData.length - 1 && (
              <button
                className="w-28 px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700  hover:bg-gray-700 dark:hover:bg-gray-700  dark:hover:text-snow
            bg-btn-majorelle-blue dark:bg-cyber-yellow dark:text-git-box 
            hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={() => getResult(questionData[0]?.questionType)}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Quiz;
