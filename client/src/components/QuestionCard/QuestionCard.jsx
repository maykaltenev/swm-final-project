import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

// Context
import { QuestionContext } from "../Context/QuestionContext";
//styles
import style from "./Question.module.css";

export default function QuestionCard({ question, showAnswer }) {
  const {
    setPoints,
    points,
    sessionId,
    currentWholeSession,
    setCurrentWholeSession,
  } = useContext(QuestionContext);
  const [userInputAnswerId, setUserInputAnswerId] = useState("");
  const getUser = JSON.parse(localStorage.getItem("user"));

  const handleUserAnswer = (question, e, getUser, sessionId) => {
    addUserAnswerInput(question, e, getUser, sessionId);
    //console.log("the questuion is :",question)
    //console.log("the session id is is :",sessionId)
  };

  const addUserAnswerInput = async (question, answer, user, sessionId) => {
    console.log("insde addUserinput question",question)
    console.log("insde addUserinput answer",answer)
    console.log("insde addUserinput session",sessionId)
    try {
      await axios
        .post(
          `http://localhost:5000/questions/js/createQuiz`,
          { sessionId ,
            question,
            answer
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => setCurrentWholeSession(data));
        //console.log("the currentwhole sesion is:",currentWholeSession.data.currentSession._id.userSolutions)
/* --------------no need in frontend
      currentWholeSession.data.currentSession.userSolutions.map(
        async (item) => {
          if (item.question == question) {
            console.log("the targeted question is:",item.question)
      
            await axios.patch(
              "http://localhost:5000/questions/js/quizAnswer",
              {
                question,
                answer,
                user,
                sessionId,
              },
              { withCredentials: true }
            );
            console.log("the question with pathch is",question)
          }
        }
      ); */
    } catch (error) {
      console.log("error adding user input", error);
    }
  };
  
  console.log("th current whole session is:",currentWholeSession)
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
                  id={option?._id}
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
