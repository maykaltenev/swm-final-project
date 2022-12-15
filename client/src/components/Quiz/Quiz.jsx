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
    navigate(
      `/mypage/${
        currentQuestion * 1 > 0 ? currentQuestion * 1 - 1 : currentQuestion
      }`
    );
  };
  const navigate = useNavigate();
  const handleNext = () => {
    setCurrentQuestion(id);
    navigate(
      `/mypage/${
        currentQuestion * 1 < questionData.length - 1
          ? currentQuestion * 1 + 1
          : currentQuestion
      }`
    );
  };
  console.log("questionData", questionData);
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
      <div className="flex flex-col lg:items-center lg:text-justify lg:h-screen h-screen w-screen justify-evenly md:h-full lg:w-full  dark:bg-dark-raisin-black dark:shadow-4xl shadow-5xl rounded-xl ">
        <div className="dark:border-git-box lg:items-center  rounded-3xl ml-3 dark:text-text-ghost-white text-git-box flex flex-row items-center ">
          <div>
            <span className=" ">{id * 1 + 1}</span>/
            <span> {questionData.length}</span>
          </div>
          <img
            className="h-8 w-8 ml-5 sm:h-10 sm:w-12 sm:m-2  "
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
        <div className="flex flex-col h-[100vh] sm:w-full sm:h-[80vh] md:justify-center  w-full h-screen justify-between lg:mb-0 md:flex-row dark:bg-dark-raisin-black ">
          <QuestionCard
            question={questionData[id]}
            showExplanation={showExplanation}
            currentQuestion={id}
          />
          <div className="dark:bg-nav-raisin-black-2  flex p-2 w-full bg-transparent rounded-3xl shadow-xl border-gray-800 flex-row sm:flex-col sm:h-[75vh] md:h-[65vh] sm:items-center sm:justify-between sm:w-1/4 md:ml-4  ">
            <CountDownTimer />
            <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
          </div>
        </div>
        <div className="flex mt-1 md:mt-4 h-full w-full justify-evenly ">
          <div className=" ">
            <button
              className="inline-flex items-center justify-center mr-2 rounded-md border border-transparent dark:bg-cyber-yellow px-6 md:px-6 py-2 md:py-3 t text-base font-medium dark:text-git-box dark:hover:bg-btn-majorelle-blue dark:text-git-box dark:hover:text-snow bg-btn-majorelle-blue text-snow hover:bg-cyber-yellow hover:text-git-box"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="inline-flex items-center justify-center mr-2 rounded-md border border-transparent dark:bg-cyber-yellow px-6 md:px-10 py-2 md:py-3 text-base font-medium dark:text-git-box dark:hover:bg-btn-majorelle-blue dark:text-git-box dark:hover:text-snow dark:hover:text-snow bg-btn-majorelle-blue text-snow hover:bg-cyber-yellow hover:text-git-box"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
          <div className="">
            {Number(id) === questionData.length - 1 && (
              <button
                className="inline-flex items-center justify-center mr-2 rounded-md border border-transparent dark:bg-cyber-yellow px-5 md:px-8 lg:px-10 py-2 md:py-3 text-base font-medium dark:text-git-box dark:hover:bg-btn-majorelle-blue dark:text-git-box dark:hover:text-snow dark:hover:text-snow bg-btn-majorelle-blue text-snow hover:bg-cyber-yellow hover:text-git-box"
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
