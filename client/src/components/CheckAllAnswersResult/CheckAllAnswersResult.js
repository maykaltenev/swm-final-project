import React, { useState } from "react";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  const wrongResultArray = [];


  /* console.log("the allques in result array is:".allQues)
  
const getUserAnswerFromResultArray = () => {
   const answer = allQues?.resultArray?.map(item => item.userAnswer)
   console.log("answer from resultArray is:", answer)
 const userWrongAnswer = answer?.map(item => item.wrongUserAnswer) 
 console.log("wrong answer result is :", userWrongAnswer) 
  const userWrongOption = userWrongAnswer?.map(item => item?.map(e => e?.option)[0]) 
  console.log("the user wrong option is:", userWrongOption) 

allQues?.resultArray?.map(item => item.userAnswer.map(wrongAns => {
  wrongAns.option[0]
}))
  
} */
  //getUserAnswerFromResultArray()
  /* -------------------checking for wrong result from user */

  console.log("all ques is:", allQues);

  return (
    <div key={allQues._id}>
      {allQues?.allQuestion?.questions?.map((question, i) => (
        < div >
          <h5 >
            {i + 1}) {question.questionText}
          </h5>
          
          <div>
           
            
            {question?.options?.map((option, i) => (
              < li className={option.isCorrect === true ? "green" : ""} > {option.option}</li>
/* 
               < li className={userAnswer.userAnswer.wrongUserAnswer.includes((option)) ? "red" : ""} > {option.option}</li> */
            ))}
          </div>
          {/*  {question.userAnswer.correctUserAnswer.length > 0 ? } */}
        </div>
      ))
      }

      <>
      
      </>
    </div >
  );
}

export default CheckAllAnswersResult;
