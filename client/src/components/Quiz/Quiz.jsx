import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import CountDownTimer from "../Timer/Timer";
import SideBar from "../SideBar/SideBar";
function Quiz() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const {
    getResult,
    currentQuestion,
    setCurrentQuestion,
    getQuestions,
    handleCreateNewSession,
    questionData,
    points,
    sessionId,
    setSessionId,
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
  const handleShowAnswer = (e) => {
    e.preventDefault();

    setShowExplanation((showExplanation) => !showExplanation);
    console.log(showExplanation);
  };

  return (
    <div
      className="container sm:border-t-2 sm:border-b-4 border-t-24 bg-ghost-white-300
   border-ghost-white-100 dark:border-nav-raisin-black h-screen rounded-xl dark:text-snow w-screen sm:w-full sm:flex flex-col bg-ghost-white justify-around dark:bg-card-space-cadet "
    >
      <div className="dark:shadow-6xl shadow-8xl rounded-xl my-4 bg-ghost-white-200 sm:border-t-2 sm:border-b-4 border-nav-raisin-black dark:bg-dark-raisin-black dark:text-snow rounded  w-full px-5    ">
        <span> {id * 1 + 1} </span>/<span> {questionData.length}</span>
      </div>
      <div className="flex border-t-2 border-ghost-white flex-col w-screen sm:shadow-6xl sm:rounded-3xl sm:h-[100%] sm:w-[100%] h-[85vh] sm:p-12 sm:justify-between  sm:flex sm:flex-row ">
        <QuestionCard
          question={questionData[id]}
          showExplanation={showExplanation}
          currentQuestion={id}
        />
        <div className="container h-[25vh] w-screen dark:shadow-3xl shadow-7xl sm:w-[35%] md:w-[35%]  sm:h-full text-sm border-white-ghost-300 flex items-center sm:flex-col sm:justify-evenly dark:bg-dark-raisin-black dark:text-snow p-2 lg:w-[45%] lg:h-[90%] rounded-3xl">
          <CountDownTimer />
          <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
        </div>
      </div>
      <div className=" flex dark:border-nav-raisin-black space-x-4 mt-8 sm:m-0 ">
        <div className="flex   ">
          <button
            className="pointer w-28 sm:w-36 py-2 text-snow bg-btn-majorelle-blue rounded-lg border-ghost-white-300   hover:bg-han-purple border-t-2 mx-4"
            onClick={handlePrevious}
          >
            {" "}
            Previous
          </button>
          <button
            className="pointe w-28 sm:w-36 py-2 text-snow bg-btn-majorelle-blue hover:bg-han-purple border-ghost-white-100 border-t-2  rounded-lg"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        {Number(id) === questionData.length - 1 ? (
          <button
            className="pointer w-28 sm:w-36  py-2  border-ghost-white-300 border-t-2 bg-btn-majorelle-blue  hover:bg-han-purple text-snow rounded-lg"
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
