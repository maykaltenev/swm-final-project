import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

// Context
import { QuestionContext } from "../Context/QuestionContext";
//styles
import style from "./Question.module.css";

export default function QuestionCard({ question, showAnswer }) {
  const {
    setPoints,
    points,
    sessionId,
    currentWholeSession,
    setCurrentWholeSession,
  } = useContext(QuestionContext);
  const [userInputAnswerId, setUserInputAnswerId] = useState("");

  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleUserAnswer = (question, e, getUser, sessionId) => {
    addUserAnswerInput(question, e, getUser, sessionId);
  };

  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    try {
      await axios
        .post(
          `http://localhost:5000/questions/js/quiz/`,
          { sessionId },
          {
            withCredentials: true,
          }
        )
        .then((data) => setCurrentWholeSession(data.data.currentSession));
      console.log(currentWholeSession);
      const checker = currentWholeSession.userSolutions.map((item) =>
        Object.values(item).includes(question)
      )[0];
      console.log(checker);
      if (checker) {
        await axios.patch(
          "http://localhost:5000/questions/js/quizAnswer",
          {
            question,
            answer,
            // user,
            sessionId,
          },
          { withCredentials: true }
        );
      } else {
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
      }
    } catch (error) {
      console.log("error adding user input", error);
    }
  };
  return (
    <div>
      {
        <div key={question?._id}>
          <h5>{question?.questionText}</h5>
          {question?.image && (
            <img src={question?.image} alt="" width="400px" />
          )}
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

/** Reference for saving state within array of objects 
 * 
 * 
 * export default function QuestionCard({ question, showAnswer }) {
  const { setPoints, points } = useContext(QuestionContext);
  const [userResponses, setUserResponses] = useState([
    {
      questionId: "",
      answerId: "",
    },
  ]);
  // const handleUserResponses = (answerId, questionId) => {
  //   setUserResponses((currentResponse) => ({
  //     ...currentResponse,
  //     questionId: questionId,
  //     answerId: answerId,
  //   }));
  // };
  const userResponsesArray = [];
  // const handleUserResponses = (userResponsesArray, answerId, questionId) => {
  //   if (!userResponsesArray) {
  //     userResponsesArray.map((userResponse) => {
  //       if (userResponse.questionId === questionId) {
  //         return (userResponse.answerId = answerId);
  //       } else {
  //         return userResponsesArray.push({
  //           questionId: questionId,
  //           answerId: answerId,
  //         });
  //       }
  //     });
  //     userResponsesArray.push({ questionId: questionId, answerId: answerId });
  //   }
  // };
  console.log(userResponsesArray);
  return (
    <div>
      {
        <div key={question?._id}>
          <h5>{question?.questionText}</h5>
          {question?.image && (
            <img src={question?.image} alt="" width="400px" />
          )}
          <div>
            {question?.options.map((option) => (
              <div key={option?._id}>
                <input
                  className={style.button}
                  type="radio"
                  name="option"
                  style={{ border: "1px red solid" }}
                  value={option?.option}
                  // onChange={() =>
                  //   handleUserResponses(option.value, question._id)
                  // }
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
*/
