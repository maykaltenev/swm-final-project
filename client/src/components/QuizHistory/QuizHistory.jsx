import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";

import reactimg from "../../assets/reactimg.png";
import mongodbimg from "../../assets/mongodbimg.png";
import jsimg from "../../assets/jsimg.png";
import expressimg from "../../assets/expressimg.png";
import nodeimg from "../../assets/nodeimg.png";

function QuizHistory() {
  const [result, setResult] = useState("");
  const [selected, setSelected] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

  const handleShowMore = async (sessionId) => {
    try {
      const result = await axios
        .post("http://localhost:5000/questions/quiz/result", {
          sessionId: sessionId,
        })
        .then((data) => {
          setResult(data.data);
        });
      setSelected(sessionId);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuizHistoryFromLocalStorage();
    handleShowMore();
  }, []);
  console.log(quizHistory.quizResults);
  return (
    <>
      <section className="flex min-h-screen">
        <div className=" text-gray-300 sm:w-1/4  min-h-screen  rounded-xl drop-shadow-lg my-2">
          {quizHistory.quizResults &&
            quizHistory.quizResults.map((quiz) => (
              <Fragment key={quiz.sessionId}>
                <div
                  className={`bg-dark-purple sm:h-24 items-center rounded-r-md flex-col-reverse m-px shadow-lg cursor-pointer flex justify-center  p-1 sm:flex-row sm:p-2 ${
                    quiz.sessionId === selected
                      ? "border-l-4 border-l-green-400 md:border-l-8"
                      : ""
                  } `}
                  onClick={() => handleShowMore(quiz.sessionId)}
                >
                  <div className="">
                    <img
                      className=" h-6 w-6 mr-2 sm:h-10 sm:m-2 "
                      src={
                        quiz?.quizType === "javascript"
                          ? jsimg
                          : quiz?.quizType === "react"
                          ? reactimg
                          : quiz?.quizType === "express"
                          ? expressimg
                          : quiz?.quizType === "mongodb"
                          ? mongodbimg
                          : quiz?.quizType === "nodejs"
                          ? nodeimg
                          : ""
                      }
                      alt="quiz"
                    />
                  </div>
                  <div className="sm:ml-1 z-20">
                    <h4 className="text-xs sm:text-base">{`Result: ${quiz?.resultPercentage}`}</h4>
                    <h6 className="hidden sm:block">
                      {" "}
                      {new Date(quiz?.createdOn).toLocaleString("de-DE")}
                    </h6>
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
        <div className="g:w-1/2 w-full mb-10 lg:mb-0 ">
          <CheckAllAnswersResult allQues={result} />
        </div>
      </section>
    </>
  );
}

export default QuizHistory;
