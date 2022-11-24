import React, { useState } from "react";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  const wrongAnswersArr = [];
  allQues?.userWrongAnswer?.map((item) => wrongAnswersArr.push(item.option));
console.log("all ques",allQues)

//if user doesn't enter any ans
const noAnswerArr = []
noAnswerArr.push(allQues?.resultArray?.map(ques => ques.question._id))
console.log(noAnswerArr[0])

  return (
    <div key={allQues._id}>
      {allQues?.allQuestion?.questions?.map((question, i) => (
        <div key={i}>
 
          <h5 className={allQues?.resultArray?.map(correct => correct.correct
 === true )? "gray" : "red"}>
            {i + 1}. {question.questionText}
          </h5>

          <div key={question._id}>
            {question?.options?.map((option, i) => (
              <li key={i}
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
