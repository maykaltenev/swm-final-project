import express from "express";
import { javaScript, react, nodeJs, mongoDB } from "../models/questions.js";
import UserSolution from "../models/userSolutions.js";
import QuizSession from "../models/quizSession.js";
export const createJsQuestions = async (req, res) => {

  try {
    const createQuestion = await javaScript.create(req.body);
    return res
      .status(201)
      .json({ message: "Question created", createQuestion });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const removeJsCollection = async (req, res) => {

  try {
    const deleted = await javaScript.remove();
    return res
      .status(201)
      .json({ message: "Deleted ", deleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getAllJSQuestions = async (req, res) => {
//     try {
//         const javascript = await javaScript.find();
//         return res.status(201).json({ message: "JavaScript Questions found", javascript });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
export const getAllQuestionsBySession = async (req, res) => {
  const sessionId = req.params.id
  try {
    const data = await QuizSession.findById(sessionId);
    return res.status(201).json({ message: "All Session Questions found", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createQuizSession = async (req, res) => {
  const { user, userSolution } = req.body;

  const questions = await javaScript.find();

  try {
    const newQuizSession = await QuizSession.create({
      user,
      questions,
      userSolution,
    });

    if (!newQuizSession) return;

    return res
      .status(200)
      .json({ message: "New Quiz Session Created", newQuizSession });
  } catch (error) {
    return res.send(error.message);
  }
};
export const createUserResponse = async (req, res) => {
  try {
    const { answer, user, question, sessionId } = req.body;

    const session = await QuizSession.findOne({
      _id: sessionId,
      "userSolutions.question": question,
    });
    if (session) {
      const updatedSession = await QuizSession.findOneAndUpdate(
        { _id: sessionId, "userSolutions.question": question },
        {
          //setting a specific field to a new value
          $set: {
            //userSolutions.$ is the solution we found using findOne
            "userSolutions.$.answer": answer,
          },
        },
        { new: true }
      );

      return res.status(200).json(updatedSession);
    }

    const answerFromTheUser = await QuizSession.findByIdAndUpdate(
      sessionId,
      {
        $push: {
          userSolutions: { question, answer }
        },
      },
      { new: true }
    );

    return res.status(200).json(answerFromTheUser);
  } catch (error) {
    return res.send(error.message);
  }

};

export const createResult = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await QuizSession.findOne({
      _id: sessionId,
    });
    if (session) {
      // Collect all the user answers
      const checkResult = await QuizSession.findById(sessionId).select(
        "userSolutions"
      );

      // Get all the question for this session
      const allQuestion = await QuizSession.findById(sessionId).select(
        "questions"
      );
      const resultArray = [];
      // Iterate over all the questions object

      allQuestion.questions.map((question) => {
        // Iterate over all the the userSolutions object
        checkResult.userSolutions.map(solutions => {
          // Check if the current questionID is the same a the current solutionID
          if (String(solutions.question) === String(question._id)) {
            const correctOption = question.options.filter(correct => correct.isCorrect === true);
            const correctAnswer = [];
            const wrongAnswer = [];
            question.options.map((questionOption, i) => {
              solutions.answer.filter((solutionInput, i) => {
                if (String(questionOption._id) === String(solutionInput)) {
                  if (questionOption.isCorrect) {
                    return correctAnswer.push(questionOption)
                  } else {
                    return wrongAnswer.push(questionOption)
                  }
                }
              })
            })
            if (correctAnswer.length === correctOption.length && solutions.answer.length === correctOption.length) {
              resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: correctAnswer, wrongUserAnswer: wrongAnswer }, mark: 1, correct: true })
            } else {
              resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: correctAnswer, wrongUserAnswer: wrongAnswer }, mark: 0, correct: false })
            }


            console.log(resultArray)

          }
        })
      })


      // //! Working solution
      // allQuestion.questions.map((question) => {
      //   // Iterate over all the the userSolutions object
      //   checkResult.userSolutions.map(solutions => {
      //     // Check if the current questionID is the same a the current solutionID
      //     if (String(solutions.question) === String(question._id)) {
      //       // If the ID's are the same check if the correct options is 1
      //       if (question.correctOptions === 1) {
      //         // If the correct option is 1, filter the correct option from the question options
      //         const correctOption = question.options.filter(correct => correct.isCorrect)[0];
      //         console.log(correctOption)
      //         // Check if the correct options is the same as the user solution answer
      //         const isAnswerCorrect = solutions.answer.includes((correctOption._id));
      //         if (isAnswerCorrect) {
      //           //If the answer is correct, add new object that contains the questionID, the correctAnswer, the userAnswers
      //           //if the answer was correct mark: 1 and  correct: true  
      //           resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: solutions.answer, wrongUserAnswer: [] }, mark: 1, correct: true })
      //         } else {
      //           //if the answer was correct mark: 0 and  correct: false  
      //           resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: [], wrongUserAnswer: solutions.answer }, mark: 0, correct: false })
      //         }
      //       } else if (question.correctOptions >= 2) {
      //         // If the correct option is 2, filter the correct option from the question options
      //         const correctOption = question.options.filter(correct => correct.isCorrect === true);
      //         const correctAnswer = [];
      //         const wrongAnswer = [];
      //         //! Pushing also the correct in the wrongAnswer array
      //         question.options.map((questionOption, i) => {
      //           solutions.answer.filter((solutionInput, i) => {
      //             if (String(questionOption._id) === String(solutionInput)) {
      //               if (questionOption.isCorrect) {
      //                 return correctAnswer.push(questionOption)
      //               } else {
      //                 return wrongAnswer.push(questionOption)
      //               }
      //             }
      //           })
      //         })
      //         if (correctAnswer.length === correctOption.length && solutions.answer.length === correctOption.length) {
      //           resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: correctAnswer, wrongUserAnswer: wrongAnswer }, mark: 1, correct: true })
      //         } else {
      //           resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: correctAnswer, wrongUserAnswer: wrongAnswer }, mark: 0, correct: false })
      //         }
      //         console.log(resultArray)

      //         // for (let i = 0; i < correctOption.length; i++) {
      //         //   for (let j = 0; j < solutions.answer.length; j++) {
      //         //     console.log(solutions.answer[j])
      //         //     if (String(solutions.answer[j]) === String(correctOption[i]._id)) {
      //         //       correctAnswer.push(solutions.answer[j])
      //         //     } else {
      //         //       wrongAnswer.push(solutions.answer[j])
      //         //     }
      //         //   }
      //         // }

      //       }


      //       console.log(resultArray)
      //       //   correctOption.map((correct, i) => {
      //       //     console.log(i)
      //       //     if (String(correct._id) === String(solution)) {
      //       //       return correctAnswer.push(solution)
      //       //     } else {
      //       //       return wrongAnswer.push(solution)
      //       //     }
      //       //   })
      //       // })
      //       // console.log("wrongAnswer", wrongAnswer)
      //       // console.log("correctAnswer", correctAnswer)
      //       // if (correctAnswer.length === 2 && solutions.answer === 2) {
      //       //   resultArray.push({ question: question._id, correctAnswer: correctOption, userAnswer: { correctUserAnswer: correctAnswer }, mark: 1, correct: true })
      //       // } else {
      //       //   resultArray.push({ question: question._id, correctAnswer: correctOption, userAnswer: { correctUserAnswer: correctAnswer, wrongAnswer: wrongAnswer }, mark: 1, correct: true })
      //       // }



      //       // if (String(questions.options[k]._id) === String(checkResult.userSolutions[i].answer)) {

      //       // }
      //     }
      //   })
      // })

      // //! Working solution
      // console.log(resultArray)
      // const correctAnswers = resultArray.reduce((acc, curr) => {
      //   return acc + curr.mark
      // }, 0)
      // console.log(correctAnswers)












      // for (let i = 0; i < checkResult.userSolutions.length; i++) {
      //   /*  console.log(checkResult.userSolutions[i].question); */
      // for (let j = 0; j < allQuestion.questions.length; j++) {
      //   /* console.log("all", allQuestion.questions[j]._id); */
      //   for (let i = 0; i < checkResult.userSolutions.length; i++) {
      //     if (String(checkResult.userSolutions[i].question) === String(allQuestion.questions[j]._id)) {
      //       for (let k = 0; k < allQuestion.questions[j].options.length; k++) {
      //         if (String(allQuestion.questions[j].options[k]._id) === String(checkResult.userSolutions[i].answer)) {
      //           // console.log("allQOptionId", String(allQuestion.questions[j].options[k]._id))
      //           // console.log("userAnswerId", String(checkResult.userSolutions[i].answer))
      //           // console.log(allQuestion.questions[j].options[k].isCorrect)
      //           // console.log("_______---------______-------__________-______--")
      //         }
      //       }
      //     }
      //   }
      // }
      // // console.log("checkResul", checkResult.userSolutions);
      // // if (
      // //   String(checkResult.userSolutions[j].question) ===
      // //   String(allQuestion.questions[j]._id)
      // // ) {
      // //   console.log("first");
      // // }


      // /* console.log("allqu", allQuestion); */
      // // Collect all the correct answers
      // //! Working
      // const allTrueAnswers = allQuestion.questions.map((question) =>
      //   question.options.filter((option) => option.isCorrect === true)
      // );
      // const userCorrectAnswers = allTrueAnswers
      //   .map((trueAnswer) =>
      //     checkResult.userSolutions.filter(
      //       (checkResultId) =>
      //         String(checkResultId.answer) === String(trueAnswer[0]._id)
      //     )
      //   )
      //   .flat()
      //   .map((item) => String(item.answer));

      // const wrongAnswersArray = checkResult.userSolutions.filter(
      //   (item) => !userCorrectAnswers.includes(String(item.answer))
      // );
      // const userAnswerPercentage = Math.round(
      //   (userCorrectAnswers.length / allQuestion.questions.length) * 100
      // );
      return res
        .status(200)
        .json({ userCorrectAnswers, wrongAnswersArray, userAnswerPercentage });
    }
  } catch (error) {
    return res.send(error.message);
  }
};