import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const QuestionContext = createContext(null);

// const [points, setPoints] = useState(0);
const QuestionContextProvider = ({ children }) => {
  /* setting state for the current question */
  const [currentQuestion, setCurrentQuestion] = useState(0);
  /* getting the user from the local storage */
  const getUser = JSON.parse(localStorage.getItem("user"));
  /* creating a state to get the result of the user */
  const [result, setResult] = useState("");

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
  /* setting state for questions from local storage */
  const [javaScriptData, setJavaScriptData] = useState(
    getQuizQuestionsFromLocalStorage()
  );
  /* quiz questions from local storage rendered only once with use effect */
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
  /* setting state for session id */
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
  /* state for marked and unmarked  */
  const [marked, setMarked] = useState(getMarkedFromLocalStorage());

  /* function to create a quiz session ,store the quiz sessions , session id on the local storage & then get it from local local storage*/
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
  /* updating the result of the user by the session id on the local storage */
  const getUserUpdated = async (data) => {
    const update = await axios
      .post("http://localhost:5000/user/js/quiz/result", {
        userId: getUser._id,
        sessionId: sessionId,
        resultPercentage: data.data.userAnswerPercentage,
        quizType: "javascript",
      })
      .then((data) => localStorage.setItem("user", JSON.stringify(data.data)));
  }; 
  /* get the result from db */
  const getResult = async () => {
    try {
      const result = await axios
        .post("http://localhost:5000/questions/js/quiz/result", {
          sessionId: sessionId,
        })
        .then((data) => {
          setResult(data.data);
          getUserUpdated(data);
        });
      navigate("/result");
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        getResult,
        /* getUserUpdated, */
        result,
        currentQuestion,
        setCurrentQuestion,
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
        /* setPoints,
        points, */
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
