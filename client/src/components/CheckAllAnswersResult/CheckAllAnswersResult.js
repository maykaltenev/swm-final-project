import React from "react";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
 console.log("the allques in result array is:".allQues)
    //getting the value of the user answer from result array
const getUserAnswerFromResultArray = () => {
    const answer = allQues?.resultArray?.map(item => item.userAnswer)
 const userWrongAnswer = answer?.map(item => item.wrongUserAnswer) 
 const userWrongOption = userWrongAnswer?.map(item => item.map(e => e.option))
const wrongValues = userWrongOption.values()

console.log("the user wrong values is", wrongValues)
console.log("the user wrong option is:", userWrongOption)
 console.log("wrong answer result is :", userWrongAnswer) 
   console.log("answer from resultArray is:", answer) 
}
getUserAnswerFromResultArray()
/* -------------------checking for wrong result from user */

  return (
    <div key={allQues._id}>
      {allQues?.allQuestion?.questions?.map((item, i) => (
        <>
          <h5>
            {i + 1}) {item.questionText}
          </h5>
          <div>
            {item?.options?.map((e) => (
              <li className={e.isCorrect === true ? "green" : ""}>
                {e.option}
              </li>
            ))}
          </div>
          <h5>Explanation:</h5>
          <h5>{item.explanation}</h5>
        </>
      ))}
    </div>
  );
}

export default CheckAllAnswersResult;
