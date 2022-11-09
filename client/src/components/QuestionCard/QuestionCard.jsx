import React from "react";

//styles
import style from "./Question.module.css";

export default function QuestionCard({ question }) {
  return (
    <div>
      {
        <div key={question._id}>
          {question?.questionNumber}
          <h5>{question.questionText}</h5>
          {question.image && <img src={question.image} alt="" width="400px" />}
          <div>
            {question.options.map((option) => (
              <div key={option._id}>
                <input
                  className={style.button}
                  type="radio"
                  name="option"
                  value="option"
                />{" "}
                {option.option}
              </div>
            ))}
            <hr />
          </div>
        </div>
      }
    </div>
  );
}
