import React, { Fragment, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "../../../src/prism.css"
import "./CheckAllAnswersResult.css";

function CheckAllAnswersResult({ allQues }) {
  const wrongAnswersArr = allQues?.userWrongAnswerAll?.map(
    (item) => item?.option
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //user correctarray
  const correctArray = [];
  const wrongArray = [];

  allQues?.resultArray?.map((item) =>
    item.correct === true
      ? correctArray.push(item.question)
      : wrongArray.push(item.question)
  );

  return (
    <div className="flex flex-col justify-center items-center ">
      {allQues?.allQuestion?.questions?.map((question, i) => (
        <Fragment>
          <div
            key={i}
            className="bg-text-ghost-white dark:bg-nav-raisin-black-3 rounded-xl shadow-lg  p-3 my-2 sm:w-5/6 sm:p-5 "
          >
            <h5
              className={`${correctArray.includes(question?._id)
                ? "border-2 border-green-400 rounded-md bg-green-50  rounded-md dark:bg-green-200 dark:text-green-600 p-2 my-4"
                : wrongArray.includes(question?._id)
                  ? "border-2 rounded-md border-red-400  bg-red-50 dark:bg-red-200 dark:text-red-600  p-2 my-4"
                  : "border-2 rounded-md border-gray-400 bg-gray-300 dark:border-gray-200 dark:bg-gray-400 dark:text-gray-600 p-2 my-4"
                }
                
               `}
            >
              {i + 1}. {question.questionText}
            </h5>
            {question?.code && (
              <div className="mt-1h-[55%] items-center pointer bg-git-nav dark:bg-jet text-red-500 dark:text-btn-majorelle-blue">
                <Editor
                  value={question?.code}
                  highlight={(code) => highlight(code, languages.js)}
                  disabled
                />
              </div>
            )}
            <div key={question?._id}>
              {question?.options?.map((option, i) => (
                <li
                  key={i}
                  className={`dark:text-text-ghost-white  my-4 py-1 rounded-md  shadow-md list-none	px-3  ${option.isCorrect === true
                    ? "bg-green-200 dark:bg-green-400"
                    : wrongAnswersArr.includes(option.option)
                      ? "bg-red-200 dark:bg-red-400 "
                      : ""
                    }`}
                >
                  {option.option}
                </li>
              ))}
              <h5 className="dark:text-ultramarine-blue-2 ">Explanation:</h5>
              <h5 className="bg-gray-100 rounded-lg shadow-2xl dark:shadow-6xl dark:bg-nav-raisin-black-4  dark:text-ultramarine-blue-2 p-3 my-2">
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
