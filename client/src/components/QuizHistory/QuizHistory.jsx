import axios from "axios";
import { useState, useEffect, Fragment, useContext } from "react";
import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";
import { UserContext } from "../Context/UserContext";
import reactimg from "../../assets/reactimg.png";
import mongodbimg from "../../assets/mongodbimg.png";
import jsimg from "../../assets/jsimg.png";
import expressimg from "../../assets/expressimg.png";
import nodeimg from "../../assets/nodeimg.png";

function QuizHistory() {
  const [result, setResult] = useState("");
  const [selected, setSelected] = useState("");
  const { user } = useContext(UserContext);

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
  console.log(quizHistory);
  const handleShowMore = async (sessionId) => {
    try {
      const result = await axios
        .post("http://localhost:5000/questions/quiz/result", {
          sessionId: sessionId,
        })
        .then((data) => {
          setResult(data.data);
          console.log("the setresult is", data.data);
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
      <section className="flex min-h-screen w-screen sm:w-full ">
        <div className=" text-gray-300 w-1/4 mx-2 sm:w-1/5  min-h-screen  rounded-xl drop-shadow-lg ">
          {quizHistory?.quizResults &&
            quizHistory?.quizResults
              ?.slice()
              .reverse()
              .map((quiz) => (
                <Fragment key={quiz.sessionId}>
                  <div
                    className={`hover:shadow transition duration-200 
                    bg-text-ghost-white text-nav-raisin-black shadow-7xl
                    dark:bg-nav-raisin-black-4 dark:text-text-ghost-white sm:w-full  h-24 items-center rounded-r-md flex-col-reverse m-px shadow-5xl my-2 cursor-pointer flex justify-center  p-1 sm:flex-row sm:p-2 ${
                      quiz.sessionId === selected
                        ? "border-l-4 border-l-green-400 rounded-md md:border-l-8"
                        : ""
                    } `}
                    onClick={() => handleShowMore(quiz.sessionId)}
                  >
                    <div className="w-full  h-full flex justify-center items-center">
                      <img
                        className=" w-2/3 h-2/3 sm:w-fit sm:h-2/3   "
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
        <div className=" w-full mb-10 lg:mb-0 mr-2">
          <CheckAllAnswersResult allQues={result} />
        </div>
      </section>
    </>
  );
}

export default QuizHistory;
