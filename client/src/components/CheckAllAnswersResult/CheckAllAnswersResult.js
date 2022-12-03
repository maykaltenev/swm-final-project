import React, { Fragment } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  /* to get all the wrong answers from the user and store  in an array  */
  const wrongAnswersArr = allQues?.userWrongAnswerAll?.map(
    (item) => item?.option
  );

  const correctArray = [];
  const wrongArray = [];
  //seperating the correct and wrong answers by checking the result array prop correct=== true
  allQues?.resultArray?.map((item) =>
    item.correct === true
      ? correctArray.push(item.question)
      : wrongArray.push(item.question)
  );

  return (
    <div className="flex flex-col justify-center items-center ">
      {/* displaying the question text and the answer options on the result page */}
      {allQues?.allQuestion?.questions?.map((question, i) => (
        <Fragment>
          <div
            key={i}
            className=" bg-white rounded-xl shadow-lg  p-3 my-2 sm:w-1/2 sm:p-5 "
          >
            {/* to display the question text in red/green/gray colors */}
            <h5
              className={` ${
                correctArray.includes(question._id)
                  ? /* if the answer is given correct by user and is in correctArray the question text should be in green color */
                    "border-2 border-green-400 rounded-md bg-green-50 p-2 my-4"
                  : /* if the answer given by user is wrong and the question is in wrongArray then the question text should be in red color */
                  wrongArray.includes(question._id)
                  ? "border-2 rounded-md border-red-400 bg-red-50 p-2 my-4"
                  : /* if the user doesn't answer the question, the text should be in gray color */
                    "border-2 rounded-md border-gray-400 bg-gray-300 p-2 my-4"
              }                
               `}
            >
              {i + 1}. {question.questionText}
              {/* to display, if the question text has code */}
            </h5>
            {question?.code && (
              <div style={{ padding: "1rem", backgroundColor: "" }}>
                <Editor
                  value={question.code}
                  highlight={(code) => highlight(code, languages.js)}
                  disabled
                />
              </div>
            )}
            {/* to display the question options */}
            <div key={question._id}>
              {/* display all the options for the question */}
              {question?.options?.map((option, i) => (
                <li
                  key={i}
                  className={` my-4 py-1 rounded-md  shadow-md list-none	px-3  ${
                    /* if the option has property isCorrect === true, display in green color */
                    option.isCorrect === true
                      ? "bg-green-200"
                      : /* if the wrongAnswerArr has option (not empty) , display in red color */
                      wrongAnswersArr.includes(option.option)
                      ? "bg-red-200"
                      : /* or else display nothing */
                        ""
                  }`}
                >
                  {option.option}
                </li>
              ))}
              {/* to display the explanation */}
              <h5 className="">Explanation:</h5>
              <h5 className="bg-gray-100 rounded-lg shadow-lg  p-3 my-2">
                {question.explanation}
              </h5>
            </div>
          </div>
          {/* <hr className="border-black m-4" /> */}
        </Fragment>
      ))}
    </div>
  );
}

export default CheckAllAnswersResult;
