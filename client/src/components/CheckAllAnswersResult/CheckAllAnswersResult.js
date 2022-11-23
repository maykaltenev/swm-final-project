import React from 'react'

function CheckAllAnswersResult({allQues}) {
    console.log("all ques is", allQues)
  return (
    <div key={allQues._id}>
  {allQues?.questions?.map(item => 
  <>
  <h5>{item.questionText}</h5>
  <div>{item?.options?.map(e =>
    <li>{e.option}</li> )} 
    </div>
    <h5>Explanation:</h5>
    <h5>{item.explanation}</h5>
    </>
    
    )}
    </div>
  )
}

export default CheckAllAnswersResult
