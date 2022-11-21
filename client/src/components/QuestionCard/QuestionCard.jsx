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

  const getAnswersFromLocalStorage = () => {
    const answer = localStorage.getItem("answers");
    if (answer) {
      return JSON.parse(localStorage.getItem("answers"));
    } else {
      return [];
    }
  };
  const [answer, setAnswer] = useState(getAnswersFromLocalStorage());

  const handleUserAnswer = (question, e, getUser, sessionId) => {
    const questionExist = answer?.find((item) => item.questionID === question);
    console.log("question exist filter", questionExist);
    if (questionExist) {
      console.log("questionExist inside if", questionExist);
      const answerExist = questionExist?.answers?.includes(String(e));
      console.log("answerExist", answerExist);
      if (answerExist) {
        const filteredAnswer = questionExist?.answers?.filter((el) => el !== e);
        console.log("filterAnswer", filteredAnswer);
        setAnswer((prev) => {
          return prev.map((item) => {
            if (item.questionID === question) {
              console.log("insideTheItemID", item.questionID);
              console.log("insideTheItemID", question);
              return {
                questionID: question,
                answers: filteredAnswer,
              };
            } else {
              return {
                ...item,
              };
            }
          });
        });
      } else {
        setAnswer((prev) => {
          console.log("checkQ", question);
          return prev.map((item) => {
            console.log("check", item);
            if (item.questionID === question) {
              console.log("add all the prev + the new");
              return {
                questionID: question,
                answers: [...item.answers, e],
              };
            } else {
              return { ...item };
            }
          });
        });
      }
    } else {
      console.log("no answer", e, question);
      setAnswer((prev) => [...prev, { questionID: question, answers: [e] }]);
    }
  };

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answer));
  }, [answer]);

  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    try {
      await axios.patch(
        "http://localhost:5000/questions/js/quiz",
        {
          question,
          answer,
          user,
          sessionId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("error adding comment", error);
    }
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
                  checked={answer && answer?.answers?.includes(option?._id)}
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
          <CountDownTimer />
        </div>
      }
    </div>
  );
}
