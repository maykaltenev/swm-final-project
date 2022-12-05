import React, { useContext, useEffect } from "react";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <button
        className="bg-ultramarine-blue-2 rounded w-50 px-4 text-3xl h-14 text-bold text-snow hover:bg-red"
        onClick={handleNewQuiz}
      >
        Start New Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;
