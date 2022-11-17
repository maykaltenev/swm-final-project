import React, { useState, useContext } from "react";
import axios from "axios";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState("");

  const {
    getQuestions,
    handleCreateNewSession,
    javaScriptData,
    points,
    sessionId,
    setSessionId,
    setUserInputAnswerId,
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
  const handleResult = async () => {
    const result = await axios.post(
      "http://localhost:5000/questions/js/quiz/result",
      { sessionId: sessionId }
    );

    return setResult(result);
  };

  return (
    <>
      <div className="quiz-main-container">
        <div className="quiz-container">
          <span>{currentQuestion + 1}</span>/
          <span> {javaScriptData.length}</span>
          <div>Points: {points}</div>
        </div>
        <button onClick={handleCreateNewSession}>Start New Quiz</button>
        <QuestionCard
          question={javaScriptData[currentQuestion]}
          showExplanation={showExplanation}
          currentQuestion={currentQuestion}
        />
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={handleShowAnswer}>Show Answer</button>
      </div>
      <QuestionCircles setCurrentQuestion={setCurrentQuestion} />

      {currentQuestion === javaScriptData.length - 1 ? (
        <button onClick={handleResult}>Result</button>
      ) : (
        ""
      )}
      {result && (
        <div>
          {" "}
          <div>
            <h1>Your Score:{result.data?.userAnswerPercentage} %</h1>{" "}
          </div>
          <div>
            <p>Total Number of Questions: {javaScriptData?.length}</p>
          </div>
          <div>
            <p>
              Number of Correct Answers:{" "}
              {result.data.userCorrectAnswers?.length}
            </p>
          </div>
          <div>
            <p>
              Number of Wrong Answers: {result.data.wrongAnswersArray?.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Quiz;
