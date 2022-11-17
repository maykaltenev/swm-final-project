import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

import { AiOutlineStar, AiFillStar } from "react-icons/ai";

// Context
import { QuestionContext } from "../Context/QuestionContext";

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
    handleCreateNewSession,
  } = useContext(QuestionContext);

  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleUserAnswer = (question, e, getUser, sessionId) => {
    addUserAnswerInput(question, e, getUser, sessionId);
  };
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
          (data) =>
            data.data?.userSolutions &&
            localStorage.setItem(
              "answers",
              JSON.stringify(
                data.data?.userSolutions.map((answer) => answer.answer)
              )
            )
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
  console.log("marked", marked);

  useEffect(() => {
    localStorage.setItem("marked", JSON.stringify(marked));
  }, [marked]);
  useEffect(() => {
    addUserAnswerInput();
    getAnswersFromLocalStorage();
    getMarkedFromLocalStorage();
    handleCreateNewSession();
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
                  type="radio"
                  name="option"
                  style={{ border: "1px red solid" }}
                  value={option?.option}
                  id={option?._id}
                  checked={answers && answers.includes(option?._id)}
                  onChange={(e) =>
                    handleUserAnswer(
                      question._id,
                      e.target.id,
                      getUser._id,
                      sessionId
                    )
                  }
                />
                <label htmlFor={option?.option}>{option?.option}</label>
              </div>
            ))}
            {showAnswer && <div>{question?.explanation}</div>}
            <hr />
          </div>
        </div>
      }
    </div>
  );
}
