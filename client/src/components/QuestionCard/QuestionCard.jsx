import axios from "axios";
import React, { useContext, useState, useEffect } from "react";

// Context
import { QuestionContext } from "../Context/QuestionContext";

//styles
import style from "./Question.module.css";

export default function QuestionCard({
  question,
  showAnswer,
  currentQuestion,
}) {
  // useState
  const [userInputAnswerId, setUserInputAnswerId] = useState("");
  /*  const [answers, setAnswers] = useState([]); */

  //Context
  const { setPoints, points, sessionId, setAnswers, answers } =
    useContext(QuestionContext);

  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleUserAnswer = (question, e, getUser, sessionId) => {
    addUserAnswerInput(question, e, getUser, sessionId);
  };
  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    try {
      await axios
        .patch(
          "http://localhost:5000/questions/js/quiz",
          {
            question,
            answer,
            user,
            sessionId,
          },
          { withCredentials: true }
        )
        .then(
          (data) =>
            data.data?.userSolutions &&
            localStorage.setItem(
              "answers",
              JSON.stringify(
                data.data?.userSolutions.map((answer) => answer.answer)
              )
            )
        );
      getAnswersFromLocalStorage();
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  const getAnswersFromLocalStorage = () => {
    const userAnswers = JSON.parse(localStorage.getItem("answers"));
    console.log("indside", userAnswers);
    // if (userAnswers) return userAnswers && setAnswers(userAnswers);
    if (userAnswers) return setAnswers(userAnswers);
  };

  useEffect(() => {
    addUserAnswerInput();
    getAnswersFromLocalStorage();
  }, []);
  console.log("from outside", answers);
  return (
    <div>
      {
        
        <div key={question?._id}>
          <h5>{question?.questionText}</h5>
          {question?.image && (
            <img src={question?.image} alt="" width="400px" />
          )}
          <div>
            {question?.options.map((option) => (
              <div key={option?._id}>
                <input
                  /*    { answers && answers.map(item => item == answer)} */

                  className={style.button}
                  type={question?.inputType}
                  name="option"
                  style={{ border: "1px red solid" }}
                  value={option?.option}
                  id={option?._id}
                  checked={answers && answers.includes(option?._id)}
                  onChange={(e) =>
                    handleUserAnswer(
                      question._id,
                      e.target.id,
                      getUser._id,
                      sessionId
                    )
                  }
                />
                <label htmlFor={option?.option}>{option?.option}</label>
              </div>
            ))}
            {showAnswer && <div>{question?.explanation}</div>}
            <hr />
          </div>
        </div>
      }
    </div>
  );
}

/** Reference for saving state within array of objects 
 * 
 * 
 * export default function QuestionCard({ question, showAnswer }) {
  const { setPoints, points } = useContext(QuestionContext);
  const [userResponses, setUserResponses] = useState([
    {
      questionId: "",
      answerId: "",
    },
  ]);
  // const handleUserResponses = (answerId, questionId) => {
  //   setUserResponses((currentResponse) => ({
  //     ...currentResponse,
  //     questionId: questionId,
  //     answerId: answerId,
  //   }));
  // };
  const userResponsesArray = [];
  // const handleUserResponses = (userResponsesArray, answerId, questionId) => {
  //   if (!userResponsesArray) {
  //     userResponsesArray.map((userResponse) => {
  //       if (userResponse.questionId === questionId) {
  //         return (userResponse.answerId = answerId);
  //       } else {
  //         return userResponsesArray.push({
  //           questionId: questionId,
  //           answerId: answerId,
  //         });
  //       }
  //     });
  //     userResponsesArray.push({ questionId: questionId, answerId: answerId });
  //   }
  // };
  console.log(userResponsesArray);
  return (
    <div>
      {
        <div key={question?._id}>
          <h5>{question?.questionText}</h5>
          {question?.image && (
            <img src={question?.image} alt="" width="400px" />
          )}
          <div>
            {question?.options.map((option) => (
              <div key={option?._id}>
                <input
                  className={style.button}
                  type="radio"
                  name="option"
                  style={{ border: "1px red solid" }}
                  value={option?.option}
                  // onChange={() =>
                  //   handleUserResponses(option.value, question._id)
                  // }
                />
                <label htmlFor={option?.option}>{option?.option}</label>
              </div>
            ))}
            {showAnswer && <div>{question?.explanation}</div>}
            <hr />
          </div>
        </div>
      }
    </div>
  );
}
*/
