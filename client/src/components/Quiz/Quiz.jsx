import React, { useState, useContext } from "react";
import axios from "axios";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function Quiz() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState("");
  const {
    currentQuestion,
    setCurrentQuestion,
    getQuestions,
    handleCreateNewSession,
    javaScriptData,
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
    navigate(`/mypage/${id * 1 < javaScriptData.length - 1 ? id * 1 + 1 : id}`);
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
      {Number(id) === javaScriptData.length - 1 ? (
        <button onClick={handleResult}>Result</button>
      ) : (
        ""
      )}
      {result && (
        <div>
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
