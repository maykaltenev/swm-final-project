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
    <div className="w-fit shadow-4xl rounded-3xl grid grid-cols-4 gap-3 sm:grid-cols-8 sm:g-1  dark:bg-git-nav border-t-4 border-r-4 border-git-nav pt-4 py-2 mr-6">
      {questionData.map((question, i) => (
        <div
          className="pointer  w-4 h-4 p-4 border-4 rounded-full p-3 flex justify-center items-center "
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
