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
    <div className="border-t-2 grid grid-cols-6 gap-1 sm:grid-cols-8 sm:g-1 p-4 ">
      {questionData.map((question, i) => (
        <div
          className="pointer w-4 h-4 border-4 rounded-full p-3 flex justify-center items-center m-3 "
          style={{
            backgroundColor: marked.includes(question?._id) ? "#5855D8" : "",
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
