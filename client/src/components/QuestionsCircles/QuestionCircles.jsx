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
    <div className="sm:w-fit p-3  shadow-4xl rounded-3xl grid grid-cols-6 gap-3 border-t-2 border-l-2 sm:grid-cols-4 sm:gap-4 sm:p-8  dark:bg-git-nav border-t-4 border-r-4 border-git-nav sm:pt-4 sm:py-2 sm:mr-6">
      {questionData.map((question, i) => (
        <div
          className="pointer w-2 h-2 p-2 sm:w-4 sm:h-4 sm:p-4 border-2 border-full sm:border-l-2 sm:border-r-2 rounded-full p-3 flex justify-center items-center "
          style={{
            borderColor: marked.includes(question?._id) ? "yellow" : "",
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
