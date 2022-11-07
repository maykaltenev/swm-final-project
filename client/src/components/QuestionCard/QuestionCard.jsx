import React from "react";

import { useContext } from "react";
import { QuestionContext } from "../Context/QuestionContext";
export default function QuestionCard() {
  const { javaScriptData } = useContext(QuestionContext);
  return (
    <div>
      {javaScriptData.map((question) => (
        <div>
          {question.questionNumber}
          <h5 key={question._id}>{question.questionText}</h5>
          {question.image && <img src={question.image} alt="" width="400px" />}
          <div>
            {question.options.map((option) => (
              <div key={option._id}>{option.option}</div>
            ))}
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
}
