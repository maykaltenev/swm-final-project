import axios from "axios";
import { useState, useEffect } from "react";

import CheckAllAnswersResult from "../CheckAllAnswersResult/CheckAllAnswersResult";

function QuizHistory() {
  const [result, setResult] = useState("");

  console.log("result", result);

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
        .post("http://localhost:5000/questions/js/quiz/result", {
          sessionId: sessionId,
        })
        .then((data) => {
          setResult(data.data);
        });
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
    <div>
      {quizHistory.quizResults &&
        quizHistory.quizResults.map((quiz) => (
          <>
            <div key={quiz.sessionId} style={{ border: "1px black solid" }}>
              <h3>{`Quiz Type : ${quiz?.quizType}`}</h3>
              <h4>{`quiz Percentage : ${quiz?.resultPercentage}`}</h4>
              <h6> {new Date(quiz?.createdOn).toUTCString()}</h6>
              <button onClick={() => handleShowMore(quiz.sessionId)}>
                Show More
              </button>
            </div>
          </>
        ))}
      <CheckAllAnswersResult allQues={result} />
    </div>
  );
}

export default QuizHistory;
