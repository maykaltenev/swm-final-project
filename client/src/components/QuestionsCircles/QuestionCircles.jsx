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
    <div className="flex items-center grid grid-cols-6 sm:grid-cols-3 sm:g-1 sm:h-[25%] border-2 dark:text-text-ghost-white sm:w-3/4 sm:h-1/2 sm:align-center">
      {questionData.map((question, i) => (
        <a
          className="pointer w-4 h-4 border-4 rounded-full p-3 flex justify-center items-center "
          style={{
            backgroundColor: marked.includes(question?._id) ? "lightgray" : "",
          }}
          key={question?._id}
          onClick={() => handleChangeIndex(i)}
        >
          {i + 1}
        </a>
      ))}
    </div>
  );
}
