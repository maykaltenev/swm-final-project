import React, { useContext } from "react";

import { QuestionContext } from "../Context/QuestionContext";
import { UserContext } from "../Context/UserContext";

function CreateQuiz() {
  const { timer } = useContext(UserContext);
  const { handleCreateNewSession, setMarked, setSessionId, setJavaScriptData } =
    useContext(QuestionContext);
  const handleNewQuiz = () => {
    localStorage.removeItem("marked");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("answers");

    setMarked([]);
    setSessionId("");
    setJavaScriptData([]);

    handleCreateNewSession();
    timer();
  };

  return (
    <div>
      <button onClick={handleNewQuiz}>Start New Quiz</button>
    </div>
  );
}

export default CreateQuiz;
