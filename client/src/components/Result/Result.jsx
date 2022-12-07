import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";
import {MyDocument} from "../Certificate/Certificate"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";


function Result() {
  const [show, setShow] = useState(false);
  const { questionData, result, getResult,sessionId } = useContext(QuestionContext);
const{user}= useContext(UserContext);
  const navigate = useNavigate();

  const getQuizHistoryFromLocalStorage = () => {
    const quizHistory = localStorage.getItem("user");
    if (quizHistory) {
      return JSON.parse(localStorage.getItem("user"));
    } else {
      return [];
    }
  };
  const [quizHistory, setQuizHistory] = useState(
    getQuizHistoryFromLocalStorage
  );

  //function for navigating to create quiz session
  const handleTryAgain = () => {
    navigate("/createQuiz");
  };

  useEffect(() => {
    getResult();
  }, []);

  const handleCheckAnswers = () => {
    setShow(!show);
  };
  console.log("the result is",result)
  return (
    <div>
      {result && (
        <div className="result-card">
          <div>
            <h1>Your Score:{result?.userAnswerPercentage} %</h1>{" "}
          </div>
          <div>
            <p>Total Number of Questions: {questionData?.length}</p>
          </div>
          <div>
            <p>Number of Correct Answers: {result?.correctAnswers}</p>
          </div>
          <div>
            <p>Number of Wrong Answers: {result?.wrongAnswers}</p>
          </div>
          {<button onClick={handleCheckAnswers}>Check Answers</button>}
          <button onClick={handleTryAgain}>Try Again</button>

          {show && <CheckAllAnswersResult allQues={result} />}

          {quizHistory.quizResults &&
            quizHistory.quizResults.map((quiz) => (
              quiz.resultPercentage ? 
              <>
              ( <PDFViewer>
                <MyDocument 
                date={quiz.createdOn} 
                inputType={quiz.quizType} 
                sessionId={quiz.sessionId}
                 name={`${user.firstName} ${user.lastName } `} 
                 percentage={quiz.resultPercentage}/>
                 </PDFViewer>
              <PDFDownloadLink document={<MyDocument 
                date={quiz.createdOn} 
                inputType={quiz.quizType} 
                sessionId={quiz.sessionId}
                 name={`${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName } `} 
                 percentage={quiz.resultPercentage}/> } fileName="certificate.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : <button className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue">Download now!</button>
          }
        </PDFDownloadLink> )  </>
             :
             ""
           
            ))
            }
           
        </div>
      )}
    </div>
  );
}

export default Result;
