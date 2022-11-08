import { createContext, useState, useEffect } from "react";
import axios from "axios";

const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  const [javaScriptData, setJavaScriptData] = useState([]);
  const [points, setPoints] = useState(0);
  const getQuestions = async () => {
    const response = await axios.get("http://localhost:5000/questions/js", {
      withCredentials: true,
    });

    if (response.data) setJavaScriptData(response.data.javascript);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <QuestionContext.Provider value={{ javaScriptData, setPoints, points }}>
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
