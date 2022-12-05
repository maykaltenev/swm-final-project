import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";

const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [points, setPoints] = useState(0);

  const getUser = JSON.parse(localStorage.getItem("user"));

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
  const [javaScriptData, setJavaScriptData] = useState(
    getQuizQuestionsFromLocalStorage()
  );

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

  useEffect(() => {
    getQuizQuestionsFromLocalStorage();
  }, [sessionId]);
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
  const { timer } = useContext(UserContext);

  const handleCreateNewSession = async (questionType) => {
    navigate(`/mypage/${currentQuestion}`);
    try {
      await axios
        .post(
          `http://localhost:5000/questions/createQuiz`,

          {
            user: getUser._id,
            questionType: questionType,
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
        })
        .then(() => timer());
    } catch (error) {}
  };
  const getUserUpdated = async (data, questionType) => {
    const update = await axios
      .post("http://localhost:5000/user/quiz/result", {
        userId: getUser._id,
        sessionId: sessionId,
        resultPercentage: data.data.userAnswerPercentage,
        quizType: questionType,
      })
      .then((data) => localStorage.setItem("user", JSON.stringify(data.data)));
  };

  const getResult = async (questionType) => {
    try {
      const result = await axios
        .post(`http://localhost:5000/questions/quiz/result`, {
          sessionId: sessionId,
        })
        .then((data) => {
          setResult(data.data);

          getUserUpdated(data, questionType);
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
        setPoints,
        points,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
