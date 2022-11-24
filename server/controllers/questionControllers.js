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
    console.log(answer);
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
            // All the correct options 
            if (question.inputType === "radio" || question.inputType === "checkbox") {
              const correctOption = question.options.filter(correct => correct.isCorrect === true); // 2 // 3 // 1
              const userCorrectAnswer = [];  // 2
              const userWrongAnswer = []; // 1
              question.options.map((questionOption) => {
                solutions.answer.filter((solutionInput) => {
                  if (String(questionOption._id) === String(solutionInput)) {
                    if (questionOption.isCorrect) {
                      return userCorrectAnswer.push(questionOption)
                    } else {
                      return userWrongAnswer.push(questionOption)
                    }
                  }
                })
              })
              if (userCorrectAnswer.length === correctOption.length && solutions.answer.length === correctOption.length) {
                resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: userCorrectAnswer, wrongUserAnswer: userWrongAnswer }, mark: 1, correct: true })
              } else {
                resultArray.push({ question: question._id, correctOptions: correctOption, userAnswer: { correctUserAnswer: userCorrectAnswer, wrongUserAnswer: userWrongAnswer }, mark: 0, correct: false })
              }
            }
            //! For inputType === "text"
          } else {

          }
        })
      })
      const correctAnswers = resultArray.reduce((acc, curr) => {
        return acc + curr.mark
      }, 0)
      const wrongAnswers = resultArray.length - correctAnswers;

      const userAnswerPercentage = Math.round(
        (correctAnswers / resultArray.length) * 100
      );
      return res
        .status(200)
        .json({ resultArray,allQuestion, correctAnswers, wrongAnswers, userAnswerPercentage });
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