import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import MyDocument from "../MyDocument/MyDocument";

function ViewCertificate() {

    const { user } = useContext(UserContext);

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
console.log("quiz history in viewcer",quizHistory)
  return (
    <>
      <h1 className="text-center text-xl dark:text-snow mb-5">
        <b>My Certificates</b>
      </h1>
        {quizHistory.quizResults &&
            quizHistory.quizResults.map((quiz) => ( 
           
         <MyDocument user={user} quiz={quiz} />
        )).sort()}
    </>
  );
}

export default ViewCertificate;
