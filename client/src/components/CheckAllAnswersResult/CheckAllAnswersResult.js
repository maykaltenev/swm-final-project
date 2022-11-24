import React from "react";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  const wrongAnswersArr = [];

  allQues?.userWrongAnswer.map((item) => wrongAnswersArr.push(item._id));

  /* allQues?.resultArray?.map((item) =>
    console.log("item", item.userAnswer.wrongUserAnswer)
  ); */

  /* console.log("the allques in result array is:".allQues)
  
const getUserAnswerFromResultArray = () => {
   const answer = allQues?.resultArray?.map(item => item.userAnswer)
   console.log("answer from resultArray is:", answer)
 const userWrongAnswer = answer?.map(item => item.wrongUserAnswer) 
 console.log("wrong answer result is :", userWrongAnswer) 
  const userWrongOption = userWrongAnswer?.map(item => item?.map(eoption?.option ===
                      allQues?.userWrongAnswer?.map((item) => item.option) => e?.option)[0]) 
  console.log("the user wrong option is:", userWrongOption) 
} */
  //getUserAnswerFromResultArray()
  /* -------------------checking for wrong result from user */
  /*  console.log("all ques is:", allQues); */
  return (
    <div key={allQues._id}>
      {allQues?.allQuestion?.questions?.map((question, i) => (
        <div>
          <h5>
            {i + 1}) {question.questionText}
          </h5>
          {/*  {allQues?.resultArray.map(userAnswer => {
            userAnswer.userAnswer.wrongUserAnswer.map(wrong => {
              console.log(wrong)
            }) 
          })}*/}
          <div>
            {question?.options?.map((option, i) => (
              <li
                className={
                  option.isCorrect === true
                    ? "green"
                    : wrongAnswersArr.includes(option._id)
                    ? "red"
                    : ""
                }
              >
                {" "}
                {option.option}
              </li>
              // < li className={userAnswer.userAnswer.wrongUserAnswer.includes((option)) ? "red" : ""} > {option.option}</li>
            ))}
          </div>
          {/*  {question.userAnswer.correctUserAnswer.length > 0 ? } */}
        </div>
      ))}

      <>
        {/*   <div>
             {item?.options?.map((e,i) => (
              <li  className={e.isCorrect === true ? "green" : ""} >
                {e.option}
              </li>
            ))}

          </div>                     
          <h5>Explanation:</h5>
          <h5>{item.explanation}</h5> */}
      </>
    </div>
  );
}

export default CheckAllAnswersResult;
