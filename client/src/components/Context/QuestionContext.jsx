import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [points, setPoints] = useState(0);

  const getUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Get Quiz Questions from localStorage

  const getQuizQuestionsFromLocalStorage = () => {
    const quizQuestions = localStorage.getItem("quizQuestions");
    if (quizQuestions) {
      return JSON.parse(localStorage.getItem("quizQuestions"));
    } else {
      return [];
    }
  };
  const [javaScriptData, setJavaScriptData] = useState(
    getQuizQuestionsFromLocalStorage()
  );

  useEffect(() => {
    getQuizQuestionsFromLocalStorage();
  }, []);

  // Get the Session ID from localStorage
  const getSessionIdFromLocalStorage = () => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      return JSON.parse(localStorage.getItem("sessionId"));
    } else {
      return "";
    }
  };
  const [sessionId, setSessionId] = useState(getSessionIdFromLocalStorage());

  // Get Marked Questions
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
    navigate(`/mypage/${currentQuestion}`);
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
            localStorage.setItem(
              "quizQuestions",
              JSON.stringify(data.data.newQuizSession.questions)
            ),
            localStorage.setItem(
              "sessionId",
              JSON.stringify(data.data.newQuizSession._id)
            )
          )
        )
        .then(() =>
          setJavaScriptData(JSON.parse(localStorage.getItem("quizQuestions")))
        )
        .then(() => {
          setSessionId(JSON.parse(localStorage.getItem("sessionId")));
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <QuestionContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        setAnswers,
        answers,
        sessionId,
        setSessionId,
        marked,
        setMarked,
        getMarkedFromLocalStorage,
        getSessionIdFromLocalStorage,
        getQuizQuestionsFromLocalStorage,
        handleCreateNewSession,
        setJavaScriptData,
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
