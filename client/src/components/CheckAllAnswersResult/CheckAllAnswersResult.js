import React from 'react'

function CheckAllAnswersResult({allQues}) {
    console.log("all ques is", allQues)
  return (
    <div>
  {allQues?.questions?.map(item => 
  <>
  <h5>{item.questionText}</h5>
  <div>{item?.options?.map(e =>
    <li>{e.option}</li> )} </div>
    </>
    
    )}
    </div>
  )
}

export default CheckAllAnswersResult
