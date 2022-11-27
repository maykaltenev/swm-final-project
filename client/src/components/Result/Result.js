import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { Navigate, useNavigate } from "react-router-dom";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";

function Result() {
  const [result, setResult] = useState("");
  const [allQues, setAllQues] = useState("")
  console.log(allQues.userAnswerPercentage)
  const { javaScriptData, sessionId } = useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const getResult = async () => {
    const result = await axios.post(
      "http://localhost:5000/questions/js/quiz/result",
      { sessionId: sessionId }
    );

    return setResult(result);
  };
  const getUserUpdated = async () => {
    const update = await axios.post(
      "http://localhost:5000/user/js/quiz/result",
      { userId: user._id, sessionId: sessionId, resultPercentage: allQues.userAnswerPercentage, quizType: "javascript" }
    ).then(data => console.log(data))

  }
  //function for navigating to create quiz session
  const handleTryagain = () => {
    navigate("/createQuiz");
  };
  //function for checking the correct answer and user answer with explanation
  const handleCheckanswers = async () => {

    const getQuesAndAnswers = await axios.post("http://localhost:5000/questions/js/quiz/result", { sessionId: sessionId })
    console.log("getallquestions from backend", getQuesAndAnswers)
    setAllQues(getQuesAndAnswers.data)
  }

  useEffect(() => {
    getResult()
  }, [])

  console.log("all questions is:", allQues)

  return (
    <div>
      {result && (
        <div className="result-card">
          <div>
            <h1>Your Score:{result.data?.userAnswerPercentage} %</h1>{" "}
          </div>
          <div>
            <p>Total Number of Questions: {javaScriptData?.length}</p>
          </div>
          <div>
            <p>Number of Correct Answers: {result.data?.correctAnswers}</p>
          </div>
          <div>
            <p>Number of Wrong Answers: {result.data?.wrongAnswers}</p>
          </div>
          <button onClick={handleCheckanswers}>Check Answers</button>
          <button onClick={handleTryagain}>Try Again</button>
          <button onClick={getUserUpdated}>UpdateUser</button>
          <CheckAllAnswersResult allQues={allQues} />
        </div>
      )}
    </div>
  );
}

export default Result;