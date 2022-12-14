import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { differenceInSeconds } from "date-fns";
const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  // States
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { timer } = useContext(UserContext);
  const [points, setPoints] = useState(0);

  const getUser = JSON.parse(localStorage.getItem("user"));
  const [result, setResult] = useState("");

  const [timeOver, setTimeOver] = useState(false);

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
  const [questionData, setQuestionData] = useState(
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
//getting quiztine from local storage
  const getQuizTimeFromLocalStorage = () => {
    const quizTime = localStorage.getItem("quizTime");
    if (quizTime) {
      return JSON.parse(localStorage.getItem("quizTime"));
    } else {
      return "";
    }
  };
  const [quizTime, setQuizTime] = useState(getQuizTimeFromLocalStorage());

  const date = new Date();
  const duration = 600;
  const [timeDifference, setTimeDifference] = useState(
    differenceInSeconds(new Date(quizTime?.end), date)
  );
  console.log("timeOver", timeOver);
/* generate a new quiz session by clearing all the old datas from local storage */
  const handleNewQuiz = (chosenQuestionType, level) => {
    localStorage.removeItem("marked");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("answers");
    setCurrentQuestion(0);
    setTimeOver(false);
    setMarked([]);
    setSessionId("");
    setQuestionData([]);
    setCurrentQuestion(0);
    getQuizTimeFromLocalStorage();
    setTimeDifference(duration);
    handleCreateNewSession(chosenQuestionType, level);
    timer();
  };
/* creating a new quiz session, start with question Index:0 , and get the questions from db using axios wrt the userID, question type and level */
  const handleCreateNewSession = async (questionType, level) => {
    // navigate(`/mypage/${currentQuestion}`);
    navigate(`/mypage/0`);
    try {
      await axios
        .post(
          process.env.REACT_APP_BASE_URL + "/questions/createQuiz",
          {
            user: getUser._id,
            questionType: questionType,
            level: level,
          },
          {
            withCredentials: true,
          }
        )
        .then( //set the response on the local storage
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
          setQuestionData(JSON.parse(localStorage.getItem("quizQuestions")))
        )
        .then(() => {
          setSessionId(JSON.parse(localStorage.getItem("sessionId")));
        });
    } catch (error) {
      console.log(error);
    }
  };
  /* creating a new mix quiz session, start with question Index:0 , and get the questions from db using axios wrt the userID, mix question type  */
  const handleCreateMixSession = async (mixQuestionType) => {
    // navigate(`/mypage/${currentQuestion}`);
    navigate(`/mypage/0`);
    console.log("from context", mixQuestionType);
    try {
      await axios
        .post(
          process.env.REACT_APP_BASE_URL + "/questions/createMixQuiz",
          {
            user: getUser._id,
            mixQuestionType: mixQuestionType,
          },
          {
            withCredentials: true,
          }
        )
        .then( // set the reponse to local storage
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
          setQuestionData(JSON.parse(localStorage.getItem("quizQuestions")))
        )
        .then(() => {
          setSessionId(JSON.parse(localStorage.getItem("sessionId")));
        });
    } catch (error) {
      console.log(error);
    }
  };
  /* update the user array with sessionid, result , quiz type */
  const getUserUpdated = async (data, questionType) => {
    console.log(data);
    const update = await axios
      .post(process.env.REACT_APP_BASE_URL + "/user/quiz/result", {
        userId: getUser?._id,
        sessionId: sessionId,
        resultPercentage: data?.data?.userAnswerPercentage,
        quizType: questionType,
      })
      .then((data) => localStorage.setItem("user", JSON.stringify(data.data)));
  };
/* getting the result from db and navigate to result page */
  const getResult = async (questionType) => {
    try {
      const result = await axios
        .post(process.env.REACT_APP_BASE_URL + "/questions/quiz/result", {
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
  const handleTimeOver = () => {
    setTimeOver(true);
  };
  return (
    <QuestionContext.Provider
      value={{
        setTimeDifference,
        setTimeOver,
        timeOver,
        handleTimeOver,
        duration,
        quizTime,
        timeDifference,
        setTimeDifference,
        getResult,
        /* getUserUpdated, */
        handleNewQuiz,
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
        setQuestionData,
        questionData,
        setPoints,
        points,
        handleCreateMixSession,
        getQuizTimeFromLocalStorage,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
