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
    <div className="container h-screen rounded-3xl  dark:text-snow w-screen sm:w-full sm:flex flex-col justify-around ">
      <div className="shadow-6xl dark:bg-dark-raisin-black dark:text-snow rounded text-xl w-full px-5">
        <span> {id * 1 + 1} </span>/<span> {questionData.length}</span>
      </div>
      <div className="flex  flex-col w-screen sm:shadow-6xl sm:rounded-3xl sm:h-[70%] sm:w-[100%] h-[85vh] sm:p-12 sm:justify-between  sm:flex sm:flex-row ">
        <QuestionCard
          question={questionData[id]}
          showExplanation={showExplanation}
          currentQuestion={id}
        />
        <div className="container h-[25vh] w-screen shadow-3xl sm:rounded-3xl sm:w-[35%] sm:h-full text-sm flex items-center sm:flex-col sm:justify-evenly dark:bg-dark-raisin-black dark:text-snow p-2">
          <CountDownTimer />
          <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
        </div>
      </div>
      <div className="flex space-x-4 mt-4 ">
        <div className="flex   ">
          <button
            className="w-28 py-2 text-snow bg-btn-majorelle-blue rounded-lg border-snow border-t-2 mx-4"
            onClick={handlePrevious}
          >
            {" "}
            Previous
          </button>
          <button
            className="w-28 py-2 text-snow bg-btn-majorelle-blue border-snow border-t-2  rounded-lg"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
        {Number(id) === questionData.length - 1 ? (
          <button
            className="w-28 py-2  border-t-2 bg-cerulean-blue text-snow rounded-lg"
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
