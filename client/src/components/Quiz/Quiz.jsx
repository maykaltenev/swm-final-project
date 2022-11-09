import React, { useState } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import { useContext } from "react";
import { QuestionContext } from "../Context/QuestionContext";
import axios from "axios";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { getQuestions, javaScriptData, points, setSessionId } =
    useContext(QuestionContext);
  const getUser = JSON.parse(localStorage.getItem("user"));
  // const [userResponses, setA] = useState(javaScriptData.map(() => {}));
  // userResponses
  /* [{
    id: id of question
    selectedAnswerId: id of the answer - undefined or null
   }]
   const updatedResponses = [...userResponses]
   updateResponses.find
   */
  const handleCreateNewSession = async () => {
    getQuestions();

    try {
      await axios
        .post(
          "http://localhost:5000/questions/js/createQuiz",
          {
            user: getUser._id,
            questions: javaScriptData,
          },
          {
            withCredentials: true,
          }
        )
        // .then((data) => console.log(data));
        .then((data) => setSessionId(data.data.newQuizSession._id));
    } catch (error) {
      console.log(error);
    }

    // localStorage.setItem("user", JSON.stringify(data.data.user))

    // .then(() => {
    //   localStorageUser();
    // });
  };

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
      <button onClick={handleCreateNewSession}>Start New Quiz</button>
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
