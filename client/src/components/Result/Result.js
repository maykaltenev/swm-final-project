import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Context
import { QuestionContext } from "../Context/QuestionContext";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";
import SideBar from "../SideBar/SideBar";
function Result() {
  const [show, setShow] = useState(false);
  const { javaScriptData, result, getResult } = useContext(QuestionContext);

  const navigate = useNavigate();

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
  return (
    <div className="h-screen dark:text-black font-poppins">
    <div className=" flex justify-center  ml-40 ">
      <SideBar />
      {result && (
        <div className="bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-3/4 sm:p-5">
          <div className="my-4 py-1 rounded-md  shadow-md list-none	px-3 mb-6">
            <h1 className="font-bold">Your Score:{result?.userAnswerPercentage} %</h1>{" "}
          </div>
          <div className="my-4 py-1 rounded-md  shadow-md list-none	px-3 mb-6">
            <p>Total Number of Questions: {javaScriptData?.length}</p>
          </div>
          <div className="my-4 py-1 rounded-md  shadow-md list-none	px-3 mb-6">
            <p>Number of Correct Answers: {result?.correctAnswers}</p>
          </div>
          <div className="my-4 py-1 rounded-md  shadow-md list-none	px-3 mb-6">
            <p>Number of Wrong Answers: {result?.wrongAnswers}</p>
          </div>
          {<button className="bg-btn-majorelle-blue font-poppins mx-px px-5 rounded-full text-white py-2" onClick={handleCheckAnswers}>Check Answers</button>}
          <button className="bg-btn-majorelle-blue font-poppins mx-px px-5 rounded-full text-white py-2" onClick={handleTryAgain}>Try Again</button>

          {show && <CheckAllAnswersResult allQues={result} />}
        </div>
      )}
    </div>
    </div>
  );
}

export default Result;
