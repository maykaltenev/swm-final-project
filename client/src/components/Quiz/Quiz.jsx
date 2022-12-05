import React, { useState, useContext, useEffect } from "react";

// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { Link, useNavigate, useParams } from "react-router-dom";

function Quiz() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { getResult, setCurrentQuestion, javaScriptData, points } =
    useContext(QuestionContext);

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
      <div className="quiz-main-container ml-60">
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
        {Number(id) === javaScriptData.length - 1 ? (
          <button
            className="mb-80"
            onClick={() => getResult(javaScriptData[0]?.questionType)}
          >
            Submit
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Quiz;
