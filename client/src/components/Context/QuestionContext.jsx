import { createContext, useState, useEffect } from "react";
import axios from "axios";

const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  const [answers, setAnswers] = useState([]);
  const [javaScriptData, setJavaScriptData] = useState([]);
  const [points, setPoints] = useState(0);
  const [sessionId, setSessionId] = useState("");

  const getUser = JSON.parse(localStorage.getItem("user"));

  const getMarkedFromLocalStorage = () => {
    const marked = localStorage.getItem("marked");
    if (marked) {
      return JSON.parse(localStorage.getItem("marked"));
    } else {
      return [];
    }
  };
  const [marked, setMarked] = useState(getMarkedFromLocalStorage());

  const handleCreateNewSession = async () => {
    localStorage.removeItem("answers");
    localStorage.removeItem("marked");

    setAnswers([]);
    setMarked([]);
    try {
      await axios
        .post(
          "http://localhost:5000/questions/js/createQuiz",
          {
            user: getUser._id,
          },
          {
            withCredentials: true,
          }
        )
        .then(
          (data) => (
            setSessionId(data.data.newQuizSession._id),
            setJavaScriptData(data.data.newQuizSession.questions)
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <QuestionContext.Provider
      value={{
        setAnswers,
        answers,
        sessionId,
        setSessionId,
        marked,
        setMarked,
        getMarkedFromLocalStorage,
        handleCreateNewSession,
        javaScriptData,
        setPoints,
        points,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
