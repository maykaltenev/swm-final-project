import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

// Context
import { QuestionContext } from "../Context/QuestionContext";
//styles
import style from "./Question.module.css";

export default function QuestionCard({ question, showAnswer }) {
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
  const handleUserResponses = (userResponsesArray, answerId, questionId) => {
    if (!userResponsesArray) {
      userResponsesArray.map((userResponse) => {
        if (userResponse.questionId === questionId) {
          return (userResponse.answerId = answerId);
        } else {
          return userResponsesArray.push({
            questionId: questionId,
            answerId: answerId,
          });
        }
      });
      userResponsesArray.push({ questionId: questionId, answerId: answerId });
    }
  };
  console.log(userResponsesArray);
  return (
    <div>
      {
        <div key={question._id}>
          <h5>{question.questionText}</h5>
          {question.image && <img src={question.image} alt="" width="400px" />}
          <div>
            {question.options.map((option) => (
              <div key={option._id}>
                <div
                  className={style.button}
                  value={option.option}
                  onClick={() =>
                    handleUserResponses(
                      userResponsesArray,
                      option._id,
                      question._id
                    )
                  }
                >
                  {option.option}
                </div>
              </div>
            ))}
            {showAnswer && <div>{question.explanation}</div>}
            <hr />
          </div>
        </div>
      }
    </div>
  );
}
