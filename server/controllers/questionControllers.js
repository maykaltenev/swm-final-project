import express from "express";
import { javaScript, react, nodeJs, mongoDB } from "../models/questions.js";
import UserSolution from "../models/userSolutions.js";
import QuizSession from "../models/quizSession.js";
export const createJsQuestions = async (req, res) => {
  console.log(req.body);
  try {
    const createQuestion = await javaScript.create(req.body);
    return res
      .status(201)
      .json({ message: "Question created", createQuestion });
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
  //! we create the questions here, add random and limit(20) after more data is added.
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
    console.log("from create", answer)
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
        $push: { userSolutions: { question, $push: { answer } } },
      },
      { new: true }
    );

    return res.status(200).json(answerFromTheUser);
  } catch (error) {
    return res.send(error.message);
  }
};

/* export const createResult = async (req, res) => {
  try {
    const { sessionId } = req.body;
 
    const session = await QuizSession.findOne({
      _id: sessionId,
    });
    if (session) {
      // Collect all the user answers
      const checkResult = await QuizSession.findById(sessionId).select(
        "userSolutions.answer"
      );
      // Get all the question for this session
      const allQuestion = await QuizSession.findById(sessionId).select(
        "questions.options"
      );
      // Collect all the correct answers
      //! Working
      const allTrueAnswers = allQuestion.questions.map((question) =>
        question.options.filter((option) => option.isCorrect === true)
      );
      const userCorrectAnswers = allTrueAnswers
        .map((trueAnswer) =>
          checkResult.userSolutions.filter(
            (checkResultId) =>
              String(checkResultId.answer) === String(trueAnswer[0]._id)
          )
        )
        .flat()
        .map((item) => String(item.answer));
 
      const wrongAnswersArray = checkResult.userSolutions.filter(
        (item) => !userCorrectAnswers.includes(String(item.answer))
      );
      const userAnswerPercentage = Math.round(
        (userCorrectAnswers.length / allQuestion.questions.length) * 100
      );
      return res
        .status(200)
        .json({ userCorrectAnswers, wrongAnswersArray, userAnswerPercentage });
    }
  } catch (error) {
    return res.send(error.message);
  }
};
 */

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

      // for (let i = 0; i < checkResult.userSolutions.length; i++) {
      //   /*  console.log(checkResult.userSolutions[i].question); */
      for (let j = 0; j < allQuestion.questions.length; j++) {
        /* console.log("all", allQuestion.questions[j]._id); */
        for (let i = 0; i < checkResult.userSolutions.length; i++) {
          if (String(checkResult.userSolutions[i].question) === String(allQuestion.questions[j]._id)) {
            for (let k = 0; k < allQuestion.questions[j].options.length; k++) {
              if (String(allQuestion.questions[j].options[k]._id) === String(checkResult.userSolutions[i].answer)) {
                // console.log("allQOptionId", String(allQuestion.questions[j].options[k]._id))
                // console.log("userAnswerId", String(checkResult.userSolutions[i].answer))
                // console.log(allQuestion.questions[j].options[k].isCorrect)
                // console.log("_______---------______-------__________-______--")
              }
            }
          }
        }
      }
      // console.log("checkResul", checkResult.userSolutions);
      // if (
      //   String(checkResult.userSolutions[j].question) ===
      //   String(allQuestion.questions[j]._id)
      // ) {
      //   console.log("first");
      // }


      /* console.log("allqu", allQuestion); */
      // Collect all the correct answers
      //! Working
      const allTrueAnswers = allQuestion.questions.map((question) =>
        question.options.filter((option) => option.isCorrect === true)
      );
      const userCorrectAnswers = allTrueAnswers
        .map((trueAnswer) =>
          checkResult.userSolutions.filter(
            (checkResultId) =>
              String(checkResultId.answer) === String(trueAnswer[0]._id)
          )
        )
        .flat()
        .map((item) => String(item.answer));

      const wrongAnswersArray = checkResult.userSolutions.filter(
        (item) => !userCorrectAnswers.includes(String(item.answer))
      );
      const userAnswerPercentage = Math.round(
        (userCorrectAnswers.length / allQuestion.questions.length) * 100
      );
      return res
        .status(200)
        .json({ userCorrectAnswers, wrongAnswersArray, userAnswerPercentage });
    }
  } catch (error) {
    return res.send(error.message);
  }
};