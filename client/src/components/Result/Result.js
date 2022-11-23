import React, { useContext, useState, useEffect } from 'react'
import axios from "axios"
// Context
import { QuestionContext } from "../Context/QuestionContext";

function Result() {
    const [result, setResult] = useState("");
    const { javaScriptData,sessionId,} = useContext(QuestionContext);

    const getResult = async() => {
        const result = await axios.post(
            "http://localhost:5000/questions/js/quiz/result",
            { sessionId: sessionId })
         return setResult(result)  
    }
console.log("the result is:",result)

   useEffect(() => {
    getResult()
   }) 
      
  return (
    <div>
        
        {result && (
            <div className = "result-card">
            <div>
              <h1>Your Score:{result.data?.userAnswerPercentage} %</h1>{" "}
            </div>
            <div>
              <p>Total Number of Questions: {javaScriptData?.length}</p>
            </div>
            <div>
              <p>Number of Correct Answers: {result.data?.correctAnswers}</p>
            </div>
            <div>
              <p>Number of Wrong Answers: {result.data?.wrongAnswers}</p>
            </div>
          </div>
        )}
    </div>
  )
}

export default Result
/* const result = await axios.post(
      "http://localhost:5000/questions/js/quiz/result",
      { sessionId: sessionId }
    );

    return setResult(result); */
    /*   {result && (
        <div>
          <div>
            <h1>Your Score:{result.data?.userAnswerPercentage} %</h1>{" "}
          </div>
          <div>
            <p>Total Number of Questions: {javaScriptData?.length}</p>
          </div>
          <div>
            <p>Number of Correct Answers: {result.data?.correctAnswers}</p>
          </div>
          <div>
            <p>Number of Wrong Answers: {result.data?.wrongAnswers}</p>
          </div>
        </div>
      )} */