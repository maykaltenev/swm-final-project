import axios from "axios";
import React, { useContext, useState, useEffect, useRef } from "react";

//simple code editor && highlighting library

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
// react icons

import debounce from "lodash.debounce";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

// Context
import { QuestionContext } from "../Context/QuestionContext";

//styles
import style from "./Question.module.css";

export default function QuestionCard({
  question,
  showAnswer,
  currentQuestion,
}) {
  //Context
  const {
    sessionId,
    getMarkedFromLocalStorage,
    marked,
    setMarked,
    getSessionIdFromLocalStorage,
    getQuizQuestionsFromLocalStorage,
  } = useContext(QuestionContext);

  const getUser = JSON.parse(localStorage.getItem("user"));

  const userInput = useRef(null);
  const getAnswersFromLocalStorage = () => {
    const answer = localStorage.getItem("answers");
    if (answer) {
      return JSON.parse(localStorage.getItem("answers"));
    } else {
      return [];
    }
  };
  const [answer, setAnswer] = useState(getAnswersFromLocalStorage());
  const handleUserAnswer = (
    question,
    e,
    getUser,
    sessionId,
    inputType,
    userInput
  ) => {
    const questionExist = answer?.find((item) => item.questionID === question);
    if (questionExist) {
      if (inputType === "radio") {
        setAnswer((prev) => {
          return prev.map((item) => {
            if (item.questionID === question) {
              addUserAnswerInput(question, e, getUser, sessionId);
              return {
                questionID: question,
                answers: [e],
              };
            } else {
              return {
                ...item,
              };
            }
          });
        });
      } else if (inputType === "text") {
        setAnswer((prev) => {
          return prev.map((item) => {
            if (item.questionID === question) {
              addUserAnswerInput(question, userInput, getUser, sessionId);

              return {
                questionID: question,
                answers: [userInput],
              };
            } else {
              return {
                ...item,
              };
            }
          });
        });
      } else {
        const answerExist = questionExist?.answers?.includes(String(e));
        if (answerExist) {
          const filteredAnswer = questionExist?.answers?.filter(
            (el) => el !== e
          );
          setAnswer((prev) => {
            return prev.map((item) => {
              if (item.questionID === question) {
                addUserAnswerInput(
                  question,
                  filteredAnswer,
                  getUser,
                  sessionId
                );
                return {
                  questionID: question,
                  answers: filteredAnswer,
                };
              } else {
                return {
                  ...item,
                };
              }
            });
          });
        } else {
          setAnswer((prev) => {
            return prev.map((item) => {
              if (item.questionID === question) {
                addUserAnswerInput(
                  question,
                  [...item.answers, e],
                  getUser,
                  sessionId
                );
                return {
                  questionID: question,
                  answers: [...item.answers, e],
                };
              } else {
                return { ...item };
              }
            });
          });
        }
      }
    } else {
      if (inputType !== "text") {
        setAnswer((prev) => [...prev, { questionID: question, answers: [e] }]);
        addUserAnswerInput(question, e, getUser, sessionId);
      } else {
        setAnswer((prev) => [
          ...prev,
          { questionID: question, answers: [userInput] },
        ]);
        addUserAnswerInput(question, userInput, getUser, sessionId);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answer));
  }, [answer]);

  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    try {
      await axios.patch(
        "http://localhost:5000/questions/quiz",
        {
          question,
          answer,
          user,
          sessionId,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  const handleMark = (id) => {
    const alreadyMarked = marked?.includes(id);

    if (alreadyMarked) {
      const filtered = marked?.filter((el) => el !== id);
      setMarked(filtered);

      return;
    } else {
      return setMarked((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    localStorage.setItem("marked", JSON.stringify(marked));
  }, [marked]);

  useEffect(() => {
    addUserAnswerInput();
    getAnswersFromLocalStorage();
    getMarkedFromLocalStorage();
    getSessionIdFromLocalStorage();
    getQuizQuestionsFromLocalStorage();
  }, []);

  return (
    <div className="relative h-full rounded-2xl sm:border-t-2 sm:border-b-4 md:w-[55%]dark:border-nav-raisin-black w-screen  sm:w-[65%] lg:w-[75%] mr-3 dark:bg-dark-raisin-black bg-magnolia dark:sm:shadow-6xl sm:shadow-7xl border-ghost-white-100">
      {
        <div
          className="h-full flex flex-col justify-evenly 
           border-ghost-white-300"
          key={question?._id}
        >
          <span className="text-3xl absolute right-4 top-4 flex items-self-end">
            {question &&
              (marked.includes(question._id) ? (
                <AiFillStar onClick={() => handleMark(question?._id)} />
              ) : (
                <AiOutlineStar onClick={() => handleMark(question?._id)} />
              ))}
          </span>
          <div className="h-[40%] sm:h-[55%]">
            <h5
              className="shadow-3xl dark:shadow-5xl sm:p-8 sm:text-lg  sm:mt-10 w-fit dark:border-snow dark:border-t-4 dark:border-l-2 dark:bg-git-box 
              border-b-4
              border-r-2
              rounded-xl
            border-btn-majorelle-blue bg-han-purple rounded-md text-snow p-2 m-4"
            >
              {question?.questionText}
            </h5>
            {question?.code && (
              <div>
                <Editor
                  style={{ marginLeft: 35, fontSize: 12, lineHeight: 1.5 }}
                  value={question.code}
                  highlight={(code) => highlight(code, languages.js)}
                  disabled
                />
              </div>
            )}
          </div>
          <div className="grid  leading-none sm:grid-cols-2 grid-col-1 gap-4 sm:gap-2 sm:mx-4   ">
            {question?.options.map((option) => (
              <ul className=" mr-2 sm:min-h-[80%] sm:min-w-[90%] sm:m-0 rounded-lg dark:border-snow dark:border-t-2 dark:border-l-2  bg-han-purple">
                <li className="rounded-t-lg  ">
                  <div
                    className=" leading-none border-b-2 border-r-2 rounded-l border-btn-majorelle-blue bg-han-purple shadow-3xl dark:shadow-3xl dark:bg-git-box  leading-loose flex sm:items-center pl-6 "
                    key={option?._id}
                  >
                    <input
                      className=" leading-none dark:focus:ring-blue-600"
                      type={question?.inputType}
                      name={question?.inputType}
                      value={
                        question?.inputType === "text"
                          ? undefined
                          : option?.option
                      }
                      id={option?._id}
                      ref={userInput}
                      checked={
                        (answer &&
                          answer[
                            answer?.findIndex(
                              (item) => item?.questionID === question?._id
                            )
                          ]?.answers?.includes(option?._id)) ||
                        false
                      }
                      placeholder={
                        answer &&
                        answer[
                          answer?.findIndex(
                            (item) => item?.questionID === question?._id
                          )
                        ]?.answers[0]
                      }
                      maxLength={option?.option?.length}
                      onChange={
                        question.inputType !== "text"
                          ? (e) =>
                              handleUserAnswer(
                                question?._id,
                                e.target?.id,
                                getUser?._id,
                                sessionId,
                                question?.inputType,
                                userInput?.current?.value
                              )
                          : debounce(
                              (e) =>
                                handleUserAnswer(
                                  question?._id,
                                  e.target?.id,
                                  getUser?._id,
                                  sessionId,
                                  question?.inputType,
                                  userInput?.current?.value
                                ),
                              300
                            )
                      }
                    />
                    <label
                      className=" p-2 text-left sm:leading-[2rem] text-white ml-4 w-full "
                      htmlFor={option?._id}
                    >
                      {question.inputType === "text" ? "" : option?.option}
                    </label>
                  </div>
                </li>
              </ul>
            ))}
            {showAnswer && <div>{question?.explanation}</div>}
          </div>
        </div>
      }
    </div>
  );
}
