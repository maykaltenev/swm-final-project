import express from "express";
import { javaScript, react, nodeJs, mongoDB } from "../models/questions.js";
import UserSolution from "../models/userSolutions.js";
import QuizSession from "../models/quizSession.js";
/* ----------------------------creating js questions using create() method--------------------------- */
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
/* ----------------------------dropping the collection using remove() method--------------------------- */
export const removeJsCollection = async (req, res) => {
  try {
    const deleted = await javaScript.remove();
    return res.status(201).json({ message: "Deleted ", deleted });
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
/* ----------------------------get all questions with session id --post method-------------------- */
export const getAllQuestionsBySession = async (req, res) => {
  const sessionId = req.params.id;
  try {
    const data = await QuizSession.findById(sessionId);
    return res
      .status(201)
      .json({ message: "All Session Questions found", data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/* ----------------------------creating quiz session for the user--post method --------------------------- */
export const createQuizSession = async (req, res) => {
  const { user, userSolution } = req.body;

  const questions = await javaScript.find();
  //create new session  for the user
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
//creating user response wrt session id of the user with question id and the user selected option
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
    /* if there is any answer change from user, find by question id and update the answer option and push to user solutions array */
    const answerFromTheUser = await QuizSession.findByIdAndUpdate(
      sessionId,
      {
        $push: {
          userSolutions: { question, answer },
        },
      },
      { new: true }
    );

    return res.status(200).json(answerFromTheUser);
  } catch (error) {
    return res.send(error.message);
  }
};
/* creating result by checking the correct option and the user selected option */
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

      const userCorrectAnswerAll = []; // 2
      const userWrongAnswerAll = [];

      // Iterate over all the questions object
      allQuestion.questions.map((question) => {
        // Iterate over all the the userSolutions object
        checkResult.userSolutions.map((solutions) => {
          // Check if the current questionID is the same a the current solutionID
          if (String(solutions.question) === String(question._id)) {
            // All the correct options
            if (
              question.inputType === "radio" ||
              question.inputType === "checkbox"
            ) {
              const correctOption = question.options.filter(
                (correct) => correct.isCorrect === true
              ); // 2 // 3 // 1
              const userCorrectAnswer = []; // 2
              const userWrongAnswer = [];
              /* mapping over the options on the ques array */
              question.options.map((questionOption) => {
                /* filter the  user selected  option*/
                solutions.answer.filter((solutionInput) => {
                  /* checking if the question option is equal to option selected by user */
                  if (String(questionOption._id) === String(solutionInput)) {
                    /* if it is correct */
                    if (questionOption.isCorrect) {
                      /* push to the correct answer array */
                      return (
                        userCorrectAnswer.push(questionOption) &&
                        userCorrectAnswerAll.push(questionOption)
                      );
                    } else {
                      /* else  push to wrong answer array */
                      return (
                        userWrongAnswer.push(questionOption) &&
                        userWrongAnswerAll.push(questionOption)
                      );
                    }
                  }
                });
              });
              if (
                userCorrectAnswer.length === correctOption.length &&
                solutions.answer.length === correctOption.length
              ) {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,

                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 1,
                  correct: true,
                });
              } else {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,
                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 0,
                  correct: false,
                });
              }
            } else {
              // //! For inputType === "text"
              const userCorrectAnswer = [];
              const userWrongAnswer = [];
              // Correct Option
              const correctOption = question.options[0].option;
              const correct = question.options[0].option.trim().toLowerCase();
              const userInput = solutions.answer[0].trim().toLowerCase();
              if (correct === userInput) {
                userCorrectAnswer.push(solutions.answer[0]);
              } else {
                userWrongAnswer.push(solutions.answer[0]);
              }
              if (userCorrectAnswer.length > 0) {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,

                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 1,
                  correct: true,
                });
              } else {
                resultArray.push({
                  question: question._id,
                  correctOptions: correctOption,

                  userAnswer: {
                    correctUserAnswer: userCorrectAnswer,
                    wrongUserAnswer: userWrongAnswer,
                  },
                  mark: 0,
                  correct: false,
                });
              }
            }
          }
        });
      });
/* calculationg correct answers length */
      const correctAnswers = resultArray.reduce((acc, curr) => {
        return acc + curr.mark;
      }, 0);
      /* calculating wrong answers length */
      const wrongAnswers = resultArray.length - correctAnswers;
/* calculationg the percentage */
      const userAnswerPercentage = Math.round(
        (correctAnswers / allQuestion.questions.length) * 100
      );
      return res.status(200).json({
        resultArray,
        allQuestion,
        correctAnswers,
        wrongAnswers,
        userAnswerPercentage,
        userCorrectAnswerAll,
        userWrongAnswerAll,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};
//get result
/* export const getResult = async (req, res) => {

  try {
    const getQuestions = await javaScript.remove();
    return res
      .status(201)
      .json({ message: "Deleted ", deleted });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; */
