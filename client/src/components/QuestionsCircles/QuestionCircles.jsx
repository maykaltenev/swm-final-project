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
    <div className="flex flex-wrap">
      {questionData.map((question, i) => (
        <a
          className=" w-2 h-4"
          style={{
            textDecoration: "none",
            cursor: "pointer",
            backgroundColor: marked.includes(question?._id) ? "lightgray" : "",
            border: "1px black solid",
            borderRadius: "50%",
            width: "4rem",
            height: "4rem",
            padding: "0.3rem",
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
