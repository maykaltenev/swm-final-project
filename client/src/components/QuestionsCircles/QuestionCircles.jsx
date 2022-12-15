import React, { useState, useContext } from "react";
import { QuestionContext } from "../Context/QuestionContext";
import { Link, useNavigate } from "react-router-dom";

export default function QuestionCircles({ setCurrentQuestion }) {
  const { questionData, marked } = useContext(QuestionContext);
  const navigate = useNavigate();
  /* change the index of the question */
  const handleChangeIndex = (i) => {
    navigate(`/mypage/${i}`);
    console.log(i);
  };
  /* display the question */
  return (
    <div
      className="w-3/4 h-4/5 sm:h-3/5 lg:h-3/5 lg:w-3/5 sm:w-full  p-3 rounded-3xl grid grid-cols-5 gap-3  sm:grid-cols-2 sm:gap-2 sm:p-4    sm:pt-4 sm:py-2 sm:mr-6
      dark:bg-btn-majorelle-blue sm:dark:bg-transparent "
    >
      {questionData.map((question, i) => (
        // selecting the questions and give colors
        <div
          className="cursor-pointer text-bg-git-nav  w-3 h-3 p-3 sm:w-4 sm:h-4 sm:p-4  lg:border-4 border-full sm:border-l-2 sm:border-r-2 rounded-full dark:border-snow dark:text-snow  border-2 active:dark:border-cyber-yellow active:dark:text-cyber-yellow shadow-6xl p-3 flex justify-center items-center  lg:text-xl  hover:shadow  transition duration-200"
          style={{
            backgroundColor: marked.includes(question?._id) ? "#FFD51C" : "",
            borderColor: marked.includes(question?._id) ? "#F5D51C" : "",
            color: marked.includes(question?._id) ? "#2B2B33" : "",
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
