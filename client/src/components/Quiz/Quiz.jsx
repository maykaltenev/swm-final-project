import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
// Import Components
import QuestionCard from "../QuestionCard/QuestionCard";
import QuestionCircles from "../QuestionsCircles/QuestionCircles";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Quiz() {
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState("");
  const { user } = useContext(UserContext);

  const {
    currentQuestion,
    setCurrentQuestion,
    getQuestions,
    handleCreateNewSession,
    javaScriptData,
    points,
    sessionId,
    setSessionId,
    allQues,
    setAllQues,
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
  //function for checking the correct answer and user answer with explanation
  const handleResult = async (sessionId) => {
    await axios
      .post("http://localhost:5000/questions/js/quiz/result", {
        sessionId: sessionId,
      })
      .then((data) => {
        setAllQues(data.data);
      })
      .then(async (allQues) => {
        await axios
          .post("http://localhost:5000/user/js/quiz/result", {
            userId: user._id,
            sessionId: sessionId,
            resultPercentage: allQues?.userAnswerPercentage,
            quizType: "javascript",
          })
          .then((data) => console.log("from update", data.data));
      });

    // console.log("from handleResult", allQues);
    // console.log("all q", allQues.userAnswerPercentage);
    // console.log(allQues);
    // await axios
    //   .post("http://localhost:5000/user/js/quiz/result", {
    //     userId: user._id,
    //     sessionId: sessionId,
    //     resultPercentage: allQues?.userAnswerPercentage,
    //     quizType: "javascript",
    //   })
    //   .then((data) => console.log("from update", data.data));
    navigate("/result");
  };
  console.log("outside", allQues);
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
        <button onClick={() => handleResult(sessionId)}>Submit</button>
      ) : (
        ""
      )}
    </>
  );
}

export default Quiz;
