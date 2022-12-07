import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";
import { Certificate } from "../Certificate/Certificate";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
//images
import reactimg from "../../assets/reactimg.png";
import mongodbimg from "../../assets/mongodbimg.png";
import jsimg from "../../assets/jsimg.png";
import expressimg from "../../assets/expressimg.png";
import nodeimg from "../../assets/nodeimg.png";



function Result() {
  const [show, setShow] = useState(false);
  const { questionData, result, getResult, sessionId } =
    useContext(QuestionContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState(false);

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

  //hanlde preview
  const handlePreview = () => {
    setCertificates(!certificates);
  };

   

  return (
    <>
      <h1 className="text-center text-xl dark:text-snow ">
        <b> Your Results</b>
      </h1>

      <div className="container flex mb-6 dark:text-black py-26 font-poppins justify-center ">
        {result && (
          <div className="p-4 sm:w-3/6 hover:shadow-xl hover:scale-105  transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <h1>Your Score: {result?.userAnswerPercentage} % </h1>{" "}
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <p>Total Number of Questions: {questionData?.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <p>Number of Correct Answers: {result?.correctAnswers}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <p>Number of Wrong Answers: {result?.wrongAnswers}</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <p className="text-center text-lg">
                <b>
              {result?.userAnswerPercentage >= 80
                ? "Excellent Score! Way to Go!!"
                : result?.userAnswerPercentage >= 60 &&
                  result?.userAnswerPercentage < 80
                ? "You are almost there!!!"
                : result?.userAnswerPercentage >= 50 &&
                  result?.userAnswerPercentage < 60
                ? "You can do Better!! Practice a bit more!!"
                :result?.userAnswerPercentage < 50
                ? "Neverthless! Practice More ! You will reach Heights!!"
                :""
              }
              </b>
              </p>
            </div>
            <div className="flex">
              <button
                className="mb-2 md:w-2/4 md:p-3 md:mr-2 sm:mb-0 rounded font-medium inline-flex w-full sm:w-2/4 items-center justify-center bg-cyber-yellow px-6 py-3 text-bg-ultramarine-blue-2  text-ultramarine-blue hover:bg-javascript-yellow "
                onClick={handleCheckAnswers}
              >
                Check Answers
              </button>
              <button
                className="rounded md:w-2/4 md:p-3 font-medium inline-flex w-full sm:w-1/3 items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue "
                onClick={handleTryAgain}
              >
                Try Again
              </button>
            </div>
            {show && <CheckAllAnswersResult allQues={result} />}
            {/* display the certificate message only if the percentage score is greater than equal to 80 */}
          </div>
        )}
      </div>
      <div className="container flex mb-6 dark:text-black py-26 font-poppins justify-center  ">
      <div className="p-4 sm:w-3/6 hover:shadow-xl hover:scale-105  transition duration-300 h-full dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        {result?.userAnswerPercentage >= 15 ? (
          <>
          <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
            <h5>
              <b>
                <i>Congrats!!! You are eligible for a Certificate!</i>
              </b>
            </h5>
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <p>
                For:{" "}
                {quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ].quizType
                  .charAt(0)
                  .toUpperCase() +
                  quizHistory?.quizResults[
                    quizHistory?.quizResults?.length - 1
                  ].quizType.slice(1)}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-5/4 sm:p-5">
              <p>
                Date:{" "}
                {new Date(
                  quizHistory?.quizResults[
                    quizHistory?.quizResults?.length - 1
                  ].createdOn
                ).toLocaleString("de-DE")}
              </p>
            </div>
            <button
              onClick={handlePreview}
              className="rounded md:w-2/4 md:p-3 font-medium inline-flex w-full sm:w-1/3 items-center justify-center bg-ultramarine-blue px-6 py-3 text-cyber-yellow hover:bg-ultramarine-blue-2  bg-ultramarine-blue "
            >
              {" "}
              Certificate Preview
            </button>
            
          </div>
          
          <div className="border-4 w-3/4 h-3/4 container flex  mb-6 dark:text-black py-26 font-poppins justify-center">
          <div className="border-8 w-full h-full p-4 hover:shadow-xl hover:scale-105  transition duration-300  dark:bg-oxford-blue border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            {/* if the user clicks the certificate preview button, show the certificate */}
            {certificates && <PDFViewer><Certificate
                date={quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ].createdOn} 
                inputType={quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ].quizType} 
                sessionId={quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ].sessionId}
                 name={`${user.firstName} ${user.lastName } `} 
                 percentage={quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ].resultPercentage}
                 inputTypeImage={quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ].quizType === "javascript"
                ? jsimg
                : quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ].quizType === "react"
                ? reactimg
                : quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ]?.quizType === "express"
                ? expressimg
                : quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ]?.quizType === "mongodb"
                ? mongodbimg
                : quizHistory?.quizResults[
                  quizHistory?.quizResults?.length - 1
                ]?.quizType === "nodejs"
                ? nodeimg
                : ""}
                /></PDFViewer>}
          </div>
          </div>
          </>
        ) : (
          ""
        )}
        </div>
      </div>
    </>
  );
}

export default Result;
