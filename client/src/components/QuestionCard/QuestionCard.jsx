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
    javaScriptData,
    sessionId,
    getMarkedFromLocalStorage,
    marked,
    setMarked,
    getSessionIdFromLocalStorage,
    getQuizQuestionsFromLocalStorage,
  } = useContext(QuestionContext);

  const getUser = JSON.parse(localStorage.getItem("user"));

  const getAnswersFromLocalStorage = () => {
    const answer = localStorage.getItem("answers");
    if (answer) {
      return JSON.parse(localStorage.getItem("answers"));
    } else {
      return [{ questions: "", answers: [] }];
    }
  };
  const [answer, setAnswer] = useState(getAnswersFromLocalStorage());
  /* console.log(answer); */
  const result = () => {
    let cor = [];
    javaScriptData.map((item) =>
      cor.push(item.options.filter((option) => option.isCorrect))
    );
    const found = cor.map((i, idx) => i.some((r) => answer.includes(r)));

    /* const found = answer.some((r) => cor.indexOf(r) >= 0); */
    console.log(found);
    /* cor.map((i, idx) => console.log(idx, i.length));
     */
    /*  cor.map((i, idx) =>
      console.log(
        idx,
        i.map((e) => e._id.includes(answer.map((l) => l)))
      )
    ); */
  };
  result();

  const handleAnswer = (question, answerInput, getUser, sessionId) => {
    const answerExist = answer?.includes(answerInput);
    if (answerExist) {
      const filteredAnswer = answer?.filter((el) => el !== answerInput);
      setAnswer(filteredAnswer);
      return addUserAnswerInput(question, answer, getUser, sessionId);
    } else {
      setAnswer((prev) => [...prev, answerInput]);
      return addUserAnswerInput(question, answer, getUser, sessionId);
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
                  checked={answer && answer.includes(option?._id)}
                  onChange={(e) =>
                    handleAnswer(
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
