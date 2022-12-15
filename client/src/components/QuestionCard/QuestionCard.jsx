import axios from "axios";
import React, { useContext, useState, useEffect, useRef } from "react";

//simple code editor && highlighting library

import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
// import "prismjs/themes/prism.css";
import "../../../src/prism.css";
// react icons

import debounce from "lodash.debounce";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { HiOutlineLightBulb } from "react-icons/hi";

// Context
import { QuestionContext } from "../Context/QuestionContext";

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
      className="dark:bg-nav-raisin-black-2 w-full h-fit sm:w-[100%] shadow-2xl rounded-3xl md:w-3/5 md:h-[65vh] relative flex flex-col  items-center justify-around	 "
    >
      <div
        className={`flex flex-col  md:mt-3 md:mr-2 justify-start align-center w-[98%] ${
          question?.code ? "h-[35vh]" : "h-[25vh]"
        } md:h-[30vh] md:h-[35vh] sm:w-[90%] lg:w-[91%] mb-2`}
      >
        <h1 className="bg-text-ghost-white text-gray-500 dark:bg-btn-majorelle-blue dark:text-text-ghost-white rounded-xl shadow-xl text-sm md:text-base w-full h-[40%] align-center p-2 py-4  text-justify ">
          {question?.questionText}
        </h1>
        <div className="cursor-pointer flex  justify-end absolute top-1 right-3 sm:top-0 sm:right-0  rounded-full sm:p-2 dark:text-snow border-full text-git-box">
          {question &&
            (marked.includes(question._id) ? (
              <AiFillStar
                onClick={() => handleMark(question?._id)}
                className=""
                style={{
                  fontSize: "1.3rem",
                  color: "#FFD51C",
                  border: "2px solid #FFD51C",
                  borderRadius: "100%",
                }}
              />
            ) : (
              <AiOutlineStar
                onClick={() => handleMark(question?._id)}
                style={{
                  fontSize: "1.5rem",
                }}
              />
            ))}
        </div>
        {question?.code && (
          <div className=" mt-1 items-center pointer bg-git-nav dark:bg-jet text-red-500 dark:text-btn-majorelle-blue">
            <Editor
              style={{
                marginLeft: 45,
                fontSize: 13,
                lineHeight: 1.5,
              }}
              value={question?.code}
              highlight={(code) => highlight(code, languages.js)}
              disabled
            />
          </div>
        )}
        {question?.inputType === "checkbox" && (
          <div className="text-sm md:text-base text-btn-majorelle-blue dark:text-cyber-yellow flex rounded-md px-1 w-full items-center justify-center mb-1">
            <HiOutlineLightBulb className="text-xl" />
            <div>more than one answers </div>
          </div>
        )}
      </div>

      <ul className="w-[99%] md:w-[90%]  md:h-[25vh] grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-1  mb-5 sm:mb-0 ">
        {question?.options.map((option, i) => (
          <li className="sm:p-3  w-full rounded-t-lg  ">
            <input
              className="hidden peer w-full bg-gray-100 border-gray-300 dark:ring-offset-gray-100  dark:nav-raisin-black-3 dark:border-gray-500 "
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
              for={option?._id}
              className="bg-text-ghost-white w-full h-full p-2 pl-4 inline-flex shadow-3xl hover:shadow transition duration-200 bg-white mt-2 justify-between items-center  text-gray-300 bg-white text-sm md:text-base rounded-xl border border-gray-200 cursor-pointer dark:hover:text-gray-200 dark:border-gray-700 dark:peer-checked:text-cyber-yellow peer-checked:border-2 dark:peer-checked:border-cyber-yellow peer-checked:border-btn-majorelle-blue peer-checked:text-btn-majorelle-blue hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-nav-raisin-black-4
              dark:hover:shadow dark:hover:bg-nav-raisin-black-3 transition duration-200"
            >
              {question.inputType === "text" ? "" : option?.option}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
