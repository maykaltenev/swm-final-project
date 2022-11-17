import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionContext } from "../Context/QuestionContext";

function CreateQuiz() {
  const { handleCreateNewSession, setAnswers, setMarked } =
    useContext(QuestionContext);
  const handleNewQuiz = () => {
    localStorage.removeItem("answers");
    localStorage.removeItem("marked");

    setAnswers([]);
    setMarked([]);

    handleCreateNewSession();
  };

  return (
    <div>
      <button onClick={handleNewQuiz}>Start New Quiz</button>
    </div>
  );
}

export default CreateQuiz;
