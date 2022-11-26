import React, { useContext, useEffect } from "react";
import axios from "axios"
import { QuestionContext } from "../Context/QuestionContext";
import { UserContext } from "../Context/UserContext";
import { useParams, useHistory} from "react-router-dom"

function CreateQuiz() {
  const { timer } = useContext(UserContext);
  const { handleCreateNewSession, setMarked, setSessionId, setJavaScriptData } =
    useContext(QuestionContext);

    const {id} = useParams()
   
    useEffect(() => {
      
      const getData = async () => {
        const response = await axios.get('/user/createquiz/'+ id)
  
        console.log('response:', response) 
    }
    getData()
  },[])

  const handleNewQuiz = () => {
    localStorage.removeItem("marked");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("answers");

    setMarked([]);
    setSessionId("");
    setJavaScriptData([]);

    handleCreateNewSession();
    timer();
  };

  return (
    <div>
      <button onClick={handleNewQuiz}>Start New Quiz</button>
    </div>
  );
}

export default CreateQuiz;
