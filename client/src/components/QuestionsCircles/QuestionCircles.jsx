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
    <div className="h-1/4 grid grid-cols-6 sm:grid-cols-8 sm:g-1 mx-2 ">
      {questionData.map((question, i) => (
        <a
          className="pointer w-4 h-4 border-4 rounded-full p-3 flex justify-center items-center m-3 "
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
