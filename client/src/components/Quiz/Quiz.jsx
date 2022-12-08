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
        {/* <button onClick={handleShowAnswer}>Show Answer</button> */}
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
  );
}

export default Quiz;
