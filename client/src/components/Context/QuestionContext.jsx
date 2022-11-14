import { createContext, useState, useEffect } from "react";
import axios from "axios";

const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  const [javaScriptData, setJavaScriptData] = useState([]);
  const [points, setPoints] = useState(0);
  const [currentWholeSession, setCurrentWholeSession] = useState("");
  const [sessionId, setSessionId] = useState("");
const [answers,setAnswers] = useState([])

  const getUser = JSON.parse(localStorage.getItem("user"));
  
  const handleCreateNewSession = async () => {
    // getQuestions();
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
            setJavaScriptData(data.data.newQuizSession.questions) ,
            console.log(data)
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(sessionId)
  console.log(javaScriptData)
  return (
    <QuestionContext.Provider
      value={{
        sessionId,
        setSessionId,
        currentWholeSession,
        setCurrentWholeSession,
        handleCreateNewSession,
        // getQuestions,
        javaScriptData,
        setPoints,
        points,
        answers,
        setAnswers
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
