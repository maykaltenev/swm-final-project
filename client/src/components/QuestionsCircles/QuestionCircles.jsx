import React, { useState, useContext } from "react";
import { QuestionContext } from "../Context/QuestionContext";
import { Link, useNavigate } from "react-router-dom";

export default function QuestionCircles({ setCurrentQuestion }) {
  const { questionData, marked } = useContext(QuestionContext);
  const navigate = useNavigate();
  const handleChangeIndex = (i) => {
    navigate(`/mypage/${i}`);
    console.log(i);
  };
  return (
    <div
      className="w-3/4 h-4/5 sm:h-3/5 lg:h-2/5 lg:w-3/5 sm:w-full p-3 rounded-3xl grid grid-cols-5 gap-3  sm:grid-cols-2 sm:gap-2 sm:p-4   shadow-xl sm:pt-4 sm:py-2 sm:mr-6
      dark:bg-btn-majorelle-blue "
    >
      {questionData.map((question, i) => (
        <div
          //
          // lg:border-4
          className="pointer text-bg-git-nav w-3 h-3 p-3 sm:w-4 sm:h-4 sm:p-4  lg:border-4 border-full sm:border-l-2 sm:border-r-2 rounded-full dark:border-text-snow  border-2 shadow-6xl p-3 flex justify-center items-center dark:text-git-nav lg:text-xl"
          style={{
            backgroundColor: marked.includes(question?._id) ? "#FFD51C" : "",
            borderColor: marked.includes(question?._id) ? "#5855D8" : "",
          }}
          key={question?._id}
          onClick={() => handleChangeIndex(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
