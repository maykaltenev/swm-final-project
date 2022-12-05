import React, { useContext, useEffect } from "react";
import { useState } from "react";

import { QuestionContext } from "../Context/QuestionContext";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";

function CreateQuiz() {
  const { timer } = useContext(UserContext);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const { handleCreateNewSession, setMarked, setSessionId, setQuestionData } =
    useContext(QuestionContext);
  const handleNewQuiz = (chosenQuestionType) => {
    localStorage.removeItem("marked");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("answers");

    setMarked([]);
    setSessionId("");
    setQuestionData([]);

    handleCreateNewSession(chosenQuestionType);
    timer();
  };
  const handleChangeOption = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") return;
    setSelectedQuestionType(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <select onChange={handleChangeOption}>
        <option value={""}>Select</option>
        <option value="react">React</option>
        <option value="nodejs">Nodejs</option>
        <option value="javascript">JavaScript</option>
        <option value="express">Express</option>
        <option value="mongodb">MongoDB</option>
      </select>
      <button
        disabled={selectedQuestionType === ""}
        className="bg-ultramarine-blue-2 rounded w-50 px-4 text-3xl h-14 text-bold text-snow hover:bg-red"
        onClick={() => handleNewQuiz(selectedQuestionType)}
      >
        Start New Quiz
      </button>
    </div>
  );
}

export default CreateQuiz;
