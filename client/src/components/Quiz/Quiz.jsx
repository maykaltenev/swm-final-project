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
  const { getResult, setCurrentQuestion, questionData, points } =
    useContext(QuestionContext);

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
  const handleShowAnswer = (e) => {
    e.preventDefault();

    setShowExplanation((showExplanation) => !showExplanation);
    console.log(showExplanation);
  };

  return (
    <div className="flex flex-col min-h-screen w-screen sm:w-full sm:h-[75%] dark:bg-dark-raisin-black dark:shadow-4xl shadow-5xl rounded-xl">
      <div className="dark:border-git-box rounded-3xl ml-3 dark:text-text-ghost-white text-git-box flex flex-row  items-center ">
        <div>
          <span className=" ">{id * 1 + 1}</span>/
          <span> {questionData.length}</span>
        </div>
        <img
          className="h-8 w-8 ml-5 sm:h-10 sm:w-10 sm:m-2 "
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
      <div className="sm:w-full h-full w-full mb-10 lg:mb-0 md:flex sm:h-[75%] dark:bg-dark-raisin-black">
        <QuestionCard
          question={questionData[id]}
          showExplanation={showExplanation}
          currentQuestion={id}
        />
        <div className="flex h-full p-2 w-full flex-row sm:flex-col sm:h-[90%] sm:items-center sm:justify-between sm:w-1/4  ">
          <CountDownTimer />
          <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
        </div>
      </div>
      <div className="flex w-full justify-around ">
        <div className="flex w-1/3 justify-start">
          <button
            className="mr-2 w-36 px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 
            bg-btn-majorelle-blue dark:bg-cyber-yellow dark:text-git-box hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="w-36 px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 
            bg-btn-majorelle-blue dark:bg-cyber-yellow dark:text-git-box hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        {Number(id) === questionData.length - 1 ? (
          <button
            className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 
            bg-btn-majorelle-blue dark:bg-cyber-yellow dark:text-git-box 
            hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => getResult(questionData[0]?.questionType)}
          >
            Submit
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Quiz;
