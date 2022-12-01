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
  console.log("qiz", quizHistory);
  const handleShowMore = async (sessionId) => {
    try {
      const result = await axios
        .post("http://localhost:5000/questions/js/quiz/result", {
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

  return (
    <section className="flex">
      <div className="text-gray-300 w-1/5  min-h-screen  rounded-xl drop-shadow-lg my-2">
        {quizHistory.quizResults &&
          quizHistory.quizResults.map((quiz) => (
            <Fragment key={quiz.sessionId}>
              <div
                className={`bg-card-space-cadet text-ghost-white sm:h-24 items-center rounded-r-md flex-col-reverse m-px shadow-lg cursor-pointer flex justify-center  p-1 sm:flex-row sm:p-2 ${
                  quiz.sessionId === selected
                    ? "border-l-4 border-l-link-cyber-yellow md:border-l-8"
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
                        : quiz?.quizType === "node"
                        ? nodeimg
                        : ""
                    }
                    alt="quiz"
                  />
                </div>
                <div className="sm:ml-1">
                  <h4 className="text-xs sm:text-base">{`Result: ${quiz?.resultPercentage}`}</h4>
                  <h6 className="hidden sm:block">
                    {" "}
                    {new Date(quiz?.createdOn).toUTCString()}
                  </h6>
                </div>
              </div>
            </Fragment>
          ))}
      </div>
      <div className="dark:text-gray-800 g:w-1/2 w-full mb-10 lg:mb-0 ">
        <CheckAllAnswersResult allQues={result} />
      </div>
    </section>
  );
}

export default QuizHistory;
