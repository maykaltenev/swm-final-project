import React, { useState } from "react";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  const wrongAnswersArr = [];
  allQues?.userWrongAnswer?.map((item) => wrongAnswersArr.push(item.option));

  //if user doesn't enter any ans
  const noAnswerArr = [];
  noAnswerArr.push(allQues?.resultArray?.map((ques) => ques.question._id));
  console.log(noAnswerArr)
  //user correctarray
  const correctArray = [];
  const wrongArray = [];
  console.log(allQues)
  allQues?.resultArray?.map((item) =>
    item.correct === true
      ? correctArray.push(item.question._id)
      : wrongArray.push(item.question._id)
  );

  return (
    <div key={allQues._id}>
      {allQues?.allQuestion?.questions?.map((question, i) => (
        <div key={i}>
          <h5
            className={
              correctArray.includes(question._id)
                ? "lightgreen"
                : wrongArray.includes(question._id)
                  ? "red"
                  : "gray"
            }
          >
            {i + 1}. {question.questionText}
          </h5>

          <div key={question._id}>
            {question?.options?.map((option, i) => (
              <li
                key={i}
                className={
                  option.isCorrect === true
                    ? "green"
                    : wrongAnswersArr.includes(option.option)
                      ? "red"
                      : ""
                }
              >
                {option.option}
              </li>
            ))}
            <h5>Explanation:</h5>
            <h5>{question.explanation}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CheckAllAnswersResult;