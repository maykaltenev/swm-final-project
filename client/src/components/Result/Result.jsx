import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";
function Result() {
  const [show, setShow] = useState(false);
  const { questionData, result, getResult } = useContext(QuestionContext);

  const navigate = useNavigate();

  //function for navigating to create quiz session
  const handleTryAgain = () => {
    navigate("/createQuiz");
  };

  useEffect(() => {
    getResult();
  }, []);

  const handleCheckAnswers = () => {
    setShow(!show);
  };
  return (
    <div>
      {result && (
        <div className="result-card">
          <div>
            <h1>Your Score:{result?.userAnswerPercentage} %</h1>{" "}
          </div>
          <div>
            <p>Total Number of Questions: {questionData?.length}</p>
          </div>
          <div>
            <p>Number of Correct Answers: {result?.correctAnswers}</p>
          </div>
          <div>
            <p>Number of Wrong Answers: {result?.wrongAnswers}</p>
          </div>
          {<button onClick={handleCheckAnswers}>Check Answers</button>}
          <button onClick={handleTryAgain}>Try Again</button>
          {show && <CheckAllAnswersResult allQues={result} />}
        </div>
      )}
    </div>
  );
}

export default Result;
