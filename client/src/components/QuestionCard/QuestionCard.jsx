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
    <div
      key={question?._id}
      className="w-full sm:w-[80%] lg:w-[60%] lg:p-12 relative h-full flex flex-col justify-center items-center sm:justify-evenly p-2"
    >
      <div className="pointer absolute top-1 right-3 sm:top-2 sm:right-0 text-xl rounded-full sm:p-2 dark:bg-han-purple dark:text-text-ghost-white bg-cyber-yellow text-git-box">
        {question &&
          (marked.includes(question._id) ? (
            <AiFillStar onClick={() => handleMark(question?._id)} />
          ) : (
            <AiOutlineStar onClick={() => handleMark(question?._id)} />
          ))}
      </div>
      <div className="flex flex-col justify-start align-center w-[98%] h-[30vh] sm:w-[90%] p-2">
        <h1 className="dark:bg-btn-majorelle-blue dark:text-text-ghost-white border-2 dark:border-git-nav rounded-xl shadow-xl w-full h-[45%] align-center p-4 py-6 lg:py-0 lg:p-2 text-justify  ">
          {question?.questionText}
        </h1>
        {question?.code && (
          <div className="h-[55%] flex items-center pointer">
            <Editor
              style={{ marginLeft: 35, fontSize: 12, lineHeight: 1.5 }}
              value={question.code}
              highlight={(code) => highlight(code, languages.js)}
              disabled
            />
          </div>
        )}
      </div>
      <div className="w-[99%] sm:w-[85%]  grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-2 p-2 ">
        {question?.options.map((option) => (
          <ul class="py-2 sm:py-0 shadow-xl border-2 dark:border-git-nav leading-none text-justify text-gray-900 rounded-lg border-gray-200 dark:bg-btn-majorelle-blue dark:text-text-ghost-white sm:py-2 ">
            <li class="sm:p-3 w-full rounded-t-lg  border-gray-400 dark:border-gray-600">
              <div className="flex items-center pl-3" key={option?._id}>
                <input
                  className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-100  dark:bg-gray-600 dark:border-gray-500 "
                  type={question?.inputType}
                  name={question?.inputType}
                  value={
                    question?.inputType === "text" ? undefined : option?.option
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
                  className="ml-2 font-sm text-gray-900  dark:text-gray-300"
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
  );
}
