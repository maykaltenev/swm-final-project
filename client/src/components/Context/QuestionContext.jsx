import { createContext, useState, useEffect } from "react";
import axios from "axios";

const QuestionContext = createContext(null);

const QuestionContextProvider = ({ children }) => {
  const [javaScriptData, setJavaScriptData] = useState([]);
  const getQuestions = async () => {
    const response = await axios.get("http://localhost:5000/questions/js", {
      withCredentials: true,
    });
    console.log(response);
    if (response.data) setJavaScriptData(response.data.javascript);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <QuestionContext.Provider value={{ javaScriptData }}>
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionContext, QuestionContextProvider };
