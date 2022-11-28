import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { Navigate, useNavigate } from "react-router-dom";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";

function Result() {
  const [show, setShow] = useState(false);
  // const [allQues, setAllQues] = useState("")

  const { javaScriptData, sessionId, allQues } = useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // const getUserUpdated = async () => {
  //   const update = await axios.post(
  //     "http://localhost:5000/user/js/quiz/result",
  //     { userId: user._id, sessionId: sessionId, resultPercentage: allQues?.userAnswerPercentage, quizType: "javascript" }
  //   ).then(data => console.log(data))

  // }
  //function for navigating to create quiz session
  const handleTryagain = () => {
    navigate("/createQuiz");
  };

  return (
    <div>
      {(
        <div className={show ? "show" : "hidden"}>
          <div>
            <h1>Your Score:{allQues?.userAnswerPercentage} %</h1>{" "}
          </div>
          <div>
            <p>Total Number of Questions: {javaScriptData?.length}</p>
          </div>
          <div>
            <p>Number of Correct Answers: {allQues?.correctAnswers}</p>
          </div>
          <div>
            <p>Number of Wrong Answers: {allQues?.wrongAnswers}</p>
          </div>
          <button onClick={() => setShow(!show)}>Check Answers</button>
          <button onClick={handleTryagain}>Try Again</button>
          {/* <button onClick={getUserUpdated}>UpdateUser</button> */}
          {show && <CheckAllAnswersResult allQues={allQues} />}

        </div>
      )}
    </div>


  );
}

export default Result;