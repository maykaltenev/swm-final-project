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
    <div className="flex flex-col min-h-screen w-screen sm:w-full sm:h-[75%] dark:bg-dark-raisin-black lg:p-8 border-2 br-">
      <div className="dark:border-git-box rounded-3xl ml-3 text-text-ghost-white">
        <span>{id * 1 + 1}</span>/<span> {questionData.length}</span>
      </div>
      <div className="border-2 sm:w-full h-full w-full mb-10 lg:mb-0 md:flex sm:h-[75%] dark:bg-dark-raisin-black">
        <QuestionCard
          question={questionData[id]}
          showExplanation={showExplanation}
          currentQuestion={id}
        />
        <div className="flex h-full p-2 w-full flex-row sm:flex-col sm:h-[90%] sm:items-center sm:justify-evenly border-2 sm:w-1/4 ">
          <CountDownTimer />
          <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
        </div>
      </div>
      <div className="flex w-full border justify-evenly ">
        <div className="flex border justify-around">
          <button
            className="mr-2 w-36 px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="w-36 px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        {Number(id) === questionData.length - 1 ? (
          <button
            className="inline-block px-6 py-2.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
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
