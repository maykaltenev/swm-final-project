import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";
import {Certificate} from "../Certificate/Certificate"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
//images
import reactimg from "../../assets/reactimg.png";
import mongodbimg from "../../assets/mongodbimg.png";
import jsimg from "../../assets/jsimg.png";
import expressimg from "../../assets/expressimg.png";
import nodeimg from "../../assets/nodeimg.png";
import Popup from "../Popup/Popup";

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
  console.log("the quiz history is:",quizHistory)
  console.log("last",quizHistory?.quizResults[quizHistory?.quizResults?.length -1])
 
  return (
    <div className="container flex mb-6 dark:text-black py-26 font-poppins justify-center ">
      {result && (
        <div className="p-4 sm:w-3/6 hover:shadow-xl hover:scale-105  transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5" >
            <h1>Your Score: <b>{result?.userAnswerPercentage}  %</b> </h1>{" "}
          </div>
          <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5" >
            <p>Total Number of Questions: {questionData?.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
            <p>Number of Correct Answers: {result?.correctAnswers}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
            <p>Number of Wrong Answers: {result?.wrongAnswers}</p>
          </div>
          <div className="flex">
          <button className="mb-2 md:w-2/4 md:p-3 md:mr-2 sm:mb-0 rounded font-medium inline-flex w-full sm:w-2/4 items-center justify-center bg-cyber-yellow px-6 py-3 text-bg-ultramarine-blue-2  text-ultramarine-blue hover:bg-javascript-yellow " onClick={handleCheckAnswers}>Check Answers</button>
          <button className="rounded md:w-2/4 md:p-3 font-medium inline-flex w-full sm:w-1/3 items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue " onClick={handleTryAgain}>Try Again</button>
          </div>
          {show && <CheckAllAnswersResult allQues={result} />}    
          {/* display the certificate message only if the percentage score is greater than equal to 80 */}  

          {result?.userAnswerPercentage >=15 ? (
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <h5>Congrats!! You won a Certificate!!!</h5>
              <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5" >
            <p>For: {quizHistory?.quizResults?.quizType}</p>
                 </div>
          <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5" >
            <p>Date: {quizHistory[quizHistory.length -1]?.quizResults && quizHistory[quizHistory.length -1]?.quizResults?.createdOn}</p>
          </div>
              <button className="rounded md:w-2/4 md:p-3 font-medium inline-flex w-full sm:w-1/3 items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue "> Certificate Preview</button>
            </div>
          )          
          :
          ""}
        </div>
      )}
    </div>
  );
}

export default Result;
  {/*   {quizHistory.quizResults &&
            quizHistory.quizResults.map((quiz) => (
              quiz.resultPercentage ? "Congrats You are eligible for a Certificate":""))
            } */}
/*  <>
  <PDFViewer>
   <Certificate
   date={quiz.createdOn} 
   inputType={quiz.quizType} 
   sessionId={quiz.sessionId}
    name={`${user.firstName} ${user.lastName } `} 
    percentage={quiz.resultPercentage}
    inputTypeImage={quiz?.quizType === "javascript"
   ? jsimg
   : quiz?.quizType === "react"
   ? reactimg
   : quiz?.quizType === "express"
   ? expressimg
   : quiz?.quizType === "mongodb"
   ? mongodbimg
   : quiz?.quizType === "nodejs"
   ? nodeimg
   : ""}
   />
    </PDFViewer>
 <PDFDownloadLink document={<Certificate
   date={quiz.createdOn} 
   inputType={quiz.quizType.charAt(0).toUpperCase() + quiz.quizType.slice(1)} 
inputTypeImage={quiz?.quizType === "javascript"
? jsimg
: quiz?.quizType === "react"
? reactimg
: quiz?.quizType === "express"
? expressimg
: quiz?.quizType === "mongodb"
? mongodbimg
: quiz?.quizType === "nodejs"
? nodeimg
: ""}
   sessionId={quiz.sessionId}
    name={`${user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1)} ${user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1) } `} 
    percentage={quiz.resultPercentage}/> } fileName="certificate.pdf">
{({ blob, url, loading, error }) =>
loading ? "Loading document..." : <button className="pointer-cursor bg-btn-majorelle-blue border-2 border-bg-menu-dark-silver-metallic py-2 px-6 rounded hover:bg-link-violet-blue">Download now!</button>
}
</PDFDownloadLink> </> */
