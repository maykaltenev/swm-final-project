import React, { useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useContext } from "react";
import { QuestionContext } from "../Context/QuestionContext";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { javaScriptData, points } = useContext(QuestionContext);
  // const [userResponses, setA] = useState(javaScriptData.map(() => {}));

  // userResponses
  /* [{
    id: id of question
    selectedAnswerId: id of the answer - undefined or null
   }]
   
   const updatedResponses = [...userResponses]

   updateResponses.find

   */

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
    <div className="quiz-main-container">
      <div className="quiz-container">
        <span>{currentQuestion + 1}</span>/<span> {javaScriptData.length}</span>
        <div>Points: {points}</div>
      </div>
      <QuestionCard
        question={javaScriptData[currentQuestion]}
        showExplanation={showExplanation}
      />
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <button onClick={handleShowAnswer}>Show Answer</button>
    </div>
  );
}

export default Quiz;
