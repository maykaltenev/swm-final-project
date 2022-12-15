import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import MyDocument from "../MyDocument/MyDocument";

function ViewCertificate() {
  const { user } = useContext(UserContext);
/* get the quiz history from local storage */
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
/* display all the result of the user eligible for certificate */
  return (
    <div className="container dark:bg-nav-raisin-black  dark:shadow-4xl w-screen sm:w-full  min-h-screen flex flex-col justify-center items-center ">
      <h1 className="text-center text-xl dark:text-snow mb-5">
        <b>My Certificates</b>
      </h1>
{/* if the result percentage is >=80 display the Certificate, so that user can download */}
      {quizHistory?.quizResults &&
        quizHistory?.quizResults
          ?.slice()
          .reverse()
          .map((quiz) =>
            quiz?.resultPercentage >= 15 ? (
              <MyDocument user={user} quiz={quiz} />
            ) : (
              ""
            )
          )}
    </div>
  );
}

export default ViewCertificate;
