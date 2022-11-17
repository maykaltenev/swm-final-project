import axios from "axios";

import React, { useContext, useState, useEffect } from "react";

// import Context
import { QuestionContext } from "../Context/QuestionContext";

//styles
import style from "./Question.module.css";

export default function QuestionCard({
  question,
  showAnswer,
  currentQuestion,
}) {
  //Context
  const {
    setPoints,
    points,
    sessionId,
    setAnswers,
    answers,

    userInputAnswerId,
    setUserInputAnswerId,
  } = useContext(QuestionContext);
  //Local Storage
  const getUser = JSON.parse(localStorage.getItem("user"));
  const handleUserAnswer = (question, e, getUser, sessionId) => {
    const { id, checked } = e.target;
    if (checked) {
      setUserInputAnswerId((userInputAnswerId) => [...userInputAnswerId, id]);
    } else {
      setUserInputAnswerId(userInputAnswerId.filter((e) => e !== id));
    }
  };
  useEffect(() => {
    addUserAnswerInput(question, userInputAnswerId, getUser, sessionId);
  }, [userInputAnswerId]);

  useEffect(() => {
    const checker = JSON.parse(localStorage.getItem("quizSession"));
    // const result = checker?.map((item) => String(item?.questionID));

    // if (result?.includes(question?._id)) {
    //   setUserInputAnswerId();
    // } else {
    // }
    console.log("checker", checker);
  }, [question]);
  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    try {
      await axios.patch(
        "http://localhost:5000/questions/js/quiz",
        {
          question,
          answer,
          user,
          sessionId,
        },
        { withCredentials: true }
      );
      await axios
        .get(`http://localhost:5000/questions/js/sessionID/${sessionId}`)
        .then((data) => {
          let questions = [];
          data.data.data?.userSolutions.map((item) => {
            let object = { questionID: item.question, answers: item.answer };
            questions.push(object);
          });
          data?.data?.data?.userSolutions &&
            localStorage.setItem(
              "quizSession",
              // JSON.stringify(
              //   data.data?.userSolutions.map((item) =>
              //     item.answer.map((answer) => answer)
              //   )
              // )
              JSON.stringify(questions)
            );
        });
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  const getAnswersFromLocalStorage = () => {
    const localQuizSession = JSON.parse(localStorage.getItem("quizSession"));
    // if (userAnswers) return userAnswers && setAnswers(userAnswers);
    if (localQuizSession) {
      return setAnswers(localQuizSession);
    }
  };
  useEffect(() => {}, []);
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
                  // { answers && answers.map(item => item == answer)}
                  className={style.button}
                  type="checkbox"
                  name="option"
                  style={{ border: "1px red solid" }}
                  value={option?.option}
                  id={option?._id}
                  // checked={
                  //   answers &&
                  //   answers?.map(
                  //     (answer) => answer?.questionID === question?._id
                  //   )
                  //     ? answers?.answers?.includes(option?._id)
                  //     : false
                  // }
                  onChange={(e) =>
                    handleUserAnswer(question._id, e, getUser._id, sessionId)
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
