import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

// Context
import { QuestionContext } from "../Context/QuestionContext";
//styles
import style from "./Question.module.css";

export default function QuestionCard({ question, showAnswer }) {
  const { setPoints, points } = useContext(QuestionContext);

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
