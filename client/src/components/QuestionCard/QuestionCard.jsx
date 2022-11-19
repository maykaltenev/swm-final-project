import axios from "axios";
import { set } from "date-fns/esm";
import React, { useContext, useState, useEffect } from "react";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

// Context
import { QuestionContext } from "../Context/QuestionContext";
import CountDownTimer from "../Timer/Timer";

//styles
import style from "./Question.module.css";

export default function QuestionCard({
  question,
  showAnswer,
  currentQuestion,
}) {
  //Context
  const {
    sessionId,
    setAnswers,
    answers,
    getMarkedFromLocalStorage,
    marked,
    setMarked,
    getSessionIdFromLocalStorage,
    getQuizQuestionsFromLocalStorage,
  } = useContext(QuestionContext);

  const getUser = JSON.parse(localStorage.getItem("user"));

  /* const handleUserAnswer = (question, e, getUser, sessionId) => {
    addUserAnswerInput(question, e, getUser, sessionId);
  }; */

  const getAns = () => {
    const answer = localStorage.getItem("ans");
    if (answer) {
      return JSON.parse(localStorage.getItem("ans"));
    } else {
      return [];
    }
  };
  const [ans, setAns] = useState(getAns());
  const handleAns = (question, answer, getUser, sessionId) => {
    const answerExist = ans?.includes(answer);
    if (answerExist) {
      const filteredAnswer = ans?.filter((el) => el !== answer);
      setAns(filteredAnswer);
      return addUserAnswerInput(question, ans, getUser, sessionId);
    } else {
      setAns((prev) => [...prev, answer]);
      return addUserAnswerInput(question, ans, getUser, sessionId);
    }
  };
  useEffect(() => {
    localStorage.setItem("ans", JSON.stringify(ans));
  }, [ans]);
  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    try {
      await axios
        .patch(
          "http://localhost:5000/questions/js/quiz",
          {
            question,
            answer,
            user,
            sessionId,
          },
          { withCredentials: true }
        )
        .then(
          (data) => console.log("data", data.data.userSolutions, answer)
          /* data.data?.userSolutions &&
            localStorage.setItem(
              "answers",
              JSON.stringify(
                data.data?.userSolutions.map((answer) => answer.answer)
              )
            ) */
        );
      getAnswersFromLocalStorage();
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  const getAnswersFromLocalStorage = () => {
    const userAnswers = JSON.parse(localStorage.getItem("answers"));
    if (userAnswers) return userAnswers && setAnswers(userAnswers);
  };

  const handleMark = (id) => {
    const alreadyMarked = marked?.includes(id);

    if (alreadyMarked) {
      const filtered = marked?.filter((el) => el !== id);
      setMarked(filtered);

      return;
    } else {
      return setMarked((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("marked", JSON.stringify(marked));
  }, [marked]);

  useEffect(() => {
    addUserAnswerInput();
    getAnswersFromLocalStorage();
    getMarkedFromLocalStorage();
    getSessionIdFromLocalStorage();
    getQuizQuestionsFromLocalStorage();
    getAns();
  }, []);

  return (
    <div>
      {
        <div key={question?._id}>
          <h5>{question?.questionText}</h5>
          {question?.image && (
            <img src={question?.image} alt="" width="400px" />
          )}
          {question &&
            (marked.includes(question._id) ? (
              <AiFillStar onClick={() => handleMark(question?._id)} />
            ) : (
              <AiOutlineStar onClick={() => handleMark(question?._id)} />
            ))}
          <div>
            {question?.options.map((option) => (
              <div key={option?._id}>
                <input
                  className={style.button}
                  type="checkbox"
                  name="option"
                  style={{ border: "1px red solid" }}
                  value={option?.option}
                  id={option?._id}
                  checked={ans && ans.includes(option?._id)}
                  onChange={(e) =>
                    handleAns(question._id, e.target.id, getUser._id, sessionId)
                  }
                />
                <label htmlFor={option?.option}>{option?.option}</label>
              </div>
            ))}
            {showAnswer && <div>{question?.explanation}</div>}
            <hr />
          </div>
          <CountDownTimer />
        </div>
      }
    </div>
  );
}
