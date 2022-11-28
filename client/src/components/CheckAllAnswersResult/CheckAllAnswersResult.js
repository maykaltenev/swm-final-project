import React, { useState } from "react";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  const wrongAnswersArr = allQues?.userWrongAnswerAll?.map(
    (item) => item?.option
  );

  //user correctarray
  const correctArray = [];
  const wrongArray = [];
  console.log("all ques", allQues);

  allQues?.resultArray?.map((item) =>
    item.correct === true
      ? correctArray.push(item.question)
      : wrongArray.push(item.question)
  );
  console.log("arrayIdCorrect", correctArray);
  console.log("wrongArrayID", wrongArray);
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
