import React, { useState } from 'react'
import QuestionCard from '../QuestionCard/QuestionCard'
import { useContext } from "react";
import { QuestionContext } from "../Context/QuestionContext";

function Quiz() {

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const { javaScriptData } = useContext(QuestionContext);

    const handlePrevious = (e) => {
        e.preventDefault();
        setCurrentQuestion(currentQuestion-1)
    }

    const handleNext = (e) => {
        e.preventDefault();
        setCurrentQuestion(currentQuestion+1)
    }

  return (
    <div className = "quiz-main-container">
        <div className="quiz-container">
        <span>{currentQuestion+1}</span>/{javaScriptData.length}
        </div>
        <QuestionCard question = {javaScriptData[currentQuestion]}/>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleNext}>Next</button>
    </div>

  )
}

export default Quiz