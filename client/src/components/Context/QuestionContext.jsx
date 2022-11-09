import { createContext, useState, useEffect } from "react";
import axios from "axios";

const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  const [javaScriptData, setJavaScriptData] = useState([]);
  const [points, setPoints] = useState(0);
  const [sessionId, setSessionId] = useState("");
  const getQuestions = async () => {
    await axios
      .get("http://localhost:5000/questions/js", {
        withCredentials: true,
      })
      .then((data) => setJavaScriptData(data.data.javascript));
  };

  // useEffect(() => {
  //   getQuestions();
  // }, []);
  return (
    <QuestionContext.Provider
      value={{
        sessionId,
        setSessionId,
        getQuestions,
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
