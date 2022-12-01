import React, { useContext } from "react";

import { QuestionContext } from "../Context/QuestionContext";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";

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
    <div className="ml-20">
      <SideBar />
      <button
        className="bg-btn-majorelle-blue font-poppins mx-px px-5 rounded-full text-white py-2"
        onClick={handleNewQuiz}
      >
        Start New Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;
