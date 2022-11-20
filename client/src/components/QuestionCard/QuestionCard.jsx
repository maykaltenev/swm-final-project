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

    userInputAnswerId,
    setUserInputAnswerId,
  } = useContext(QuestionContext);
  //Local Storage

  const getUser = JSON.parse(localStorage.getItem("user"));
  const getAnswersFromLocalStorage = () => {
    const answer = localStorage.getItem("answers");
    if (answer) {
      return JSON.parse(localStorage.getItem("answers"));
    } else {
      return [];
    }
  };
  const [answer, setAnswer] = useState(getAnswersFromLocalStorage());

  // const handleUserAnswer = (question, e, getUser, sessionId) => {

  //   const questionExist = answer?.map((item) => item.questionID === question);
  //   console.log("question exist filter", questionExist);
  //   if (questionExist) {
  //     console.log("questionExist inside if", questionExist);
  //     const answerExist = questionExist?.answers?.includes(e);
  //     console.log("answerExist", answerExist);
  //     if (answerExist) {
  //       const filteredAnswer = answerExist?.answers?.filter((el) => el !== e);
  //       console.log("filterAnswer", filteredAnswer);
  //       setAnswer((prev) => [
  //         {
  //           ...prev,
  //           questionID: question,
  //           answers: [...prev.answers, filteredAnswer],
  //         },
  //       ]);
  //     } else {
  //       setAnswer((prev) => [
  //         {
  //           ...prev,
  //           questionID: question,
  //           answers: [e],
  //         },
  //       ]);
  //     }
  //   }

  //   // ! Update on setAnswers
  //   // } else {
  //   //   setAnswer((prev) => {
  //   //     return prev.map((item) => {
  //   //       if (item.questionID === question) {
  //   //         return {
  //   //           ...item,
  //   //           questionID: question,
  //   //           answers: [...item.answers, e],
  //   //         };
  //   //       } else {
  //   //         return { ...item, questionID: question, answers: [e] };
  //   //       }
  //   //     });
  //   //   });
  //   // }
  //   // }
  //   // };
  //   //!Testing Code
  //   // if (checked) {
  //   //   setUserInputAnswerId((userInputAnswerId) => [...userInputAnswerId, id]);
  //   // } else {
  //   //   setUserInputAnswerId(userInputAnswerId.filter((e) => e !== id));
  //   // }
  // };
  const handleUserAnswer = (question, e, getUser, sessionId) => {
    const questionExist = answer?.find((item) => item.questionID === question);
    console.log("question exist filter", questionExist);
    if (questionExist) {
      console.log("questionExist inside if", questionExist);
      const answerExist = questionExist?.answers?.includes(String(e));
      console.log("answerExist", answerExist);
      if (answerExist) {
        const filteredAnswer = questionExist?.answers?.filter((el) => el !== e);
        console.log("filterAnswer", filteredAnswer);
        setAnswer((prev) => {
          return prev.map((item) => {
            if (item.questionID === question) {
              return {
                questionID: question,
                answers: filteredAnswer,
              };
            }
          });
        });
      } else {
        setAnswer((prev) => {
          return prev.map((item) => {
            console.log("check", item);
            if (item.questionID === question) {
              return {
                ...item,
                questionID: question,
                answers: [...item.answers, e],
              };
            } else {
              return { ...item, questionID: question, answers: [e] };
            }
          });
        });
      }
    }
  };

  //!Testing Code
  // if (checked) {
  //   setUserInputAnswerId((userInputAnswerId) => [...userInputAnswerId, id]);
  // } else {
  //   setUserInputAnswerId(userInputAnswerId.filter((e) => e !== id));
  // }
  console.log("answer after adding", answer);
  useEffect(() => {
    addUserAnswerInput(question, userInputAnswerId, getUser, sessionId);
  }, [userInputAnswerId]);

  useEffect(() => {
    const checker = JSON.parse(localStorage.getItem("answers"));
    // const result = checker?.map((item) => String(item?.questionID));

    // if (result?.includes(question?._id)) {
    //   setUserInputAnswerId();
    // } else {
    // }
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
              "answers",
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
}*/
