import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { useNavigate, useParams } from "react-router-dom";
import CountDownTimer from "../Timer/Timer";

function Quiz() {
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { getResult, setCurrentQuestion, questionData, points, timeOver } =
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
console.log("questionData", questionData)
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

      <div className="container h-screen border-2 border-green-400 w-screen sm:w-fit sm:flex flex-col ">
        <div className="">
          <span>{id * 1 + 1}</span>/<span> {questionData.length}</span>
          <div>Points: {points}</div>
        </div>
        <div className="container h-screen sm:p-12 bg-spanish-gray sm:flex sm:flex-row sm:flex-wrap sm:justify-between items-center border-red-500 border-2">
          <QuestionCard
            question={questionData[id]}
            showExplanation={showExplanation}
            currentQuestion={id}
          />
          <div className="flex h-full w-full flex-row sm:flex-col sm:flex-row border-2 border-indigo-700 sm:w-1/2">
            <CountDownTimer />
            <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
          </div>
        </div>

        <div>
          <button onClick={handlePrevious}> Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        {Number(id) === questionData.length - 1 ? (
          <button
            className="mb-80"
            onClick={() => getResult(questionData[0]?.questionType)}
          >
            Submit
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Quiz;
