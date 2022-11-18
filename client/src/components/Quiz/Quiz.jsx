import React, { useState, useContext } from "react";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function Quiz() {
  const [showExplanation, setShowExplanation] = useState(false);
  const {
    currentQuestion,
    setCurrentQuestion,
    getQuestions,
    handleCreateNewSession,
    javaScriptData,
    points,
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
    navigate(`/mypage/${id * 1 < javaScriptData.length - 1 ? id * 1 + 1 : id}`);
  };
  const handleShowAnswer = (e) => {
    e.preventDefault();

    setShowExplanation((showExplanation) => !showExplanation);
    console.log(showExplanation);
  };

  return (
    <>
      <div className="quiz-main-container">
        <div className="quiz-container">
          <span>{id * 1 + 1}</span>/<span> {javaScriptData.length}</span>
          <div>Points: {points}</div>
        </div>
        <QuestionCard
          question={javaScriptData[id]}
          showExplanation={showExplanation}
          currentQuestion={id}
        />
        <button onClick={handlePrevious}> Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleShowAnswer}>Show Answer</button>
        <QuestionCircles /* setCurrentQuestion={setCurrentQuestion} */ />
      </div>
    </>
  );
}

export default Quiz;
