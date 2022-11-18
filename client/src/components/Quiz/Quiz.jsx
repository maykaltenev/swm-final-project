import React, { useState, useContext } from "react";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import CountDownTimer from "../Timer/Timer";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const {
    getQuestions,
    handleCreateNewSession,
    javaScriptData,
    points,
    setSessionId,
  } = useContext(QuestionContext);

  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentQuestion(currentQuestion + 1);
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
          <span>{currentQuestion + 1}</span>/
          <span> {javaScriptData.length}</span>
          <div>Points: {points}</div>
        </div>
        <QuestionCard
          question={javaScriptData[currentQuestion]}
          showExplanation={showExplanation}
          currentQuestion={currentQuestion}
        />
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleShowAnswer}>Show Answer</button>
        <QuestionCircles setCurrentQuestion={setCurrentQuestion} />
      </div>
    </>
  );
}

export default Quiz;
