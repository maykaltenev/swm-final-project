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
  const [userInputAnswerId, setUserInputAnswerId] = useState([]);

  //Context
  const { setPoints, points, sessionId, setAnswers, answers } =
    useContext(QuestionContext);

  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleUserAnswer = (question, e, getUser, sessionId) => {
    const { id, checked } = e.target;
    if (checked) {
      setUserInputAnswerId((userInputAnswerId) => [
        ...Array.from(new Set(userInputAnswerId)),
        id,
      ]);

      // setUserInputAnswerId((userInputAnswerId) => [...userInputAnswerId, id]);
    } else {
      setUserInputAnswerId(
        Array.from(new Set(userInputAnswerId)).filter((e) => e !== id)
      );
    }
  };

  useEffect(() => {
    addUserAnswerInput(question, userInputAnswerId, getUser, sessionId);
    getAnswersFromLocalStorage();
  }, [userInputAnswerId, question]);

  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    console.log("answer", answer);
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
            item.answer.map((answer) => questions.push(answer));
          });
          data?.data?.data?.userSolutions &&
            localStorage.setItem(
              "answers",
              // JSON.stringify(
              //   data.data?.userSolutions.map((item) =>
              //     item.answer.map((answer) => answer)
              //   )
              // )
              JSON.stringify(questions)
            );
        })
        .then(() => {
          getAnswersFromLocalStorage();
        });
      // .then(
      //   (data) =>
      //     data.data?.userSolutions &&
      //     localStorage.setItem(
      //       "answers",
      //       JSON.stringify(
      //         data.data?.userSolutions.map((item) =>
      //           item.answer.map((answer) => answer)
      //         )
      //       ),
      //       console.log(data)
      //     )
      // );
    } catch (error) {
      console.log("error adding comment", error);
    }
  };

  const getAnswersFromLocalStorage = () => {
    const userAnswers = localStorage.getItem("answers");
    if (userAnswers) {
      return setAnswers(Array.from(new Set(JSON.parse(userAnswers))));
    } else {
      return [];
    }
  };

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
                  type="checkbox"
                  name="option"
                  style={{ border: "1px red solid" }}
                  value={option?.option}
                  id={option?._id}
                  checked={answers && answers?.includes(option?._id)}
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
