import React, { useState } from "react";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  const wrongAnswersArr = [];
  allQues?.userWrongAnswerAll?.map((item) => wrongAnswersArr.push(item.option));

  //if user doesn't enter any ans
  /*  const noAnswerArr = [];
  noAnswerArr.push(allQues?.resultArray?.map((ques) => ques.question._id));
  console.log(noAnswerArr)  */

 const noAns = allQues?.resultArray?.filter(result => 
    {
      return allQues?.allQuestion?.questions?.filter((ques) => String(ques?.question?._id)!== String(result?.question?._id)) 
    }

    )
    console.log("noAns is:",noAns)

  //user correctarray
  const correctArray = [];
  const wrongArray = [];
  console.log( "all ques",allQues);
  allQues?.resultArray?.map((item) =>
    item.correct === false
      ? item.userAnswer.correctUserAnswer.length === 0 &&
        item.userAnswer.wrongUserAnswer.length === 0
        ? "gray"
        : "green"
      : "red"
  );
allQues?.resultArray?.map((item) =>
console.log("the item is:",item.correct )
 
   
);

  return (
    <div key={allQues._id}>
      {allQues?.allQuestion?.questions?.map((question, i) => (
        <div key={i}>
          <h5
            /* className={
              !correctArray.includes(question._id)
                ? !wrongArray.includes(question._id)
                  ? "gray"
                  : "lightgreen"
                : "lightred"
            } */
            className={allQues?.resultArray?.map((item) =>
              item.correct === undefined
                
                  ? "gray"
                  : null
                 
            )
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
