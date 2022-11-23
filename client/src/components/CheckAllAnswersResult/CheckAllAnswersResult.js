import React from 'react'
import "./CheckAllAnswersResult.css"

function CheckAllAnswersResult({allQues}) {
    console.log("all ques is", allQues)
  return (
    <div key={allQues._id}>
  {allQues?.questions?.map((item,i )=> 
  <>
  <h5>{i + 1}) {item.questionText}</h5>
  <div >{item?.options?.map(e =>
    <li  className = {e.isCorrect === true ? "green" : ""}>{e.option}    
      </li>
   
    )} 
    </div>
    <h5>Explanation:</h5>
    <h5>{item.explanation}</h5>
    </>
    
    )}
    </div>
  )
}

export default CheckAllAnswersResult
